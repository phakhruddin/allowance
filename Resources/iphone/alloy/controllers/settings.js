function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addHandler(e) {
        console.log("JSON stringify addHandler(e): " + JSON.stringify(e));
    }
    function gotoAdvance(e) {
        console.log("settings.js:: JSON.stringify(e)" + JSON.stringify(e));
        var tabViewOneController = Alloy.createController("advance");
        tabViewOneController.openMainWindow($.settings_tab);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
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
    $.__views.settings_window = Ti.UI.createWindow({
        id: "settings_window",
        backgroundColor: "white",
        title: "settings"
    });
    $.__views.__alloyId58 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.ADD,
        id: "__alloyId58"
    });
    addHandler ? $.__views.__alloyId58.addEventListener("click", addHandler) : __defers["$.__views.__alloyId58!click!addHandler"] = true;
    $.__views.settings_window.rightNavButton = $.__views.__alloyId58;
    var __alloyId59 = [];
    $.__views.__alloyId60 = Ti.UI.createTableViewSection({
        headerTitle: "User Profile",
        id: "__alloyId60"
    });
    __alloyId59.push($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createTableViewSection({
        headerTitle: "Name",
        id: "__alloyId61"
    });
    __alloyId59.push($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "20",
            fontStyle: "bold"
        },
        id: "__alloyId62"
    });
    $.__views.__alloyId61.add($.__views.__alloyId62);
    $.__views.name_tf = Ti.UI.createTextField({
        width: Ti.UI.Fill,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "18"
        },
        id: "name_tf",
        left: "20",
        hintText: "Name: Zachary Smith"
    });
    $.__views.__alloyId62.add($.__views.name_tf);
    $.__views.__alloyId63 = Ti.UI.createTableViewSection({
        headerTitle: "GMail Account",
        id: "__alloyId63"
    });
    __alloyId59.push($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "20",
            fontStyle: "bold"
        },
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.emailid_tf = Ti.UI.createTextField({
        width: Ti.UI.Fill,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "18"
        },
        id: "emailid_tf",
        left: "20",
        hintText: "email: Zachary.Smith@gmail.com",
        value: ""
    });
    $.__views.__alloyId64.add($.__views.emailid_tf);
    $.__views.__alloyId65 = Ti.UI.createTableViewSection({
        headerTitle: "Utilities",
        id: "__alloyId65"
    });
    __alloyId59.push($.__views.__alloyId65);
    $.__views.skin_row = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "20",
            fontStyle: "bold"
        },
        id: "skin_row",
        backgroundColor: "transparent",
        opacity: "0",
        title: "Change Skin Color"
    });
    $.__views.__alloyId65.add($.__views.skin_row);
    $.__views.currency_row = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "20",
            fontStyle: "bold"
        },
        id: "currency_row",
        backgroundColor: "transparent",
        opacity: "0",
        title: "Currency"
    });
    $.__views.__alloyId65.add($.__views.currency_row);
    $.__views.offline_row = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "20",
            fontStyle: "bold"
        },
        id: "offline_row",
        opacity: "0",
        title: "Offline Mode"
    });
    $.__views.__alloyId65.add($.__views.offline_row);
    $.__views.offline_switch = Ti.UI.createSwitch({
        value: false,
        id: "offline_switch",
        right: "20",
        titleOff: "OFF",
        titleOn: "ON"
    });
    $.__views.offline_row.add($.__views.offline_switch);
    $.__views.offline_row = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "20",
            fontStyle: "bold"
        },
        id: "offline_row",
        opacity: "0",
        title: "Debug Mode"
    });
    $.__views.__alloyId65.add($.__views.offline_row);
    $.__views.offline_switch = Ti.UI.createSwitch({
        value: false,
        id: "offline_switch",
        right: "20",
        titleOff: "OFF",
        titleOn: "ON"
    });
    $.__views.offline_row.add($.__views.offline_switch);
    $.__views.support_row = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "20",
            fontStyle: "bold"
        },
        id: "support_row",
        opacity: "0",
        title: "Email Support"
    });
    $.__views.__alloyId65.add($.__views.support_row);
    $.__views.advance_row = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        color: "#5C5E61",
        font: {
            fontSize: "20",
            fontStyle: "bold"
        },
        id: "advance_row",
        backgroundColor: "transparent",
        opacity: "0",
        title: "Advance Option"
    });
    $.__views.__alloyId65.add($.__views.advance_row);
    gotoAdvance ? $.__views.advance_row.addEventListener("click", gotoAdvance) : __defers["$.__views.advance_row!click!gotoAdvance"] = true;
    $.__views.settings_table = Ti.UI.createTableView({
        data: __alloyId59,
        id: "settings_table",
        backgroundColor: "transparent",
        style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
    });
    $.__views.settings_window.add($.__views.settings_table);
    $.__views.settings_tab = Ti.UI.createTab({
        font: {
            fontSize: "56dp",
            fontWeight: "bold",
            textStyle: Ti.UI.TEXT_STYLE_HEADLINE
        },
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        window: $.__views.settings_window,
        id: "settings_tab",
        title: "Settings",
        icon: "gear"
    });
    $.__views.settings_tab && $.addTopLevelView($.__views.settings_tab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.settings_window);
        Ti.API.info("This is child widow settings.js" + JSON.stringify(_tab));
    };
    Alloy.Models.dummy;
    var someInfo = Alloy.Models.info;
    Titanium.App.Properties.setInt("balalert", 100);
    $.name_tf.addEventListener("blur", function(e) {
        var name = $.name_tf.value.trim();
        Ti.API.info("settings:: entered is: " + name);
        Titanium.App.Properties.setString("name", name);
        Ti.API.info("settings:: name obtained is: " + Titanium.App.Properties.getString("name"));
        console.log("settings:: JSON of textfield: " + JSON.stringify(e));
        someInfo.set({
            id: "1234",
            name: name
        });
        someInfo.fetch();
        console.log("main.js:: stringify dummy :" + JSON.stringify(someInfo));
    });
    $.emailid_tf.addEventListener("blur", function(e) {
        var emailid = $.emailid_tf.value.trim();
        Ti.API.info("settings:: entered is: " + emailid);
        Titanium.App.Properties.setString("emailid", emailid);
        Ti.API.info("settings:: emailid obtained is: " + Titanium.App.Properties.getString("emailid"));
        console.log("settings:: JSON of textfield: " + JSON.stringify(e));
    });
    __defers["$.__views.__alloyId58!click!addHandler"] && $.__views.__alloyId58.addEventListener("click", addHandler);
    __defers["$.__views.advance_row!click!gotoAdvance"] && $.__views.advance_row.addEventListener("click", gotoAdvance);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;