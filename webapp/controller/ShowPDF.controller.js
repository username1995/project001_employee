sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project001employee.controller.ShowPDF", {
		     
        showPDF:  function (oEvent){
            var opdfViewer = new PDFViewer();
			this.getView().addDependent(opdfViewer);
			var sServiceURL = this.getView().getModel().sServiceUrl;
			var sSource = sServiceURL + "/PDFSET('')/$value";
			opdfViewer.setSource(sSource);
			opdfViewer.setTitle( "My PDF");
			opdfViewer.open();	
			
		}
	});
});