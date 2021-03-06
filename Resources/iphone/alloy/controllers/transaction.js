function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function debitDetailAddRow(date, dateadded, category, amount) {
        console.log("transaction.js::debitDetailAddRow: date: " + date + "  dateadded: " + dateadded);
        var debitrow = Ti.UI.createTableViewRow({
            backgroundColor: "white",
            opacity: "0",
            color: "transparent",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        var datelabel = Ti.UI.createLabel({
            color: "orange",
            font: {
                fontSize: 10
            },
            right: "40",
            textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
            top: "10",
            text: dateadded
        });
        var datespend = Ti.UI.createLabel({
            color: "#0F84DE",
            font: {
                fontSize: 12
            },
            left: "20",
            textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
            top: "35",
            text: date.toLocaleString()
        });
        var categorylabel = Ti.UI.createLabel({
            color: "#333",
            font: {
                fontSize: 24
            },
            left: "20",
            textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
            top: "50",
            text: category
        });
        var amountlabel = Ti.UI.createLabel({
            color: "#333",
            font: {
                fontSize: 24
            },
            right: "50",
            textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
            top: "50",
            text: amount
        });
        var blueline = Ti.UI.createImageView({
            left: "20",
            textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
            top: "30",
            width: "85%",
            height: "3",
            image: "blueline.png"
        });
        var innerview = Ti.UI.createView({
            width: "30%",
            height: "Ti.UI.Size",
            left: "60%",
            top: "40",
            backgroundColor: "white",
            borderRadius: "10",
            borderWidth: "0.1",
            borderColor: "white"
        });
        debitrow.add(datelabel);
        debitrow.add(datespend);
        debitrow.add(categorylabel);
        debitrow.add(amountlabel);
        debitrow.add(blueline);
        debitrow.add(innerview);
        debitrow.metadata = dateadded;
        var debittable = Ti.UI.createTableView({
            backgroundColor: "white",
            separatorStyle: "Titanium.UI.iPhone.TableViewSeparatorStyle.NONE"
        });
        debittable.add(debitrow);
        $.transaction_table.appendRow(debitrow);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "transaction";
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
    $.__views.transaction_table = Ti.UI.createTableView({
        id: "transaction_table"
    });
    $.__views.transaction_table && $.addTopLevelView($.__views.transaction_table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    console.log("transaction.js");
    var content = Alloy.Globals.fetchingData("debitmodel");
    console.log("debit.js::JSON stringify content: " + JSON.stringify(content));
    for (i = 0; i < content.length; i++) debitDetailAddRow(content[i].col1, content[i].col2, content[i].col3, content[i].col4);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;