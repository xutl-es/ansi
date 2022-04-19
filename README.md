# @xutl/ansi

One [eXtremely Useful Tool Library](https://xutl.es) to facilitate writing CLI programs that need colored output and moving the text-cursor.

## Install

```sh
npm install --save @xutl/ansi
```

## Usage

```javascript
import ANSI from '@xutl/ansi';

process.stdout.write(ANSI.red(`my ${ANSI.bold('bold text')} in red`));

import { Stream } from '@xutl/ansi';

const s = new Stream(process.stdout);

s.foreground('red').write('my ').bold().write('bold text').reset().foreground('red').write(' in red');

```

## License

Copyright 2022 xutl.es

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
