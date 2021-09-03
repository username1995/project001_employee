sap.ui.define([
    "project001employee/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History"
], function(
	BaseController,
	JSONModel,
	History
) {
	"use strict";

	return BaseController.extend("project001employee.controller.book.Test", {
        onInit: function() {
            sap.ui.getCore().getEventBus().subscribe(
                "SomeChannel",
                "SomeEvent",
                this.onInit(), this
               // this.someFunctionOfTheFirstController,
              //  this
            );
        },

        processLogic: function (sChannelId, sEventId, sData) {
            console.log("Function of the first controller " + sData);
        }








	});
});