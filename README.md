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
var wabt = require("wabt")();

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

### Usage with a CDN

  * From GitHub via [jsDelivr](https://www.jsdelivr.com):<br />
    `https://cdn.jsdelivr.net/gh/AssemblyScript/wabt.js@VERSION/index.js`
  * From npm via [jsDelivr](https://www.jsdelivr.com):<br />
    `https://cdn.jsdelivr.net/npm/wabt@VERSION/index.js`
  * From npm via [UNPKG](https://unpkg.com):<br />
    `https://unpkg.com/wabt@VERSION/index.js`

  Replace `VERSION` with a [specific version](https://github.com/AssemblyScript/wabt.js/releases) or omit it (not recommended in production) to use master/latest.


API
---

* **parseWat**(filename: `string`, buffer: `string | Uint8Array`, options?: `WasmFeatures`): `WasmModule`<br />
  Parses a wst source to a module.
* **readWasm**(buffer: `Uint8Array`, options: `ReadWasmOptions & WasmFeatures`): `WasmModule`<br />
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

* **WasmFeatures**<br />
  Post-MVP WebAssembly features to legalize.

  * **exceptions**: `boolean`<br />
    Exception handling ([proposal](https://github.com/WebAssembly/exception-handling)).
  * **mutable_globals**: `boolean`<br />
    Import/Export mutable globals ([proposal](https://github.com/WebAssembly/mutable-global)).
  * **sat_float_to_int**: `boolean`<br />
    Non-trapping Float-to-int Conversions ([proposal](https://github.com/WebAssembly/nontrapping-float-to-int-conversions)).
  * **sign_extension**: `boolean`<br />
    Sign-extension operators ([proposal](https://github.com/WebAssembly/sign-extension-ops)).
  * **simd**: `boolean`<br />
    128-bit packed SIMD ([proposal](https://github.com/WebAssembly/simd)).
  * **threads**: `boolean`<br />
    Threading ([proposal](https://github.com/WebAssembly/threads)).
  * **multi_value**: `boolean`<br />
    Multi-value ([proposal](https://github.com/WebAssembly/multi-value)).
  * **tail_call**: `boolean`<br />
    Tail Call ([proposal](https://github.com/WebAssembly/tail-call)).
  * **bulk_memory**: `boolean`<br />
    Bulk Memory Operations and Conditional Segment Initialization ([proposal](https://github.com/WebAssembly/bulk-memory-operations)).
  * **reference_types**: `boolean`<br />
    Reference Types ([proposal](https://github.com/WebAssembly/reference-types)).
  * **annotations**: `boolean`<br />
    Custom Annotation Syntax for the Wasm Text Format ([proposal](https://github.com/WebAssembly/annotations)).
