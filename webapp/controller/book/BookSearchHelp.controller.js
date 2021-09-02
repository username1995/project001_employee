sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project001employee.controller.book.BookSearchHelp", {
        onValueHelpRequested: function() {
            var aCols = this.oColModel.getData().cols;
    
            Fragment.load({
                name: "project001employee.view.NameSearchHelp",
                controller: this
            }).then(function name(oFragment) {
                this._oValueHelpDialog = oFragment;
                this.getView().addDependent(this._oValueHelpDialog);
    
                this._oValueHelpDialog.getTableAsync().then(function (oTable) {
                    oTable.setModel(this.oProductsModel);
                    oTable.setModel(this.oColModel, "columns");
                    this.getView().setModel(this.getOwnerComponent().getModel("tableData"));
                    if (oTable.bindRows) {
                        oTable.bindAggregation("rows", "/cols");
                    }
    
                    if (oTable.bindItems) {
                        oTable.bindAggregation("items", "/cols", function () {
                            return new ColumnListItem({
                                cells: aCols.map(function (column) {
                                    return new Label({ text: "{" + column.template + "}" });
                                })
                            });
                        });
                    }
    
                    this._oValueHelpDialog.update();
                }.bind(this));
    
                var oToken = new Token();
               // oToken.setKey(this._oInput.getSelectedKey());
                oToken.setText(this._oInput.getValue());
                this._oValueHelpDialog.setTokens([oToken]);
                this._oValueHelpDialog.open();
            }.bind(this));
    
        },
    
        onValueHelpOkPress: function (oEvent) {
            var aTokens = oEvent.getParameter("tokens");
            this._oInput.setSelectedKey(aTokens[0].getKey());
            this._oValueHelpDialog.close();
        },
    
        onValueHelpCancelPress: function () {
            this._oValueHelpDialog.close();
        },
    
        onValueHelpAfterClose: function () {
            this._oValueHelpDialog.destroy();
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
		}


	});
});