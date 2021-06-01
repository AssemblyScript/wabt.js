wabt.js
=======

**wabt.js** is a port of [WABT](https://github.com/WebAssembly/wabt) to the Web, allowing you to manipulate WebAssembly modules using a JavaScript API.

<a href="https://github.com/AssemblyScript/wabt.js/actions?query=workflow%3ABuild"><img src="https://img.shields.io/github/workflow/status/AssemblyScript/wabt.js/Build/main?label=build&logo=github" alt="Build status" /></a>
<a href="https://www.npmjs.com/package/wabt"><img src="https://img.shields.io/npm/v/wabt.svg?label=latest&color=007acc&logo=npm" alt="npm version" /></a>
<a href="https://www.npmjs.com/package/wabt"><img src="https://img.shields.io/npm/v/wabt/nightly.svg?label=nightly&color=007acc&logo=npm" alt="npm nightly version" /></a>

Usage
-----

```
$> npm install wabt
```

```js
require("wabt")().then(wabt => {
  var wasm = ...; // a buffer holding the contents of a wasm file

  var myModule = wabt.readWasm(wasm, { readDebugNames: true });
  myModule.applyNames();

  var wast = myModule.toText({ foldExprs: false, inlineExport: false });

  console.log(wast);
});
```

The buildbot also publishes nightly versions once a day if there have been changes. The latest nightly can be installed through

```
$> npm install --save-exact wabt@nightly
```

or you can use one of the [previous versions](https://github.com/AssemblyScript/wabt.js/tags) instead if necessary. Note the `--save-exact` when using a nightly.

### Usage with a CDN

  * From GitHub via [jsDelivr](https://www.jsdelivr.com):<br />
    `https://cdn.jsdelivr.net/gh/AssemblyScript/wabt.js@VERSION/index.js`
  * From npm via [jsDelivr](https://www.jsdelivr.com):<br />
    `https://cdn.jsdelivr.net/npm/wabt@VERSION/index.js`
  * From npm via [UNPKG](https://unpkg.com):<br />
    `https://unpkg.com/wabt@VERSION/index.js`

  Replace `VERSION` with a [specific version](https://github.com/AssemblyScript/wabt.js/releases) or omit it (not recommended in production) to use main/latest.


API
---

* **parseWat**(filename: `string`, buffer: `string | Uint8Array`, options?: `WasmFeatures`): `WasmModule`<br />
  Parses a WebAssembly text format source to a module.
* **readWasm**(buffer: `Uint8Array`, options: `ReadWasmOptions & WasmFeatures`): `WasmModule`<br />
  Reads a WebAssembly binary to a module.

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
  * **gc**: `boolean`<br />
    Garbage collection ([proposal](https://github.com/WebAssembly/gc)).

CLI
---

Node.js ports of the following command line tools are included in the package as well:

* [wasm2c](https://webassembly.github.io/wabt/doc/wasm2c.1.html) converts a WebAssembly binary file to a C source and header.
* [wasm2wat](https://webassembly.github.io/wabt/doc/wasm2wat.1.html) translates from WebAssembly binary format to text format.
* [wat2wasm](https://webassembly.github.io/wabt/doc/wat2wasm.1.html) translates from WebAssembly text format to binary format.
* [wasm-decompile](https://webassembly.github.io/wabt/doc/wasm-decompile.1.html) decompiles a wasm binary into readable C-like syntax.
* [wasm-interp](https://webassembly.github.io/wabt/doc/wasm-interp.1.html) decodes and runs a WebAssembly binary file using a stack-based interpreter.
* [wasm-objdump](https://webassembly.github.io/wabt/doc/wasm-objdump.1.html) prints information about a wasm binary. Similiar to objdump.
* [wasm-opcodecnt](https://webassembly.github.io/wabt/doc/wasm-opcodecnt.1.html) counts opcode usage for instructions.
* [wasm-strip](https://webassembly.github.io/wabt/doc/wasm-strip.1.html) removes sections of a WebAssembly binary file.
* [wasm-validate](https://webassembly.github.io/wabt/doc/wasm-validate.1.html) validates a file in WebAssembly binary format.

The tools can also be run ad hoc (without explicitly installing the package), for example with:

```
$> npx -p wabt wasm2wat myModule.wasm -o myModule.wat
```
