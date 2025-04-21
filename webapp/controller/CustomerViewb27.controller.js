sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], function(BaseController,Filter,FilterOperator,MessageBox) {
    "use strict";
 
    return BaseController.extend("app.capgepost27.controller.CustomerViewb27", {
        onInit() {
 
            let oModel = this.getModel();
            let entity = "/zyukti_m2Set";
           
            oModel.read(entity, {
                success: (odata, resp) => {
                    // let oModelJs = new sap.ui.model.json.JSONModel(odata.results);
                    // this.getView().setModel(oModelJs, "CustomerModel");
                    let jModel =this.getOwnerComponent().getModel("CustomerModel");
                    jModel.setData(odata.results)
                },
                error: (error) => {
                    console.error("Error reading data: ", error);
                    // Additional error handling logic
                }
            });
           
        },
        onRowSelection:function(oEvent){

            let oItem=oEvent.getParameter("listItem")
            let oContext=oItem.getBindingContextPath("CustomerModel")
            let aItems=oContext.split("/") //array items
            let index=aItems[aItems.length-1]
            let oRouter=this.getRouter()
            oRouter.navTo("RouteDetailView",{
                indexDetail:index
            })
        },
        
        onDelete:function(oEvent){
            let oContext = oEvent.getSource().getBindingContext("CustomerModel").getObject();
            MessageBox.warning("Are you sure about deleting this entry?",{
                onClose:(choice)=>{
                    if(choice==="OK"){
                        this._onDeleteCall(oContext)
                    }
                }
            })
        },
        _onDeleteCall:function(param){
            let key1 =param.Carrid;
            let key2 =param.Connid;
            let key3 =param.Bookid;
            let key4 =param.Fldate.replace(/-/g,'');
 
            let oModel = this.getOwnerComponent().getModel();
            let entity = "/zyukti_m2Set(Carrid='"+key1+"',Connid='"+key2+"',Bookid='"+key3+"',Fldate='"+key4+"')";
            oModel.remove(entity,{
                success:(resp)=>{
                    MessageBox.success("Entry deleted successfully!");
                },
                error:(error)=>{
                    MessageBox.error("Deletion failed");
                }
            })
        },
 
        onFilter:function(){
            let aFilter=[]
            let sAir=this.getView().byId("idAir").getValue()
            let sConn=this.getView().byId("idConn").getValue()
            let sBook=this.getView().byId("onBook").getValue()
 
            if(sAir){
              let filterName=new Filter("Carrid", FilterOperator.Contains,sAir)                    
              aFilter.push(filterName)
            }
            if(sConn){
             let filterName=new Filter("Connid", FilterOperator.Contains,sConn)                    
             aFilter.push(filterName)
            }
            if(sBook){
                let filterName=new Filter("Bookid", FilterOperator.Contains,sBook)                    
                aFilter.push(filterName)
               }
         
            let oTable=this.getView().byId("table")
            let bindingInfo=oTable.getBinding("items")
            if (bindingInfo) {
                bindingInfo.filter(aFilter);
            }
        },
        onCreate:function(){
            var oRouter=this.getRouter()
            oRouter.navTo("RouteCreateView")
        }
    });
});