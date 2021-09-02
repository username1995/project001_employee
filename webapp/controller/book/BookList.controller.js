sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/PDFViewer",	
    'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
    "sap/ui/model/json/JSONModel",
    'sap/m/ColumnListItem',
	'sap/m/Label',
	'sap/m/Token',
	'sap/ui/core/Fragment'
], function (Controller,
	MessageToast,
	Fragment,
	ResourceModel,
	Filter,
	FilterOperator,
	PDFViewer,
	library,
	Spreadsheet, 
    JSONModel,ColumnListItem, Label, Token
     ) {
    "use strict";
    var EdmType = library.EdmType;
//superrrr1!!!!!!!!!! https://embed.plnkr.co/ictpCHG0R3H3jtsCmHKW/?show=App.controller.js,preview
//http://www.sapspot.com/quick-search-help-for-odata-and-sapui5-application/
//https://blogs.sap.com/2019/05/02/quick-search-help-for-odata-and-sapui5-application/

/*var oData = {
    productCollection: []
};

for (var i = 1; i <= 31; i++) {
    oData.productCollection.push({
        "name": "fame " + i

    });
}
*/
//https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.valuehelpdialog.ValueHelpDialog
//https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.valuehelpdialog.ValueHelpDialog%23events/ok





    return Controller.extend("project001employee.controller.book.BookList", {
      //  var chuj;


        onInit : function () {
            
            var i18nModel = new ResourceModel({
                bundleName: "org.ubb.books.i18n.i18n"
            });

   
            this.getView().setModel(i18nModel, "i18n");
            //var oModel = new sap.ui.model.json.JSONModel(oData);
		//	this.getView().setModel(oModel,"list");
           // var oModel = this.getOwnerComponent().getModel("tableData");
			
            var dataModel = this.getOwnerComponent().getModel("tableData");
			this.getView().setModel(dataModel, "DataModel");
           
            this.getView().setModel(this.getOwnerComponent().getModel("dupa"));///////////ale to 
           //potrzebuje zeby named modele dzialaky
            //nadal masz jeden model
           
            this.oColModel = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("project001employee/webapp/localService/mockdata") + "/columnsModel.json");
        }
       
  
    });
});
