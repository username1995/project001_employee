sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project001employee.controller.EditBook", {

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
            */            if(validForm) {
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