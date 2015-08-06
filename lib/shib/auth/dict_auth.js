var fs = require('fs');

var AccessControl = require('shib/access_control').AccessControl;

var Auth = exports.Auth = function(args, logger){
  this.logger = logger;

  this._dict_file = args.dict_file;

  if (!this._dict_file)
    throw "password file not specified";

  this._acl_config = args.access_control;
};

Auth.prototype.check = function(req, callback) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    callback(null, false);
    return;
  }

  var auth_string = username + ':' + password;

  fs.readFile(this._dict_file, {encoding: 'utf8'}, function (err, data) {
    if (err) {
      callback(err);
    } else {
      var success = false;
      var lines = data.split('\n');
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].localeCompare(auth_string) == 0) {
          success = {username: username, password: password};
          break;
        }
      }
      callback(null, success);
    }
  });
};

Auth.prototype.acl_delegators = function(req, username, options) {
  var acl_config = null;
  if (username && this._acl_config && this._acl_config['users'] && this._acl_config['users'][username])
    acl_config = this._acl_config['users'][username];

  if (!acl_config) {
    if (options.require_always || this._acl_config && this._acl_config['default'] === 'deny')
      return [function(t,d){return false;}, function(d){return false;}];

    return [function(t,d){return true;}, function(d){return true;}];
  }
  var acl = new AccessControl(acl_config);
  // allowed(tablename, dbname), visible(dbname)
  return [function(t,d){return acl.allowed(t,d);}, function(d){return acl.visible(d);}];
};
