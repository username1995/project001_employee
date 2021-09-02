sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project001employee.controller.book.AddBook", {

        onAdd() {
            var book = {
                "Id": 0,
                "Name": "",
                "Age": ""       
            };
            var oView = this.getView();

            // create dialog lazily
            if (!this.byId("idBookAddDialog")) {
                // load asynchronous XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "project001employee.view.fragments.AddDialog",
                    controller: this
                }).then(function (oDialog) {
                    // connect dialog to the root view of this component (models, lifecycle)
                    oView.addDependent(oDialog);
                    var oModel = new sap.ui.model.json.JSONModel();
                    oDialog.setModel(oModel);
                    oDialog.getModel().setData(book);
                    oDialog.open();
                });
            } else {
              //  oDialog.getModel().setData(book);
                this.byId("idBookAddDialog").open();
            }
        },
        handleCancel() {
            this.byId("idBookAddDialog").close();
        },
        handleSave(oEvent) {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var oModel = oEvent.getSource().getModel();
            var oDialogData = oModel.getData();

            var obj = JSON.stringify(oDialogData, function (key, value) {
            if (key == "Id") {
                return value;
            } else {
                return value;
            }
            });
            console.log(obj);


            var obj2 = JSON.parse(obj, function (key, value) {
            if (key == "Id") {
                return parseInt(value)  ;
            } else {
                return value;
            }
            });
            console.log(obj2);


            var validForm = true;

       
      /*
         if(oDialogData.Id) {
                validForm = false;
                var sMsg = oBundle.getText("isbnReq");
                MessageToast.show(sMsg);
            }
            if(oDialogData.Author.length === 0) {
                validForm = false;
                var sMsg = oBundle.getText("authReq");
                MessageToast.show(sMsg);
            }
            if(oDialogData.Title.length === 0) {
                validForm = false;
                var sMsg = oBundle.getText("titleReq");
                MessageToast.show(sMsg);
            }
            if(oDialogData.Language.length === 0) {
                validForm = false;
                var sMsg = oBundle.getText("langReq");
                MessageToast.show(sMsg);
            }
            if(!(oDialogData.Language !== 'EN' || oDialogData.Language != 'DE' || oDialogData.Language != 'RU'
            || oDialogData.Language != 'FR' || oDialogData.Language != 'PT' || oDialogData.Language != 'ES')) {
                validForm = false;
                var sMsg = oBundle.getText("invalidLanguage");
                MessageToast.show(sMsg);
            }
            oDialogData.AvailableNumber = parseInt(oDialogData.AvailableNumber);
            oDialogData.TotalNumber = parseInt(oDialogData.TotalNumber);
            if(oDialogData.AvailableNumber > oDialogData.TotalNumber) {
                validForm = false;
                var sMsg = oBundle.getText("noGreater");
                MessageToast.show(sMsg);
            }
            oDialogData.DatePublication = "2015-12-31T00:00:00";
            oDialogData.CreatedOn = "2015-12-31T00:00:00";
            oDialogData.ChangedOn = "2015-12-31T00:00:00";
            */
            //https://answers.sap.com/questions/517795/bad-request-from-sapui5-odata.html

            if(validForm) {
                this.getView().getModel().create("/EMPLOYEESet", obj2, {
                    //https://answers.sap.com/questions/13388355/failed-to-read-property.html
                   //METHOD: "POST",
                    success: function () {
                        var sMsg = oBundle.getText("bookInserted");
                        MessageToast.show(sMsg);
                    },
                    error: function () {
                        var sMsg = oBundle.getText("bookNotInserted");
                        MessageToast.show(sMsg);
                    }
                });
            }
        },
  /*      FILTEREVENT: function(oEvent) {
            var sValue = oEvent.getParameter("Name") //value
            var sColumn = oEvent.getParameter("column").getId();
             oEvent.preventDefault();

},*/








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