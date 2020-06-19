function createMixins (lib, hammerlib, mylib) {
  'use strict';

  var ret = {};

  require('./swipablepresentationcreator')(lib, hammerlib, ret);

  mylib.mixins = ret;
}
module.exports = createMixins;
