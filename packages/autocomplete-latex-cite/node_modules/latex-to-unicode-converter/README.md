# LaTeX to Unicode converter for JavaScript / TypeScript
[![npm version](https://badge.fury.io/js/latex-to-unicode-converter.svg)](https://www.npmjs.com/package/latex-to-unicode-converter)
[![Build Status](https://travis-ci.org/digitalheir/latex-to-unicode-converter.svg?branch=master)](https://travis-ci.org/digitalheir/latex-to-unicode-converter)
![License](https://img.shields.io/npm/l/latex-to-unicode-converter.svg)


Convert LaTeX strings to Unicode. [Live demo in browser](https://digitalheir.github.io/latex-to-unicode-converter/)

Mappings are collected from here and there. As such, I believe this is the most comprehensive LaTeX to Unicode converter on the web.

## Installing

Download the [latest standalone JavaScript file (ES5)](https://github.com/digitalheir/latex-to-unicode-converter/releases/latest) or install via [`npm`](https://www.npmjs.com/package/latex-to-unicode-converter):

```sh
npm install latex-to-unicode-converter
```

## Usage

```js
import {convertLaTeXToUnicode} from 'latex-to-unicode-converter';

convertLaTeXToUnicode("\\frak{A} + \\alpha = 3");
// > 𝔄 + α = 3
```

You may not like the fact that this throws an error when you type something that the program doesn't understand. You can provide an error handler:


```js
import {convertLaTeX, stringifyLaTeX} from "latex-to-unicode-converter";

convertLaTeX({
        onError: (error, latex) => stringifyLaTeX(latex)
    },
    "\\unknown{A} + \\alpha = 3"
);
// > \unknown{A} + α = 3
```

## See also
* [mathy-unicode-characters](https://digitalheir.github.io/mathy-unicode-characters) for mappings from and to Unicode characters and LaTeX commands
* [latex-parser](https://github.com/digitalheir/latex-parser) for parsing LaTeX into an abstract syntax tree

## Contact
Maarten Trompper <<maartentrompper@freedom.nl>>
