# jokes.js

## 0.2.0

### Minor Changes

- 4ef45ed: Add check functions for jokes.

  ```js
  const { getJoke, isSingleJoke } = require("jokes.js");

  const joke = await getJoke();
  if (isSingleJoke(joke)) {
    // ...
  }
  ```

  ```js
  const { getJoke, isTwoPartJoke } = require("jokes.js");

  const joke = await getJoke();
  if (isTwoPartJoke(joke)) {
    // ...
  }
  ```

- b69c180: Add extra checks for joke types.

  ```js
  const { getJoke } = require("jokes.js");

  console.log(
    await getJoke({
      types: [], // SyntaxError: You must specify at least one type.
    })
  );
  ```

## 0.1.1

### Patch Changes

- e86415d: Add README.

## 0.1.0

### Minor Changes

- 789e5cc: Initial release of jokes.js.
