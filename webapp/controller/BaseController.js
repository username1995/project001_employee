sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, History, UIComponent) {
	"use strict";

	return Controller.extend("project001employee.controller.BaseController", {


	// author's profile photo Former Member
		// Former Member
		// Jun 22, 2016 at 07:31 AM
		// Try to create some function (with name, for example: "getData") in your first controller of your first view 
		// (with id, for example: "firstView") and to get your data by calling this function 
		// from another controller in following way: oData = sap.ui.getCore().byId("firstView").getController().getData();


	//	https://stackoverflow.com/questions/25806938/get-another-components-context-in-sapui5
//https://learntips.net/sapui5-dialogwith-businesscard-as-xml-fragment-along-with-controller/

//czy to nie jest rodzaj routingu
toChildA: function () {
	this.getOwnerComponent().getRouter().navTo("ChildA");
},

toChildB: function () {
	this.getOwnerComponent().getRouter().navTo("ChildB");
},

//mozesz tylko do widoku zrobic kontroler
//https://stackoverflow.com/questions/53542457/sapui5-using-the-same-controller-for-two-views
//https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.core.EventBus%23overview
//https://stackoverflow.com/questions/23696692/access-one-controller-inside-another-in-sapui5
//https://answers.sap.com/questions/11348930/calling-a-method-between-two-controller.html
onAdd : function () {
	var oController = sap.ui.getCore().byId("idView1").getController();
},
onUpdate : function () {
	var oController = sap.ui.getCore().byId("idView1").getController();
},
onDelete: function () {
	var oController = sap.ui.getCore().byId("idView1").getController();
},
onFilterBooks : function () {
	var oController = sap.ui.getCore().byId("idView1").getController();
},
onExport : function () {
	var oController = sap.ui.getCore().byId("idView1").getController();
},
showPDF: function () {
	var oController = sap.ui.getCore().byId("idView1").getController();
}






		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		}

	});

});