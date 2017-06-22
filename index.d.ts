export interface IReadWasmOptions {
  readDebugNames?: boolean;
}

export interface IToTextOptions {
  foldExprs?: boolean;
  inlineExport?: boolean;
}

export interface IToBinaryOptions {
  log?: boolean;
  canonicalize_lebs?: boolean;
  relocatable?: boolean;
  write_debug_names?: boolean;
}

export interface IToBinaryResult {
  buffer: Uint8Array;
  log: string;
}

export function parseWast(filename: string, buffer: string | Uint8Array): WasmModule;
export function readWasm(buffer: Uint8Array, options: IReadWasmOptions): WasmModule;

export class WasmModule {
  constructor(module_addr: number);
  generateNames(): void;
  applyNames(): void;
  toText(options: IToTextOptions): string;
  toBinary(options: IToBinaryOptions): IToBinaryResult;
  destroy(): void;
}
