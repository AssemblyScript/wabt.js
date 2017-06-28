var fs = require("fs");

// Reuse pre-compiled JavaScript library for now
var source = fs.readFileSync(__dirname + "/../wabt/demo/libwabt.js")
  .toString()
  .replace(/(?:\r?\n)+/g, "\n")
  .trim();

// And save it back
fs.writeFileSync(__dirname + "/../index.js", source, "utf8");
