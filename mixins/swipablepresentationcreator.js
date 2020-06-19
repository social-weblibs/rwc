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
