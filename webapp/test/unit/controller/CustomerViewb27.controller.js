/*global QUnit*/

sap.ui.define([
	"app/capgepost27/controller/CustomerViewb27.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CustomerViewb27 Controller");

	QUnit.test("I should test the CustomerViewb27 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
