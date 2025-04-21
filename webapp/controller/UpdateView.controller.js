sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";
 
    return Controller.extend("app.capgepost27.controller.UpdateView", {
        onInit() {
            let oRouter=this.getRouter()
            oRouter.attachRoutePatternMatched(this._routeMatched, this)
        },
        _routeMatched:function(oEvent){
           let index=oEvent.getParameter("arguments").indexUpdate
           let sPath="CustomerModel>/"+index
           let oView=this.getView()
           oView.bindElement(sPath)
        },
        onUpdate:function(){
            //payload
            //objects of the input fields
            let oCarrid = this.getView().byId("CarridInput")
            let oConnid = this.getView().byId("ConnidInput")
            let oFldate = this.getView().byId("FldateInput")
            let oBookid = this.getView().byId("BookidInput")
            let oOdate = this.getView().byId("OrderDateInput")
 
            // Get values
            let sCarrid = oCarrid.getValue()
            let sConnid = oConnid.getValue()
            var sFldate = oFldate.getValue()
            let sBookid = oBookid.getValue()
            var sOdate = oOdate.getValue()
            sFldate=sFldate.replace(/-/g,"")
 
            // let vDate= new Date(sOD).getTime()
            // let fDate="\/Date("+ vDate +")\/"  
             let payload ={
               
                "OrderDate":sOdate
             }
 
             let oModel=this.getOwnerComponent().getModel()
 
             let entity=`/zyukti_m2Set(Carrid='${sCarrid}',Connid='${sConnid}',Fldate='${sFldate}',Bookid='${sBookid}')`
             let that=this;
             oModel.update(entity, payload,{
                success:function(resp){
                    MessageBox.success("record updated",{
                        onClose:function(){
                            let oRouter=this.getRouter()
                            oRouter.navTo("RouteCustomerView")
                         
                        }.bind(that)
                    })
                },
                error:function(error){
                    MessageBox.error("record updation failed")
                }
             })
        }
    });
});
 
 