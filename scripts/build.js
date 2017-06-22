// Note that this makes quite a few assumptions that might break at any point.

var fs = require("fs");

// Reuse pre-compiled JavaScript library for now
var source = fs.readFileSync(__dirname + "/../wabt/demo/libwabt.js").toString()
  .trim()
  .replace(/;$/, "");

// Append a CommonJS shim that doesn't conflict with the global 'wabt' var
source += ";\n\nif(\"undefined\"!=typeof module&&module&&module.exports)module.exports=wabt;";

// And save it back
fs.writeFileSync(__dirname + "/../index.js", source, "utf8");
