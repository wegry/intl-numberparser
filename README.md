# intl-numberparser

```sh
npm install @wegry/intl-numberparser
```

Parse numbers based on `Intl.NumberFormat` and a locale.

```js
import { NumberParser } from '@wegry/intl-numberparser'

new NumberParser('en-US').parse('1,234.56') // 1234.56
new NumberParser('fr').parse('1 234,56')    // 1234.56
```
