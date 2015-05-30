bad-words v1.1.0
========

A javascript filter for badwords

```
npm install bad-words
```

#Examples
```
var Filter = require('bad-words'),
  filter = new Filter();

console.log(filter.clean("Don't be an ash0le"));
```

#####Outputs:
```
Don't be an ******
```

###Placeholder Overrides
```
var Filter = require('bad-words');
var customFilter = new Filter({ placeHolder: 'x'});

customFilter.clean('Don't be an ash0le');
```

###Regex Overrides
```
var filter = new Filter({ regex: /\*|\.|$/gi });
```

#####Outputs:
```
Don't be an xxxxxx
```

#Testing
```
npm test
```
========


###Release Notes
- v1.1.0 / Mar 17 2015: Added soundex support for comparing words to things not in the list.
- v1.2.0 / May 29 2015: Removed soundex logic which resulted in many false positives within the isProfane test.

========

###License

The MIT License (MIT)

Copyright (c) 2013 Michael Price

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



