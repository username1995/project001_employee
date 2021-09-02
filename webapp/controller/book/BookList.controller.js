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
        },
        onSearch: function(oEvent) 
        {
        var sInputValue = oEvent.getSource().getValue();
        
       this.inputId = oEvent.getSource().getId();
        var path;var oTableStdListTemplate;
        var oFilterTableNo;
        this.oDialog = sap.ui.xmlfragment("project001employee.view.NameSearchHelp", this);
      
        var book = {
            "Name": ""   
        };
        var oView = this.getView();

        // create dialog lazily
        if (!this.byId("idBookSearchHelpFragment")) {
            // load asynchronous XML fragment
            Fragment.load({
                id: oView.getId(),
                name: "project001employee.view.NameSearchHelp",
                controller: this
            }).then(function (oDialog) {
                // connect dialog to the root view of this component (models, lifecycle)
                oView.addDependent(oDialog);
               
                //var oModel = new sap.ui.model.json.JSONModel();

            alert(oDialog);
            //  oDialog.setModel(jsonModel);
            //  alert(oDialog);
            //    oDialog.getModel().setData(book);
                oDialog.open();
            });
        } else {
          //  oDialog.getModel().setData(book);
            this.byId("idBookSearchHelpFragment").open();
        }


        path = "/ZNames2Entity";
        oTableStdListTemplate = new sap.m.StandardListItem({title: "{name}",description: "{name}"});// //create a filter for the binding
        oFilterTableNo = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sInputValue);
        this.oDialog.unbindAggregation("items");
        
        this.oDialog.bindAggregation("items", {
            path: path,
            template: oTableStdListTemplate,
            filters: [oFilterTableNo]}
        );// }// open value help dialog filtered by the input value
             this.oDialog.open(sInputValue);
        },

        handleTableValueHelpConfirm: function(oEvent) 
        {
        var s = oEvent.getParameter("selectedItem");
        var oView = this.getView();
        oView.addDependent(oDialog);
        if (s) {
        //     var oItem, oCtx, sDayId;
        //     oItem = oEvent.getSource();
        //     oCtx = oItem.getBindingContext();
        //     alert(oCtx);
        //      console.log(oItem);
        //       console.log(oItem.getBindingContext().getPath());
        //      console.log(sap.ui.getCore().getModel().getProperty(oCtx.getPath()));
        //    var oPressedItem = sap.ui.getCore().getModel().getProperty(oCtx.getPath());

        var oModel = oEvent.getSource().getModel();
        var oContext = oEvent.getSource().getBindingContext("list");
           // alert(oContext);
           alert(oDialog);


            this.byId(this.inputId).setValue(s.getBindingContext().getObject().Name);
            this.readRefresh(oEvent);

        }
            this.oDialog.destroy();
        },

		onProductValueHelp: function (oEvent) {
			this.inputId = oEvent.getSource().getId();
			
			// Create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"project001employee.view.NameSearchHelp",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
			
			// Open the dialog
			this._valueHelpDialog.open();
		},
		
		onValueHelpSearch : function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(
				"name",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},

		onValueHelpClose : function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
        handleLiveChange : function(oEvent){
            // build filter array
            
                        var aFilter = [];
                        var sQuery = oEvent.getParameter("query");
            
                        if (sQuery) {
                            aFilter.push(new Filter("Name", FilterOperator.EQ, sQuery));
                        }
            
                        // filter binding
                        var oList = this.getView().byId("tableId");
                        var oBinding = oList.getBinding("items");
                        oBinding.filter(aFilter);
            
                  },

    });
});
