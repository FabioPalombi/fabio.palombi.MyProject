sap.ui.define(
    ["./BaseController", "sap/m/MessageBox", "sap/ui/model/json/JSONModel"],
    function (BaseController) {
      "use strict";
  
      return BaseController.extend("fabio.palombi.MyProject.controller.Cart", {
        onInit: function () {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.getRoute("cart").attachPatternMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function(oEvent){
          const productID = oEvent.getParameter("arguments").productID; // Get id parameter from routing
        //this.setData(id); // Send id parameter to setData() fn
        alert(productID);
        }
      });
    }
  );