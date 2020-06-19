const fs = require("fs");
const pkg = require("../package.json");

const bin = {}
process.argv.slice(2).forEach(tool => {
  console.log("Registering " + tool);
  bin[tool] = "bin/" + tool;
});
pkg.bin = bin;

console.log("Updating package.json");
fs.writeFileSync(__dirname + '/../package.json', JSON.stringify(pkg, null, 2));
