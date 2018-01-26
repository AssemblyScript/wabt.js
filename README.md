wabt.js
=======

**wabt.js** is a port of [WABT](https://github.com/WebAssembly/wabt) to the Web, allowing you to manipulate WebAssembly modules using a JavaScript API.

[![npm](https://img.shields.io/npm/v/wabt.svg)](https://www.npmjs.com/package/wabt) [![npm](https://img.shields.io/npm/v/wabt/nightly.svg)](https://www.npmjs.com/package/wabt) [![Build Status](https://travis-ci.org/AssemblyScript/wabt.js.svg?branch=master)](https://travis-ci.org/AssemblyScript/wabt.js)

Usage
-----

```
$> npm install wabt
```

```js
var wabt = require("wabt");

var wasm = ...; // a buffer holding the contents of a wasm file

var myModule = wabt.readWasm(wasm, { readDebugNames: true });
myModule.applyNames();

var wast = myModule.toText({ foldExprs: false, inlineExport: false });

console.log(wast);
```

The buildbot also publishes nightly versions once a day if there have been changes. The latest nightly can be installed through

```
$> npm install wabt@nightly
```

or you can use one of the [previous versions](https://github.com/AssemblyScript/wabt.js/tags) instead if necessary.

API
---

* **parseWat**(filename: `string`, buffer: `string | Uint8Array`): `WasmModule`<br />
  Parses a wst source to a module.
* **readWasm**(buffer: `Uint8Array`, options: `ReadWasmOptions`): `WasmModule`<br />
  Reads a wasm binaryen to a module.

* **WasmModule**<br />
  A class representing a WebAssembly module.

  * **validate**(): `void`<br />
    Validates the module. Throws if not valid.
  * **resolveNames**(): `void`<br />
    Resolves names to indexes.
  * **generateNames**(): `void`<br />
    Generates textual names for function types, globals, labels etc.
  * **applyNames**(): `void`<br />
    Applies textual names. Throws on error.
  * **toText**(options: `ToTextOptions`): `string`<br />
    Converts the module to wat text format.
  * **toBinary**(options: `ToBinaryOptions`): `ToBinaryResult`<br />
    Converts the module to a wasm binary.
  * **destroy**(): `void`<br />
    Disposes the module and frees its resources.

* **ReadWasmOptions**<br />
  Options modifying the behavior of `readWasm`.

   * **readDebugNames**: `boolean`<br />
     Reads textual names from the name section.

* **ToTextOptions**<br />
  Options modifying the behavior of `WasmModule#toText`.

  * **foldExprs**: `boolean`
  * **inlineExport**: `boolean`

* **ToBinaryOptions**<br />
  Options modifying the behavior of `WasmModule#toBinary`.

  * **log**: `boolean`
  * **canonicalize_lebs**: `boolean`
  * **relocatable**: `boolean`
  * **write_debug_names**: `boolean`

* **ToBinaryResult**<br />
  Result object of `WasmModule#toBinary`.

  * **buffer**: `Uint8Array`<br />
    The wasm binary buffer.

  * **log**: `string`<br />
    Generated log output.
