set -e
cd wabt/
export EMSCRIPTEN_DIR="$(dirname $(which emcc))"
make emscripten-release
cp out/emscripten/Release/libwabt.js ../index.js
