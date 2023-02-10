import "isomorphic-fetch";
type ObjectValues<T> = T[keyof T];

export const JokeCategory = {
  Programming: "Programming",
  Miscellaneous: "Miscellaneous",
  Dark: "Dark",
  Pun: "Pun",
  Spooky: "Spooky",
  Christmas: "Christmas",
} as const;
export type JokeCategory = ObjectValues<typeof JokeCategory>;

export const JokeLanguage = {
  Czech: "cs",
  German: "de",
  English: "en",
  Spanish: "es",
  French: "fr",
  Portuguese: "pt",
} as const;
export type JokeLanguage = ObjectValues<typeof JokeLanguage>;

export const JokeFlags = {
  NotSafeForWork: "nsfw",
  Religious: "religious",
  Political: "political",
  Sexist: "sexist",
  Explicit: "explicit",
} as const;
export type JokeFlags = ObjectValues<typeof JokeFlags>;

export const JokeType = {
  Single: "single",
  TwoPart: "twopart",
} as const;
export type JokeType = ObjectValues<typeof JokeType>;

export interface JokeOptions {
  categories?: JokeCategory[];
  language?: JokeLanguage;
  blacklistFlags?: JokeFlags[];
  type?: JokeType[];
  searchString?: string;
  idRange?: number;
  amount: number;
}

type SingleJoke = {
  category: JokeCategory;
  type: "single";
  joke: string;
};

type TwoPartJoke = {
  category: JokeCategory;
  type: "twopart";
  setup: string;
  delivery: string;
};

type Joke = SingleJoke | TwoPartJoke;

export function isSingleJoke(joke: Joke): joke is SingleJoke {
  if (joke.type === "single") return true;
  else return false;
}

export function isTwoPartJoke(joke: Joke): joke is TwoPartJoke {
  if (joke.type === "twopart") return true;
  else return false;
}

export async function getJoke(
  options: Omit<JokeOptions, "amount">
): Promise<Joke> {
  if (!options)
    options = {
      language: "en",
      type: ["single", "twopart"],
    };

  if ((options as JokeOptions).amount)
    throw new SyntaxError(
      'Amount shouldn\'t be provided. Use "getJokes" instead.'
    );

  const {
    categories,
    blacklistFlags,
    idRange,
    language = "en",
    searchString,
    type = ["single", "twopart"],
  } = options;

  if (type && !type.some((type) => Object.values(JokeType).includes(type)))
    throw new SyntaxError("Invalid type specified.");

  let endpoint = `https://v2.jokeapi.dev/joke/`;
  const params = new URLSearchParams({
    language,
    type: type.join(","),
  });

  if (categories) {
    if (
      !categories.some((category) =>
        Object.values(JokeCategory).includes(category)
      )
    )
      throw new SyntaxError("Invalid category specified.");
    endpoint += categories.join(",");
  } else endpoint += "Any";

  if (blacklistFlags) {
    if (!blacklistFlags.some((flag) => Object.values(JokeFlags).includes(flag)))
      throw new SyntaxError("Invalid flag specified.");
    params.append("blacklistFlags", blacklistFlags.join(","));
  }

  if (searchString) params.append("contains", searchString);
  if (idRange) params.append("idRange", `0-${idRange}`);

  const res = await fetch(endpoint + `?${params.toString()}`).then((res) =>
    res.json()
  );

  if (res.type === "single")
    return Promise.resolve({
      category: res.category,
      type: "single",
      joke: res.joke,
    });
  else
    return Promise.resolve({
      category: res.category,
      type: "twopart",
      setup: res.setup,
      delivery: res.delivery,
    });
}

type Jokes = Joke[];

export async function getJokes(options: JokeOptions): Promise<Jokes> {
  if (!options || !options.amount)
    throw new SyntaxError('No amount provided. Use "getJoke" instead.');

  const {
    amount,
    categories,
    blacklistFlags,
    idRange,
    language = "en",
    searchString,
    type = ["single", "twopart"],
  } = options;

  if (isNaN(amount)) throw new SyntaxError("Amount must be a number.");
  if (amount % 1 != 0) throw new SyntaxError("Amount must be a whole number.");
  if (amount < 0) throw new SyntaxError("Amount must be greater than zero.");

  if (type && !type.some((type) => Object.values(JokeType).includes(type)))
    throw new SyntaxError("Invalid type specified.");

  let endpoint = `https://v2.jokeapi.dev/joke/`;
  const params = new URLSearchParams({
    language,
    type: type.join(","),
    amount: amount.toString(),
  });

  if (categories) {
    if (
      !categories.some((category) =>
        Object.values(JokeCategory).includes(category)
      )
    )
      throw new SyntaxError("Invalid category specified.");
    endpoint += categories.join(",");
  } else endpoint += "Any";

  if (blacklistFlags) {
    if (!blacklistFlags.some((flag) => Object.values(JokeFlags).includes(flag)))
      throw new SyntaxError("Invalid flag specified.");
    params.append("blacklistFlags", blacklistFlags.join(","));
  }

  if (searchString) params.append("contains", searchString);
  if (idRange) params.append("idRange", `0-${idRange}`);

  const res = await fetch(endpoint + `?${params.toString()}`).then((res) =>
    res.json()
  );

  return Promise.resolve(
    res.jokes.map((joke: any) => {
      if (joke.type === "single")
        return { category: joke.category, type: "single", joke: joke.joke };
      else
        return {
          category: joke.category,
          type: "twopart",
          setup: joke.setup,
          delivery: joke.delivery,
        };
    })
  );
}
