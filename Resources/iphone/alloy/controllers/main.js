function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function debitAction() {
        var url = "https://spreadsheets.google.com/feeds/list/11zxiijjENT69g_97R8nvLZvv_hfBC1tdsJrJ6skNBVE/od6/public/basic?hl=en_US&alt=json";
        var type = "debitmodel";
        Alloy.Globals.updateType(url, type);
    }
    function creditAction() {
        var sid = "1on0tH2DzdepwpCFWhpczS5qG3QO7BQJE-bGZCikzepg";
        var url = "https://spreadsheets.google.com/feeds/list/" + sid + "/od6/public/basic?hl=en_US&alt=json";
        var type = "creditmodel";
        Alloy.Globals.updateType(url, type);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("debitmodel");
    Alloy.Models.instance("dummy");
    $.__views.main_window = Ti.UI.createWindow({
        backgroundColor: "transparent",
        id: "main_window"
    });
    var __alloyId39 = [];
    $.__views.__alloyId40 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "transparent",
        font: {
            fontSize: "48",
            fontStyle: "bold"
        },
        headerTitle: "Name",
        id: "__alloyId40"
    });
    __alloyId39.push($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "100",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        color: "white",
        Title: "Identification",
        id: "__alloyId41"
    });
    $.__views.__alloyId40.add($.__views.__alloyId41);
    $.__views.date = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal"
        },
        id: "date",
        color: "#404040",
        top: "10",
        text: " Sep 7, 2015"
    });
    $.__views.__alloyId41.add($.__views.date);
    $.__views.header = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: "30",
            fontStyle: "bold"
        },
        color: "#404040",
        id: "header",
        top: "25",
        text: "Zachary Smith"
    });
    $.__views.__alloyId41.add($.__views.header);
    $.__views.studentid = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal"
        },
        id: "studentid",
        color: "gray",
        top: "65",
        text: "123456789"
    });
    $.__views.__alloyId41.add($.__views.studentid);
    $.__views.__alloyId42 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "transparent",
        font: {
            fontSize: "48",
            fontStyle: "bold"
        },
        headerTitle: "Account Status",
        id: "__alloyId42"
    });
    __alloyId39.push($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "110",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        color: "white",
        Title: "Identification",
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.accountnumber = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal"
        },
        id: "accountnumber",
        color: "#404040",
        top: "10",
        text: "Account #: A1232789"
    });
    $.__views.__alloyId43.add($.__views.accountnumber);
    $.__views.baltext = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal"
        },
        id: "baltext",
        color: "#404040",
        top: "32",
        text: "BAL"
    });
    $.__views.__alloyId43.add($.__views.baltext);
    $.__views.balance = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: "48",
            fontStyle: "bold"
        },
        id: "balance",
        color: "green",
        top: "46"
    });
    $.__views.__alloyId43.add($.__views.balance);
    $.__views.__alloyId44 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "transparent",
        font: {
            fontSize: "48",
            fontStyle: "bold"
        },
        headerTitle: "Last Credit",
        id: "__alloyId44"
    });
    __alloyId39.push($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "64",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        color: "white",
        Title: "lastcredit_row",
        id: "__alloyId45"
    });
    $.__views.__alloyId44.add($.__views.__alloyId45);
    creditAction ? $.addListener($.__views.__alloyId45, "click", creditAction) : __defers["$.__views.__alloyId45!click!creditAction"] = true;
    $.__views.creditamount = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: "24"
        },
        id: "creditamount",
        color: "#333",
        top: "5"
    });
    $.__views.__alloyId45.add($.__views.creditamount);
    $.__views.lastcredit = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: "12"
        },
        id: "lastcredit",
        color: "gray",
        top: "33"
    });
    $.__views.__alloyId45.add($.__views.lastcredit);
    $.__views.lastcredit_button = Ti.UI.createButton({
        id: "lastcredit_button",
        right: "60",
        image: "right242.png",
        width: "30",
        height: "30"
    });
    $.__views.__alloyId45.add($.__views.lastcredit_button);
    $.__views.__alloyId46 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "transparent",
        font: {
            fontSize: "48",
            fontStyle: "bold"
        },
        headerTitle: "Last Debit",
        id: "__alloyId46"
    });
    __alloyId39.push($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "64",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        color: "white",
        Title: "lastdebit_row",
        id: "__alloyId47"
    });
    $.__views.__alloyId46.add($.__views.__alloyId47);
    debitAction ? $.addListener($.__views.__alloyId47, "click", debitAction) : __defers["$.__views.__alloyId47!click!debitAction"] = true;
    $.__views.debitamount = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: "24"
        },
        id: "debitamount",
        color: "#333",
        top: "5"
    });
    $.__views.__alloyId47.add($.__views.debitamount);
    $.__views.lastdebit = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: "12"
        },
        id: "lastdebit",
        color: "gray",
        top: "33"
    });
    $.__views.__alloyId47.add($.__views.lastdebit);
    $.__views.lastdebit_button = Ti.UI.createButton({
        id: "lastdebit_button",
        right: "60",
        image: "right242.png",
        width: "30",
        height: "30"
    });
    $.__views.__alloyId47.add($.__views.lastdebit_button);
    $.__views.transaction_view = Ti.UI.createView({
        id: "transaction_view",
        height: "250",
        width: Ti.UI.Fill
    });
    $.__views.__alloyId50 = Alloy.createController("transaction", {
        id: "__alloyId50",
        __parentSymbol: $.__views.transaction_view
    });
    $.__views.__alloyId50.setParent($.__views.transaction_view);
    $.__views.__alloyId48 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "transparent",
        font: {
            fontSize: "48",
            fontStyle: "bold"
        },
        footerView: $.__views.transaction_view,
        headerTitle: "Last transactions",
        id: "__alloyId48"
    });
    __alloyId39.push($.__views.__alloyId48);
    $.__views.__alloyId38 = Ti.UI.createTableView({
        data: __alloyId39,
        backgroundColor: "transparent",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "__alloyId38"
    });
    $.__views.main_window.add($.__views.__alloyId38);
    $.__views.main_tab = Ti.UI.createTab({
        font: {
            fontSize: "50dp",
            fontWeight: "bold",
            textStyle: Ti.UI.TEXT_STYLE_HEADLINE
        },
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        window: $.__views.main_window,
        id: "main_tab",
        title: "Home",
        icon: "home.png"
    });
    $.__views.main_tab && $.addTopLevelView($.__views.main_tab);
    var __alloyId51 = function() {
        $.balance.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["bal"] : _.template("<%=dummy.bal%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
        $.creditamount.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["dcreditamount"] : _.template("<%=dummy.dcreditamount%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
        $.lastcredit.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lastcredit"] : _.template("last credit on: <%=dummy.lastcredit%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
        $.debitamount.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["debitamount"] : _.template("<%=dummy.debitamount%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
        $.lastdebit.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lastdebit"] : _.template("Last Debit on: <%=dummy.lastdebit%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
    };
    Alloy.Models.dummy.on("fetch change destroy", __alloyId51);
    exports.destroy = function() {
        Alloy.Models.dummy.off("fetch change destroy", __alloyId51);
    };
    _.extend($, $.__views);
    var bal = 0;
    var creditamount = 0;
    var lastcredit = 0;
    var totalspent = 0;
    var totalcredit = 0;
    var someDummy = Alloy.Models.dummy;
    $.lastcredit_button.addEventListener("click", function(e) {
        console.log("main.js:: JSON.stringify(e)" + JSON.stringify(e));
        var tabViewOneController = Alloy.createController("credit");
        tabViewOneController.openMainWindow($.main_tab);
    });
    $.lastdebit_button.addEventListener("click", function(e) {
        console.log("main.js:: JSON.stringify(e)" + JSON.stringify(e));
        var tabViewOneController = Alloy.createController("debit");
        tabViewOneController.openMainWindow($.main_tab);
    });
    var creditmodel = Alloy.Collections.instance("creditmodel");
    creditmodel.fetch();
    var content = creditmodel.toJSON();
    if (content.length > 0) {
        var maxrec = content.length - 1;
        var lastcredit = content[maxrec].col1;
        var creditamount = content[maxrec].col3;
        var lastcredit = content[maxrec].col1;
    } else {
        var creditamount = 0;
        var lastcredit = 0/0;
    }
    console.log("main.js: lastcredit: " + lastcredit + ", creditamount: " + creditamount);
    var debitmodel = Alloy.Collections.instance("debitmodel");
    debitmodel.fetch();
    var content = debitmodel.toJSON();
    if (content.length > 0) {
        var maxrec = content.length - 1;
        var lastdebit = content[maxrec].col1;
        var debitamount = content[maxrec].col4;
        var lastdebit = content[maxrec].col1;
    } else {
        var debitamount = 0;
        var lastdebit = 0/0;
    }
    console.log("main.js: lastdebit: " + lastdebit + ", debitamount: " + debitamount);
    var totalcredit = Titanium.App.Properties.getInt("totalcredit", 0);
    var totalspent = Titanium.App.Properties.getInt("totalspent", 0);
    console.log("main.js: totalcredit: " + totalcredit + ", totalspent: " + totalspent);
    bal = Titanium.App.Properties.getInt("bal") ? "NONE" : parseFloat(totalcredit) - parseFloat(totalspent);
    someDummy.set({
        id: "1234",
        bal: bal,
        dcreditamount: creditamount,
        lastcredit: lastcredit,
        lastdebit: lastdebit,
        debitamount: debitamount,
        totalspent: totalspent,
        totalcredit: totalcredit
    });
    someDummy.fetch();
    console.log("main.js:: stringify dummy :" + JSON.stringify(someDummy));
    __defers["$.__views.__alloyId45!click!creditAction"] && $.addListener($.__views.__alloyId45, "click", creditAction);
    __defers["$.__views.__alloyId47!click!debitAction"] && $.addListener($.__views.__alloyId47, "click", debitAction);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;