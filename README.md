# `codemirror-mode-randomgen`

CodeMirror Mode for [RandomGen](https://orteil.dashnet.org/randomgen/?do=create).

## Installation

```sh
npm install --save codemirror-mode-randomgen
```

## Requirements

You must have `CodeMirror` installed. Before importing this package, import CodeMirror's `mode/simple` addon. If the `mode/overlay` addon and the `xml` mode is imported, then the XML in elements will also be highlighted.

## Usage

This package will simply define the `randomgen` mode. This mode can be specified when initializing the `CodeMirror` editor.
