const fs = require("fs");
const pkg = require("../package.json");

const bin = {}
process.argv[2].split(" ").forEach(tool => bin[tool] = "bin/" + tool)
pkg.bin = bin

fs.writeFileSync(__dirname + '/../package.json', JSON.stringify(pkg, null, 2));
