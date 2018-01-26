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

export const ready: Promise<undefined>;
export function parseWat(filename: string, buffer: string | Uint8Array): WasmModule;
export function readWasm(buffer: Uint8Array, options: ReadWasmOptions): WasmModule;
