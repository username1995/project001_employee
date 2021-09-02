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
    "project001employee/libs/chuj",
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

var oData = {
    productCollection: []
};

for (var i = 1; i <= 31; i++) {
    oData.productCollection.push({
        "name": "fame " + i

    });
}
//https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.valuehelpdialog.ValueHelpDialog
//https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.valuehelpdialog.ValueHelpDialog%23events/ok





    return Controller.extend("project001employee.controller.BookList", {
      //  var chuj;

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

                if (oTable.bindRows) {
                    oTable.bindAggregation("rows", "/ProductCollection2");
                }

                if (oTable.bindItems) {
                    oTable.bindAggregation("items", "/ProductCollection2", function () {
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
        onInit : function () {
            
            var i18nModel = new ResourceModel({
                bundleName: "org.ubb.books.i18n.i18n"
            });
        this.oColModel = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("project001_employee/webapp/localService/mockdata") + "/columnsModel.json");

// this.ODataServiceUrl = "/sap/opu/odata/sap/ZEMPLOYEES_SRV/";
// this.oDataModel = new sap.ui.model.odata.ODataModel(
//     this.ODataServiceUrl,true
// );
// sap.ui.getCore().setModel(this.oDataModel,"dupa2");







          /*  var oModel = new sap.ui.model.json.JSONModel(
                {"animals": [
                  {
                    "name": "Fox",
                    "favouriteFood": "chicken",
                    "color": "red",
                    "numberOfLegs": "4"
                  },
                  {
                    "name": "Pig",
                    "favouriteFood": "everything",
                    "color": "pink",
                    "numberOfLegs": "4"
                  },
                  {
                    "name": "Cat",
                    "favouriteFood": "mouse",
                    "color": "grey",
                    "numberOfLegs": "4"
                  },
                  {
                    "name": "Snake",
                    "favouriteFood": "mouse",
                    "color": "green",
                    "numberOfLegs": "0"
                  }
                ]}
              );
              this.getView().setModel(oModel);
*/
   
            this.getView().setModel(i18nModel, "i18n");
            var oModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(oModel,"list");
    //         var jsonModel = new sap.ui.model.json. JSONModel({
    //             rows: [{
    //               name: '00001000'
    //             }, {
    //               name: '00002000'
    //             }]
    //           });

    //    this.getView().setModel(jsonModel, "list");
           
            //     var jsonModel = new sap.ui.model.json. JSONModel({
            //         rows: [{
            //           sectionId: '00001000',
            //           costId: '1L'
            //         }, {
            //           sectionId: '00002000',
            //           costId: '2'
            //         }]
            //       });

            // this.getView().setModel(jsonModel, "list");
            //this.getView().setModel(this.getOwnerComponent().getModel());

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


        createColumnConfig: function() {
			var aCols = [];

			aCols.push({
				label: 'Full name',
				property: ['Lastname', 'Firstname'],
				type: EdmType.String,
				template: '{0}, {1}'
			});

			aCols.push({
				label: 'ID',
				type: EdmType.Number,
				property: 'Id',
				scale: 0
			});

			aCols.push({
				property: 'Name',
				type: EdmType.String
			});

			aCols.push({
				property: 'Age',
				type: EdmType.String
			});

			
			return aCols;
		},





		onExport: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;
            // var rshit = new shittyThing();
            
            // console.log(rshit.shit);
			if (!this._oTable) {
				this._oTable = this.byId('idBooksTable');
			}

			oTable = this._oTable;
			oRowBinding = oTable.getBinding('items');
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: '123456.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},
        showPDF:  function (oEvent){
            var opdfViewer = new PDFViewer();
			this.getView().addDependent(opdfViewer);
			var sServiceURL = this.getView().getModel().sServiceUrl;
			var sSource = sServiceURL + "/PDFSET('')/$value";
			opdfViewer.setSource(sSource);
			opdfViewer.setTitle( "My PDF");
			opdfViewer.open();	
			
		},
        onDelete() {
            const selectedRows = this.byId("idBooksTable").getSelectedContexts();
            if (selectedRows.length === 0) {
                MessageToast.show("No book was selected!");
            } else {
                const selectedRow = selectedRows[0];
                const isbnPath = selectedRow.getPath();
                this.getView().getModel().remove(isbnPath, {
                    success: () => {
                        var oBundle = this.getView().getModel("i18n").getResourceBundle();
                        var sMsg = oBundle.getText("bookDeleted");
                        MessageToast.show(sMsg);
                    },
                    error: () => {
                        var oBundle = this.getView().getModel("i18n").getResourceBundle();
                        var sMsg = oBundle.getText("bookNotDeleted");
                        MessageToast.show(sMsg);
                    }
                },);
            }
        },
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
                    name: "project001employee.view.AddDialog",
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
        onUpdate(oEvent) {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            const selectedRows = this.byId("idBooksTable").getSelectedContexts();
            if (selectedRows.length === 0) {
                var sMsg = oBundle.getText("noBook");
                MessageToast.show(sMsg);
            } else {
                var oView = this.getView();
                var oObject = oView.byId("idBooksTable").getSelectedContexts()[0].getObject();
                var book = {
                    "Id": 0,
                    "Name": "",
                    "Age": ""       
                };
                if (!this.byId("idBookUpdateDialog")) {
                    // load asynchronous XML fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "project001employee.view.UpdateDialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        var oModel = new sap.ui.model.json.JSONModel();
                        oDialog.setModel(oModel);
                        oDialog.getModel().setData(book);
                        oDialog.open();
                    });
                } else {
                    var oModel = new sap.ui.model.json.JSONModel();
                //    oDialog.setModel(oModel);
              //      oDialog.getModel().setData(book);
                    this.byId("idBookUpdateDialog").open();
                }
            }
        },
        onFilterBooks : function (oEvent) {

			// build filter array
         /*   var sQuery = oEvent.getParameter("query");
			var oView = this.getView(),
				sValue = oView.byId("searchField").getValue(),
				oFilter = new Filter("Name", FilterOperator.Contains, sValue);

			oView.byId("idBooksTable").getBinding("items").filter(oFilter, FilterOperator.Contains,sQuery);

*/
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");

			var aFilter = [];
		
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.getView().byId("idBooksTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
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
        handleCancelUpdate() {
            this.byId("idBookUpdateDialog").close();
        },
        handleUpdate(oEvent) {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var oModel = oEvent.getSource().getModel();
            var oDialogData = oModel.getData();
            var validForm = true;
          /*  if(oDialogData.ISBN.length === 0) {
                validForm = false;
                var sMsg = oBundle.getText("isbnReq");
                MessageToast.show(sMsg);
            }
            if(oDialogData.Author.length === 0) {
                validForm = false;
                var sMsg = oBundle.getText("authorReq");
                MessageToast.show(sMsg);
            }
            if(oDialogData.Title.length === 0) {
                validForm = false;
                MessageToast.show("Title is required!");
            }
            if(oDialogData.Title.language === 0) {
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
            if(validForm) {
                var oView = this.getView();
                var sPath = oView.byId("idBooksTable").getSelectedContexts()[0].getPath();
                this.getView().getModel().update(sPath, oDialogData, {
                    success: function () {
                        var sMsg = oBundle.getText("bookUpdated");
                        MessageToast.show(sMsg);
                    },
                    error: function () {
                        var sMsg = oBundle.getText("bookNotUpdated");
                        MessageToast.show(sMsg);
                    }
                });
                this.handleCancelUpdate();
            }
            
        }
    });
});