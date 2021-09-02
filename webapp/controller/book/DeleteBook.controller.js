sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project001employee.controller.book.DeleteBook", {

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
        }

	});
});