sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project001employee.controller.added_functionality.Filter", {
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
		}
	});
});