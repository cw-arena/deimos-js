import { LuaEngine, LuaFactory } from "wasmoon";
import instanceFactory from "wasmoon/dist/glue.wasm";
import luaSource from "./source";

const getFactory = (() => {
  const factory = new LuaFactory({
    type: "factory",
    instanceFactory,
  });
  let initialized = false;

  return async () => {
    if (!initialized) {
      for (const [module, source] of Object.entries(luaSource)) {
        await factory.mountFile(module, source);
      }
      initialized = true;
    }
    return factory;
  };
})();

export class Mars {
  engine: LuaEngine;

  private constructor(engine: LuaEngine) {
    this.engine = engine;
  }

  static async create() {
    const factory = await getFactory();
    const engine = await factory.createEngine();
    return new Mars(engine);
  }
}
