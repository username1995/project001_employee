sap.ui.define([
   // "sap/ui/core/mvc/Controller",
    "project001employee/controller/BaseController",
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
	'sap/m/Token'


], function (
	BaseController,
	MessageToast,
    Fragment,
	Filter,
	FilterOperator,
	PDFViewer,
	library,
	Spreadsheet,
	JSONModel,
	ColumnListItem,
	Label,
	Token
	
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





    return BaseController.extend("project001employee.controller.book.BookList", {
      //  var chuj;


        onInit : function () {
            
       ////     var i18nModel = new ResourceModel({
      //          bundleName: "org.ubb.books.i18n.i18n"
          ////  });

         //   this.getView().setModel(i18nModel, "i18n");
            this.getView().setModel(this.getOwnerComponent().getModel("dupa"));///////////ale to      
        },
        onAdd(){
            var oView = this.getView();
        
      //      var myController = sap.ui.controller("project001employee.controller.book.Test");
       //     myController.processLogic();
          
          //  var oController = sap.ui.getCore().byId("idBookAddDialog").getController();

          if (!this.byId("idBookAddDialog")) {
                // load asynchronous XML fragment
                Fragment.load({
                    id: "idBookAddFragment", //oView.getId(),
                    name: "project001employee.view.fragments.AddDialog",
                    controller: this
                }).then(function (oDialog) {
                    // connect dialog to the root view of this component (models, lifecycle)
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("idBookAddDialog").open();
            } 




           
        },
       handleSave( oEvent){

       }
  
    });
});
