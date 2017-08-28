export interface ReadWasmOptions {
  readDebugNames?: boolean;
}

export interface ToTextOptions {
  foldExprs?: boolean;
  inlineExport?: boolean;
}

export interface ToBinaryOptions {
  log?: boolean;
  canonicalize_lebs?: boolean;
  relocatable?: boolean;
  write_debug_names?: boolean;
}

export interface ToBinaryResult {
  buffer: Uint8Array;
  log: string;
}

export function parseWast(filename: string, buffer: string | Uint8Array): WasmModule;
export function readWasm(buffer: Uint8Array, options: ReadWasmOptions): WasmModule;

export class WasmModule {
  constructor(module_addr: number);
  generateNames(): void;
  applyNames(): void;
  toText(options: ToTextOptions): string;
  toBinary(options: ToBinaryOptions): ToBinaryResult;
  destroy(): void;
}
