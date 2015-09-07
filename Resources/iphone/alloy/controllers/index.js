function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    Alloy.Collections.instance("debitmodel");
    var __alloyId26 = [];
    $.__views.__alloyId27 = Alloy.createController("main", {
        id: "__alloyId27"
    });
    __alloyId26.push($.__views.__alloyId27.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId30 = Alloy.createController("credit", {
        id: "__alloyId30"
    });
    __alloyId26.push($.__views.__alloyId30.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId31 = Alloy.createController("debit", {
        id: "__alloyId31"
    });
    __alloyId26.push($.__views.__alloyId31.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId33 = Alloy.createController("settings", {
        id: "__alloyId33"
    });
    __alloyId26.push($.__views.__alloyId33.getViewEx({
        recurse: true
    }));
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId26,
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;