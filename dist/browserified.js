(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function createRWCWebLib (execlib) {
  'use strict';
  var lib = execlib.lib,
    lR = execlib.execSuite.libRegistry,
    ret = {};
  require('./mixins')(lib, lR.get('allex_hammerjslib'), ret);

  lR.register('social_rwcweblib', ret);
})(ALLEX);

},{"./mixins":3}],2:[function(require,module,exports){
function createCandidatePresentationMixin (lib, mylib) {
  'use strict';

  function CandidatePresentationMixin (options) {
    if (!lib.isString(options.acceptEventName)) {
      throw new Error ('options for '+this.constructor.name+' have to have "acceptEventName" property');
    }
    if (!lib.isString(options.rejectEventName)) {
      throw new Error ('options for '+this.constructor.name+' have to have "rejectEventName" property');
    }
    options.elements = options.elements || [];
    if (options.clickables) {
      options.elements.push(options.clickables.reject);
      options.elements.push(options.clickables.accept);
    }
  }
  CandidatePresentationMixin.prototype.destroy = function () {
  };
  CandidatePresentationMixin.prototype.initiateCandidatePresentationFunctionality = function () {
    var clickables = this.getConfigVal('clickables');
    if (!clickables) {
      return;
    }
    this.getElement(clickables.reject.name).clicked.attach(this.fireReject.bind(this));
    this.getElement(clickables.accept.name).clicked.attach(this.fireAccept.bind(this));
  };
  CandidatePresentationMixin.prototype.fireReject = function () {
    console.log('reject!');
    //this.__parent.__parent.needToReject.fire(this.data.username);
    this.__parent.__parent[this.getConfigVal('rejectEventName')].fire(this);
  };
  CandidatePresentationMixin.prototype.fireAccept = function (data) {
    console.log('candi-date!');
    //this.__parent.__parent.needToInitiate.fire(this.data.username);
    this.__parent.__parent[this.getConfigVal('acceptEventName')].fire(this, data);
  };

  CandidatePresentationMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, CandidatePresentationMixin
      ,'initiateCandidatePresentationFunctionality'
      ,'fireReject'
      ,'fireAccept'
    );
    klass.prototype.postInitializationMethodNames = klass.prototype.postInitializationMethodNames.concat('initiateCandidatePresentationFunctionality');
  };

  mylib.CandidatePresentation = CandidatePresentationMixin;
}
module.exports = createCandidatePresentationMixin;

},{}],3:[function(require,module,exports){
function createMixins (lib, hammerlib, mylib) {
  'use strict';

  var ret = {};

  require('./swipablepresentationcreator')(lib, hammerlib, ret);
  require('./candidatepresentationcreator')(lib, ret);

  mylib.mixins = ret;
}
module.exports = createMixins;

},{"./candidatepresentationcreator":2,"./swipablepresentationcreator":4}],4:[function(require,module,exports){
function createSwipablePresentationMixin (lib, hammerlib, mylib) {
  'use strict';

  var HammerableMixin = hammerlib.mixins.HammerableMixin;

  function SwipablePresentationMixin (options) {
    HammerableMixin.call(this, options);
  }
  SwipablePresentationMixin.prototype.destroy = function () {
    HammerableMixin.prototype.destroy.call(this);
  };
  SwipablePresentationMixin.prototype.onHammerPan = function (hevnt) {
    HammerableMixin.prototype.onHammerPan.call(this, hevnt);
    this.$element.css({opacity: 1-(hevnt.distance/200)});
    //this.$element.css({transform: 'rotate('+(Math.sign(hevnt.deltaX)*hevnt.distance/15)+'deg)'});
  };
  SwipablePresentationMixin.prototype.resetHammerPosition = function () {
    if (this.hammerPos) {
      this.$element.css({opacity: 1});
      //this.$element.css({transform: 'rotate(0deg)'});
      this.$element.offset(this.hammerPos);
    } else {
      console.warn('no hammerPos?');
    }
  };
  SwipablePresentationMixin.prototype.onHammerSwipe = function (hevnt) {
    var curpos;
    if (!this.lastKnownHammerPos) {
      return;
    }
    if (this.isDistanceWeak(hevnt)) {
      return;
    }
    curpos = this.$element.offset();
    if (this.lastKnownHammerPos.left>curpos.left) {
      this.onHammerSwipeLeft();
      return;
    }
    this.onHammerSwipeRight();
  };
  SwipablePresentationMixin.prototype.onHammerSwipeLeft = function () {
    this.fireReject();
  };
  SwipablePresentationMixin.prototype.onHammerSwipeRight = function () {
    this.fireAccept();
  };

  SwipablePresentationMixin.addMethods = function (klass, parentclass) {
    HammerableMixin.addMethods(klass, parentclass);
    lib.inheritMethods(klass, SwipablePresentationMixin
      ,'onHammerPan'
      ,'resetHammerPosition'
      ,'onHammerSwipe'
      ,'onHammerSwipeLeft'
      ,'onHammerSwipeRight'
    );
  };

  mylib.SwipablePresentation = SwipablePresentationMixin;
}
module.exports = createSwipablePresentationMixin;

},{}]},{},[1]);
