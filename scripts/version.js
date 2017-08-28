var simpleGit = require("simple-git")(__dirname + "/../.git/modules/wabt");
simpleGit.tags({ "--sort": "committerdate" }, function(err, tags) {
  if (err)
    throw err;
  for (var i = tags.all.length; i >= 0; --i) {
    var match = /^(\d+)\.(\d+)\.(\d+)$/.exec(tags.all[i]); // do not match pre-releases
    if (match) {
      console.log(match[1] + "." + match[2] + "." + match[3]);
      return;
    }
  }
  throw Error("no matching tags");
});
