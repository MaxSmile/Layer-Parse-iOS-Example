var fs = require('fs');
var layer = require('cloud/layer-parse-module/layer-module.js');

var layerProviderID = 'layer:///providers/9fe0e3e0-c527-11e5-87e2-80b60f00199c';  // Should have the format of layer:///providers/<GUID>
var layerKeyID = 'layer:///keys/5187b506-c541-11e5-8a6b-d39400006eed';   // Should have the format of layer:///keys/<GUID>
var privateKey = fs.readFileSync('cloud/layer-parse-module/keys/layer-key.js');
layer.initialize(layerProviderID, layerKeyID, privateKey);

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("generateToken", function(request, response) {
    var currentUser = request.user;
    if (!currentUser) throw new Error('You need to be logged in!');
    var userID = currentUser.id;
    var nonce = request.params.nonce;
    if (!nonce) throw new Error('Missing nonce parameter');
        response.success(layer.layerIdentityToken(userID, nonce));
});