/** Post-MVP WebAssembly features to legalize. */
interface WasmFeatures { // see: https://github.com/WebAssembly/wabt/blob/main/src/feature.def#L25-L35
  /** Experimental exception handling. */
  exceptions?: boolean;
  /** Import/export mutable globals. */
  mutable_globals?: boolean;
  /** Saturating float-to-int operators. */
  sat_float_to_int?: boolean;
  /** Sign-extension operators. */
  sign_extension?: boolean;
  /** SIMD support. */
  simd?: boolean;
  /** Threading support. */
  threads?: boolean;
  /** Multi-value. */
  multi_value?: boolean;
  /** Tail-call support. */
  tail_call?: boolean;
  /** Bulk-memory operations. */
  bulk_memory?: boolean;
  /** Reference types (externref). */
  reference_types?: boolean;
  /** Custom annotation syntax. */
  annotations?: boolean;
  /** Garbage collection. */
  gc?: boolean;
}

/** Options modifying the behavior of `readWasm`. */
interface ReadWasmOptions {
  /** Reads textual names from the name section. */
  readDebugNames?: boolean;
}

/** Options modifying the behavior of `WasmModule#toText`. */
interface ToTextOptions {
  foldExprs?: boolean;
  inlineExport?: boolean;
}

/** Options modifying the behavior of `WasmModule#toBinary`. */
interface ToBinaryOptions {
  log?: boolean;
  canonicalize_lebs?: boolean;
  relocatable?: boolean;
  write_debug_names?: boolean;
}

/** Result object of `WasmModule#toBinary`. */
interface ToBinaryResult {
  /** The wasm binary buffer. */
  buffer: Uint8Array;
  /** Generated log output. */
  log: string;
}

/** A class representing a WebAssembly module. */
declare class WasmModule {
  constructor(module_addr: number);
  /** Validates the module. Throws if not valid. */
  validate(): void;
  /** Resolves names to indexes. */
  resolveNames(): void;
  /** Generates textual names for function types, globals, labels etc. */
  generateNames(): void;
  /** Applies textual names. Throws on error. */
  applyNames(): void;
  /** Converts the module to wat text format. */
  toText(options: ToTextOptions): string;
  /** Converts the module to a wasm binary. */
  toBinary(options: ToBinaryOptions): ToBinaryResult;
  /** Disposes the module and frees its resources. */
  destroy(): void;
}

interface WabtModule {
  /** Parses a WebAssembly text format source to a module. */
  parseWat(filename: string, buffer: string | Uint8Array, options?: WasmFeatures): WasmModule;
  /** Reads a WebAssembly binary to a module. */
  readWasm(buffer: Uint8Array, options: ReadWasmOptions & WasmFeatures): WasmModule;
}

declare function wabt(): Promise<WabtModule>
export = wabt
