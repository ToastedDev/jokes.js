# jokes.js

Generate random jokes using the [JokeAPI](https://jokeapi.dev).

# Usage

## Get one joke

```js
const { getJoke } = require("jokes.js");

(async () => {
  console.log(await getJoke());
})();
```

## Get a list of jokes

```js
const { getJokes } = require("jokes.js");

(async () => {
  console.log(
    await getJokes({
      amount: 2,
    })
  );
})();
```
