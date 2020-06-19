(function createRWCWebLib (execlib) {
  'use strict';
  var lib = execlib.lib,
    lR = execlib.execSuite.libRegistry,
    ret = {};
  require('./mixins')(lib, lR.get('allex_hammerjslib'), ret);

  lR.register('social_rwcweblib', ret);
})(ALLEX);
