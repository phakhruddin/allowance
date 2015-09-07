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
    $.__views.__alloyId53 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.ADD,
        id: "__alloyId53"
    });
    addHandler ? $.addListener($.__views.__alloyId53, "click", addHandler) : __defers["$.__views.__alloyId53!click!addHandler"] = true;
    $.__views.settings_window.rightNavButton = $.__views.__alloyId53;
    var __alloyId54 = [];
    $.__views.__alloyId55 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "transparent",
        font: {
            fontSize: "48",
            fontStyle: "bold"
        },
        headerTitle: "Name",
        id: "__alloyId55"
    });
    __alloyId54.push($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createTextField({
        width: Ti.UI.Fill,
        left: "20",
        hintText: "Name: Zachary Smith",
        id: "__alloyId57"
    });
    $.__views.__alloyId56.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "transparent",
        font: {
            fontSize: "48",
            fontStyle: "bold"
        },
        headerTitle: "Email",
        id: "__alloyId58"
    });
    __alloyId54.push($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        id: "__alloyId59"
    });
    $.__views.__alloyId58.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createTextField({
        width: Ti.UI.Fill,
        left: "20",
        hintText: "email: Zachary.Smith@gmail.com",
        id: "__alloyId60"
    });
    $.__views.__alloyId59.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createTableViewSection({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        backgroundColor: "transparent",
        font: {
            fontSize: "48",
            fontStyle: "bold"
        },
        headerTitle: "appearance",
        id: "__alloyId61"
    });
    __alloyId54.push($.__views.__alloyId61);
    $.__views.settings_row = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        font: {
            fontSize: "12",
            fontStyle: "bold",
            color: "orange"
        },
        id: "settings_row",
        backgroundColor: "transparent",
        opacity: "0",
        title: "Change Skin Color"
    });
    $.__views.__alloyId61.add($.__views.settings_row);
    $.__views.settings_table = Ti.UI.createTableView({
        data: __alloyId54,
        id: "settings_table",
        backgroundColor: "transparent"
    });
    $.__views.settings_window.add($.__views.settings_table);
    $.__views.settings = Ti.UI.createTab({
        font: {
            fontSize: "50dp",
            fontWeight: "bold",
            textStyle: Ti.UI.TEXT_STYLE_HEADLINE
        },
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        window: $.__views.settings_window,
        title: "Settings",
        icon: "gear",
        id: "settings"
    });
    $.__views.settings && $.addTopLevelView($.__views.settings);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.settings_window);
        Ti.API.info("This is child widow settings.js" + JSON.stringify(_tab));
    };
    __defers["$.__views.__alloyId53!click!addHandler"] && $.addListener($.__views.__alloyId53, "click", addHandler);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;