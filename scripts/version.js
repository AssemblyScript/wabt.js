var simpleGit  = require("simple-git");
var semver     = require("semver");
var dateFormat = require('dateformat');

var src = {
  path: __dirname + "/../wabt",
  filter: tag => {
    var match = /^(\d+\.\d+\.\d+)$/.exec(tag);
    return match ? { tag: tag, version: match[1] } : null;
  }
};

var dst = {
  path: __dirname + "/..",
  filter: tag => {
    var match = /^v(\d+\.\d+\.\d+)$/.exec(tag);
    return match ? { tag: tag, version: match[1] } : null;
  }
};

function latest(repo, cb) {
  simpleGit(repo.path).tags({ "--sort": "-committerdate" }, (err, tags) => {
    if (err) return cb(err);
    for (var i = 0; i < tags.all.length; ++i) {
      var result = repo.filter(tags.all[i]);
      if (result !== null) {
        repo.tag = result.tag;
        repo.version = result.version;
        return cb(null);
      };
    }
    return cb(Error("no matching tags: " + tags.all.join(", ")));
  });
}

latest(src, err => {
  if (err) throw err;
  latest(dst, err => {
    if (err) throw err;
    if (process.argv[2] === "tag")
      console.log(src.tag);
    else if (semver.gt(src.version, dst.version))
      console.log(src.version);
    else
      console.log(src.version + "-nightly." + dateFormat(Date.UTC(), "yyyymmdd"));
  });
});
