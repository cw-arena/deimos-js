import fs from "fs";
import path from "path";

const generateLuaSources = () => {
  // TODO: Once deimos is published to LuaRocks, we should pull it here at a
  // pinned version instead of referencing a local (and possibly missing) filepath
  const deimosPath = "../deimos/lua";
  const deimosLuaSources = {};

  fs.readdirSync(deimosPath, { recursive: true, encoding: "utf-8" }).forEach(
    (filename) => {
      if (!filename.endsWith(".lua")) {
        return;
      }

      const filepath = path.join(deimosPath, filename);
      const module = filename
        .replace(/\.lua$/, "")
        .split("/")
        .join(".");

      deimosLuaSources[module] = fs.readFileSync(filepath, {
        encoding: "utf-8",
      });
    }
  );

  return `export default ${JSON.stringify(deimosLuaSources)};`;
};

export default generateLuaSources;
