// WABT Features. Taken from:
// https://github.com/WebAssembly/wabt/blob/master/src/feature.def#L25-L35
interface WasmFeatures {
  exceptions?: boolean;
  mutable_globals?: boolean;
  sat_float_to_int?: boolean;
  sign_extension?: boolean;
  simd?: boolean;
  threads?: boolean;
  multi_value?: boolean;
  tail_call?: boolean;
  bulk_memory?: boolean;
  reference_types?: boolean;
  annotations?: boolean;
}

interface ReadWasmOptions {
  readDebugNames?: boolean;
}

interface ToTextOptions {
  foldExprs?: boolean;
  inlineExport?: boolean;
}

interface ToBinaryOptions {
  log?: boolean;
  canonicalize_lebs?: boolean;
  relocatable?: boolean;
  write_debug_names?: boolean;
}

interface ToBinaryResult {
  buffer: Uint8Array;
  log: string;
}

declare class WasmModule {
  constructor(module_addr: number);
  validate(): void;
  resolveNames(): void;
  generateNames(): void;
  applyNames(): void;
  toText(options: ToTextOptions): string;
  toBinary(options: ToBinaryOptions): ToBinaryResult;
  destroy(): void;
}

interface WabtModule {
  ready: Promise<undefined>
  parseWat(filename: string, buffer: string | Uint8Array, options?: WasmFeatures): WasmModule;
  readWasm(buffer: Uint8Array, options: ReadWasmOptions & WasmFeatures): WasmModule;
}

declare function wabt(): WabtModule
export = wabt
