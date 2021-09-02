sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project001employee.controller.ExportExcel", {

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
		}

	});
});