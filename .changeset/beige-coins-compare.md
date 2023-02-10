---
"jokes.js": minor
---

Add check functions for jokes.

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
