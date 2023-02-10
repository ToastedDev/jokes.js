---
"jokes.js": minor
---

Add extra checks for joke types.

```js
const { getJoke } = require("jokes.js");

console.log(
  await getJoke({
    types: [], // SyntaxError: You must specify at least one type.
  })
);
```
