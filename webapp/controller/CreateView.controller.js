sap.ui.define([
    "./BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function( Controller, MessageBox)  {
    "use strict";
 
    return Controller.extend("app.capgepost27.controller.CreateView", {
        onInit() {
        },

        
        onCreate: function () {
            // Payload
            var oCarrid = this.getView().byId("carridInput");
            var oConnid = this.getView().byId("connidInput");
            var oFldate = this.getView().byId("fldateInput");
            var oBookid = this.getView().byId("bookidInput");
            var oOdate = this.getView().byId("orderDateInput");
 
            // Get values
            let sCarrid = oCarrid.getValue();
            let sConnid = oConnid.getValue();
            let sFldate = oFldate.getValue();
            let sBookid = oBookid.getValue();
            let sOdate = oOdate.getValue();
 
            var odate = new Date(sOdate).getTime();
            let fdate = "\/Date(" + odate + ")\/";
 
            let payload = {
                "Carrid": sCarrid,
                "Connid": sConnid,
                "Fldate": sFldate,
                "Bookid": sBookid,
                "OrderDate": sOdate
            }
 
            let oModel = this.getOwnerComponent().getModel();
            let entity = "/zyukti_m2Set";
            let that=this
 
            oModel.create(entity, payload, {
                success: function () {
                    MessageBox.success("Record inserted successfully")
                },
                error: function (error) {
                    MessageBox.error("Error inserting record: " + error.message)
                }
            });
        }
    });
});
 
 