declare module "wasmoon/dist/glue.wasm" {
  const glue: (
    imports: Record<string, any>
  ) => Promise<{ instance: WebAssembly.Instance }>;
  export default glue;
}
