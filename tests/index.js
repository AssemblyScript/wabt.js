var fs = require("fs");
var test = require("tape");

// This test case exists to catch the most obvious issues before pushing the binary back to GitHub.
// It's not intended to be a full test suite, but feel free to extend it / send a PR if necessary!

var wabt;
test("requiring wabt", function(test) {
  test.doesNotThrow(function() {
    wabt = require("..");
  });
  test.end();
});

var mod;
test("loading a binary module", function(test) {
  var buffer = new Uint8Array(fs.readFileSync(__dirname + "/assembly/module.wasm"));
  test.doesNotThrow(function() {
    mod = wabt.readWasm(buffer, { readDebugNames: true });
  });
  test.ok(mod && typeof mod.toBinary === "function", "should return a module");
  test.end();
});

test("modifying a module", function(test) {
  test.doesNotThrow(function() {
    mod.generateNames();
    mod.applyNames();
  });
  test.end();
});

// var compText = fs.readFileSync(__dirname + "/fixtures/emit.wat", "utf8");
// var compBinary = new Uint8Array(fs.readFileSync(__dirname + "/fixtures/emit.wasm"));

test("emitting a module", function(test) {
  var text, binaryRes;
  test.doesNotThrow(function() {
    text = mod.toText({ foldExprs: true, inlineExport: false });
    binaryRes = mod.toBinary({ write_debug_names: true });
  });
  test.ok(typeof text === "string" && text.length, "should return a string from calling Module#toText");
  test.ok(binaryRes && binaryRes.buffer && binaryRes.buffer.length && typeof binaryRes.log === "string", "should return a binary result from calling Module#toBinary");
  // test.strictEqual(text, compText, "should match the text fixture");
  // test.strictEqual(Buffer.compare(binaryRes.buffer, compBinary), 0, "should match the binary fixture");
  test.end();
});

test("destroying a module", function(test) {
  test.doesNotThrow(function() {
    mod.destroy();
  }, "should not throw when calling Module#destroy");
  test.end();
});

test("loading a text (wast) module", function(test) {
  var str = fs.readFileSync(__dirname + "/assembly/module.wast").toString();
  var mod;
  test.doesNotThrow(function() {
    mod = wabt.parseWat("module.wast", str);
  });
  test.ok(mod && typeof mod.toBinary === "function", "should return a module");
  test.doesNotThrow(function() {
    mod.destroy();
  }, "should not throw when calling Module#destroy");
  test.end();
});
