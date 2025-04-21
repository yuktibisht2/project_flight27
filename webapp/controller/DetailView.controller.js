sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], (Controller,Filter,FilterOperator,MessageBox) => {
    "use strict";
 
    return Controller.extend("app.capgepost27.controller.DetailView", {
        onInit() {
            let oRouter=this.getRouter()
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this)
        },
       
        onRouteMatched:function(oEvent){
            this.index=oEvent.getParameter("arguments").indexDetail
            let sPath="CustomerModel>/"+this.index //binding to the element to the view
            let oView=this.getView()
            oView.bindElement(sPath)
        },
 
        onEdit:function(){
            let oRouter=this.getRouter()
            oRouter.navTo("RouteUpdateView",{
                indexUpdate:this.index
 
            })
        }
 
   
    });
});
 