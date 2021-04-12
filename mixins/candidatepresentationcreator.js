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
