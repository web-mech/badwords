badwords v0.6.1
========

A javascript filter for badwords

```
npm install bad-words
```
#Examples
```
var filter = require('bad-words');

console.log(filter.clean("Don't be an ash0le"));
```
#####Outputs:
```
Don't be an ******
```

###Factory
Allows the creation of new instances of a filter

```
var filter = require('bad-words');
var customFilter = new filter.Factory();

customFilter.clean('Bad words...');
```

###Placeholder Overrides

```
var filter = require('bad-words');
var customFilter = new filter.Factory({ placeHolder: 'x'});

customFilter.clean('Don't be an ash0le');
```

#####Outputs:
```
Don't be an xxxxxx
```
#String Helper

Will no longer be supported and removed in the next release.

#Testing
```
mocha
```
========

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



