sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project001employee.controller.AddBook", {
        onSearch2: function (event) {
            var oItem = event.getParameter("suggestionItem");
            if (oItem) {
                MessageToast.show("Search for: " + oItem.getText());
            } else {
                MessageToast.show("Search is fired!");
            }
        },
    
        onSuggest2: function (event) {
            var sValue = event.getParameter("suggestValue"),
                aFilters = [];
            if (sValue) {
                aFilters = [
                    new Filter([
                        new Filter("ProductId", function (sText) {
                            return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                        }),
                        new Filter("Name", function (sDes) {
                            return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                        })
                    ], false)
                ];
            }
    
            this.oSF.getBinding("suggestionItems").filter(aFilters);
            this.oSF.suggest();
        },
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


	});

//nowy model itd do zapisywania



});