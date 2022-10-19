sap.ui.define(
  [
    "./BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/core/Fragment",
  ],
  function (BaseController, MessageBox, JSONModel, Fragment) {
    "use strict";

    return BaseController.extend("fabio.palombi.MyProject.controller.Main", {
      onInit: function () {
        this.oModel = new JSONModel();
        this.oModel.setData({
          badgeCurrent: 1,
        });
        this.getView().setModel(this.oModel);

        // create internal vars with instances of controls

        this.oButton = this.byId("BadgedButton");
        //this.oCurrent = this.byId("CurrentValue");
        sap.ui.getCore().itemsInCart = 0;
      },

      onOpenDialog: function () {
        // create dialog lazily
        if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "fabio.palombi.MyProject.view.ChooseQuantity",
          });
        }
        this.pDialog.then(function (oDialog) {
          oDialog.open();
        });
      },

      onCloseDialog: function () {
        var iCurrent = this.byId("CurrentValue").getValue(),
          oButtonBadgeCustomData = this.oButton.getBadgeCustomData();

        if (!oButtonBadgeCustomData) {
          return;
        }

        if (sap.ui.getCore().itemsInCart === 0) {
          sap.ui.getCore().itemsInCart = iCurrent;
        } else if (sap.ui.getCore().itemsInCart > 0) {
          sap.ui.getCore().itemsInCart += iCurrent;
        }
        oButtonBadgeCustomData.setValue(sap.ui.getCore().itemsInCart);
        this.byId("CurrentValue").setValue(1);
        this.byId("chooseQuantity").close();
      },

      addToCart: function () {
        var oSelectedItems = this.byId("DialogList").getSelectedItems().length;
        if (oSelectedItems == 0) {
          MessageBox.show("No selected items");
          return;
        }

        var oButtonBadgeCustomData = this.oButton.getBadgeCustomData(),
          increasedValue = (this.itemsInCart += oSelectedItems),
          sValue = increasedValue.toString();

        if (!oButtonBadgeCustomData) {
          return;
        }

        //this.byId("DialogList").getSelectedItems().length
        this.byId("DialogList").getSelectedItems();

        oButtonBadgeCustomData.setValue(sValue);
      },

      onOpenCart: function () {
        if (this.itemsInCart == 0) {
          MessageBox.show("Empty cart");
          return;
        }

        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("cart");
      },

      onDetail: function (oEvent) {
        const productID = oEvent
          .getSource()
          .getBindingContext("product")
          .getObject().ID;

        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("cart", {
          //productID: productID,
        });
      },

      sayHello: function () {
        MessageBox.show("Hello World!");
      },
    });
  }
);
