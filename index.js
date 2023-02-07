const { getJokes, getJoke } = require("./dist/index");

(async () => {
  console.log(await getJoke());
  console.log(
    await getJokes({
      amount: 2,
    })
  );
})();
