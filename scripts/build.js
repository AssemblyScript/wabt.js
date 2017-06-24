// Note that this makes quite a few assumptions that might break at any point.

var fs = require("fs");

// Reuse pre-compiled JavaScript library for now
var source = fs.readFileSync(__dirname + "/../wabt/demo/libwabt.js").toString()
  .trim()
  .replace(/;$/, "");

// Append an UMD shim that doesn't conflict with the global 'wabt' var
source += "\n\n" + [
  'if("undefined"!=typeof module&&module&&module.exports)module.exports=wabt;',
  'else if("function"==typeof define&&define.amd)define(function(){return wabt});'
].join("");

// And save it back
fs.writeFileSync(__dirname + "/../index.js", source, "utf8");
