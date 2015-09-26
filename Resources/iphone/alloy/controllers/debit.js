function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function updateDummy(bal, totalspent, amount, lastdebit, color) {
        var someDummy = Alloy.Models.dummy;
        someDummy.set({
            id: "1234",
            bal: bal,
            totalspent: totalspent,
            debitamount: amount,
            lastdebit: lastdebit,
            color: color
        });
        someDummy.fetch();
        console.log("debit.js :: stringify dummy :" + JSON.stringify(someDummy));
    }
    function addHandler(e) {
        console.log("JSON stringify addHandler(e): " + JSON.stringify(e));
    }
    function setDate(e) {
        console.log("JSON stringify setDate(e): " + JSON.stringify(e));
        var date = e.value;
        $.notes_textarea.datedebit = date;
        var dateFormat = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + Alloy.Globals.formatAMPM(date);
        $.dateLabel.text = dateFormat;
    }
    function debitDetailAddRow(date, dateadded, category, amount) {
        console.log("debit.js::debitDetailAddRow: date: " + date + "  dateadded: " + dateadded + " +dateadded: " + dateadded);
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
        $.debit_table.appendRow(debitrow);
    }
    function displayRow() {
        var totalspent = 0;
        for (i = 0; i < content.length; i++) {
            debitDetailAddRow(content[i].col1, content[i].col2, content[i].col3, content[i].col4);
            var totalspent = parseFloat(content[i].col4) + parseFloat(totalspent);
            i == content.length - 1 && ($.debit_window.lastdebit = content[i].col1);
        }
        return totalspent;
    }
    function notesAreaFocus(e) {
        console.log("JSON stringify notes_textarea(e): " + JSON.stringify(e));
        $.notes_textarea.borderColor = "#bbb";
    }
    function Done(e) {
        console.log("JSON stringify Done(e): " + JSON.stringify(e));
        $.notes_textarea.blur();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "debit";
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
    $.__views.debit_window = Ti.UI.createWindow({
        id: "debit_window",
        backgroundColor: "white",
        title: "Debit"
    });
    $.__views.__alloyId16 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.ADD,
        id: "__alloyId16"
    });
    addHandler ? $.__views.__alloyId16.addEventListener("click", addHandler) : __defers["$.__views.__alloyId16!click!addHandler"] = true;
    $.__views.debit_window.rightNavButton = $.__views.__alloyId16;
    var __alloyId17 = [];
    $.__views.input_view = Ti.UI.createView({
        id: "input_view",
        height: "300",
        backgroundColor: "white"
    });
    $.__views.__alloyId20 = Ti.UI.createImageView({
        top: "25",
        left: "20",
        image: "blueline.png",
        id: "__alloyId20"
    });
    $.__views.input_view.add($.__views.__alloyId20);
    $.__views.dateLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal"
        },
        id: "dateLabel",
        color: "red",
        top: "30",
        left: "20",
        text: "Date"
    });
    $.__views.input_view.add($.__views.dateLabel);
    $.__views.catLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: 24
        },
        id: "catLabel",
        top: "55",
        left: "20",
        text: "Select Category"
    });
    $.__views.input_view.add($.__views.catLabel);
    $.__views.costLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal"
        },
        id: "costLabel",
        color: "blue",
        top: "55",
        left: "70%",
        text: "Cost"
    });
    $.__views.input_view.add($.__views.costLabel);
    var __alloyId23 = [];
    $.__views.donebutton = Ti.UI.createButton({
        id: "donebutton",
        title: "DONE"
    });
    __alloyId23.push($.__views.donebutton);
    Done ? $.__views.donebutton.addEventListener("click", Done) : __defers["$.__views.donebutton!click!Done"] = true;
    $.__views.__alloyId21 = Ti.UI.iOS.createToolbar({
        items: __alloyId23,
        id: "__alloyId21"
    });
    $.__views.notes_textarea = Ti.UI.createTextArea({
        font: {
            left: 20,
            fontSize: 24
        },
        keyboardToolbar: $.__views.__alloyId21,
        id: "notes_textarea",
        width: "100",
        left: "65%",
        height: "44",
        top: "45",
        borderWidth: "1",
        borderColor: "red",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        value: " ",
        hintText: "100",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    $.__views.input_view.add($.__views.notes_textarea);
    notesAreaFocus ? $.__views.notes_textarea.addEventListener("focus", notesAreaFocus) : __defers["$.__views.notes_textarea!focus!notesAreaFocus"] = true;
    $.__views.__alloyId21 = Ti.UI.iOS.createToolbar({
        keyboardToolbar: $.__views.__alloyId21,
        id: "notes_textarea",
        width: "100",
        left: "65%",
        height: "44",
        top: "45",
        borderWidth: "1",
        borderColor: "red",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        value: " ",
        hintText: "100",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    $.__views.date_picker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "date_picker",
        top: "90",
        type: Titanium.UI.PICKER_TYPE_DATE_AND_TIME
    });
    $.__views.input_view.add($.__views.date_picker);
    setDate ? $.__views.date_picker.addEventListener("change", setDate) : __defers["$.__views.date_picker!change!setDate"] = true;
    $.__views.__alloyId18 = Ti.UI.createTableViewSection({
        footerView: $.__views.input_view,
        headerTitle: "Please enter paid amount:",
        id: "__alloyId18"
    });
    __alloyId17.push($.__views.__alloyId18);
    $.__views.debit_table = Ti.UI.createTableView({
        separatorStyle: "Titanium.UI.iPhone.TableViewSeparatorStyle.NONE",
        data: __alloyId17,
        id: "debit_table",
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        editable: "true",
        moveable: "true"
    });
    $.__views.debit_window.add($.__views.debit_table);
    $.__views.debit_tab = Ti.UI.createTab({
        window: $.__views.debit_window,
        id: "debit_tab",
        title: "Debit",
        icon: "debit.png"
    });
    $.__views.debit_tab && $.addTopLevelView($.__views.debit_tab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.debit_window);
        Ti.API.info("This is child widow debit.js" + JSON.stringify(_tab));
    };
    var bal = Titanium.App.Properties.getInt("bal", 0);
    var totalspent = Titanium.App.Properties.getInt("totalspent", 0);
    var totalcredit = Titanium.App.Properties.getInt("totalcredit", 0);
    Titanium.App.Properties.getInt("balalert", 100);
    $.debit_window.data = {
        totalspent: totalspent,
        totalcredit: totalcredit,
        debitamount: debitamount,
        bal: bal,
        lastdebit: lastdebit
    };
    $.debit_tab.addEventListener("focus", function(e) {
        var content = Alloy.Globals.fetchingData("debitmodel");
        console.log("debit.js: tab focus: JSON.stringify(e)" + JSON.stringify(e));
        console.log("debit.js::JSON stringify content after tab is focus: " + JSON.stringify(content));
        var totalspent = displayRow();
        Titanium.App.Properties.setInt("totalspent", totalspent);
        console.log("debit.js: tab focus: totalspent" + totalspent + " Titanium.App.Properties.getInt(totalspent): " + Titanium.App.Properties.getInt("totalspent"));
    });
    var content = Alloy.Globals.fetchingData("debitmodel");
    console.log("debit.js::JSON stringify content: " + JSON.stringify(content));
    if (content.length > 1) {
        var lastdebit = content[content.length - 1].col1;
        var debitamount = content[content.length - 1].col4;
    } else {
        var lastdebit = 0/0;
        var debitamount = 0;
    }
    console.log("debit.js::debitamount: " + debitamount);
    $.debit_window.data = {
        totalspent: totalspent,
        totalcredit: totalcredit,
        debitamount: debitamount,
        bal: bal,
        lastdebit: lastdebit
    };
    updateDummy(bal, totalspent, debitamount, lastdebit);
    $.catLabel.addEventListener("click", function(e) {
        console.log("JSON stringify catLabel(e): " + JSON.stringify(e));
        $.input_view.add(picker);
        $.input_view.remove($.date_picker);
    });
    var totalspent = displayRow();
    $.notes_textarea.totalspent = totalspent;
    $.debit_window.data = {
        totalspent: totalspent,
        totalcredit: totalcredit,
        debitamount: debitamount,
        bal: bal,
        lastdebit: lastdebit
    };
    Titanium.App.Properties.setInt("totalspent", totalspent);
    console.log("debit.js: after row display totalspent: " + totalspent);
    var picker = Ti.UI.createPicker({
        top: 90
    });
    var data = [];
    var cat = [];
    var cat = [ "Book", "Grocery", "Transport", "Fee", "Stationary", "Electronics", "Travel" ];
    for (i = 0; i < cat.length; i++) {
        data = Ti.UI.createPickerRow({
            title: cat[i],
            font: {
                fontSize: 24
            }
        });
        picker.add(data);
    }
    picker.selectionIndicator = true;
    $.catLabel.color = "red";
    picker.addEventListener("change", function(e) {
        console.log("JSON stringify picker(e): " + JSON.stringify(e));
        var catselected = e.row.title;
        $.catLabel.text = catselected;
        $.notes_textarea.category = catselected;
        $.catLabel.color = "blue";
    });
    $.input_view.remove($.date_picker);
    $.input_view.add(picker);
    $.costLabel.addEventListener("click", function(e) {
        console.log("JSON stringify costLabel(e): " + JSON.stringify(e));
        $.input_view.remove(picker);
        $.costTF.show();
    });
    $.dateLabel.addEventListener("click", function(e) {
        console.log("JSON stringify dateLabel(e): " + JSON.stringify(e));
        $.input_view.add($.date_picker);
        $.dateLabel.color = "blue";
    });
    $.notes_textarea.addEventListener("blur", function(e) {
        console.log("JSON stringify notes_textarea blur(e): " + JSON.stringify(e));
        if (e.source.datedebit) {
            var date = e.source.datedebit;
            var dateMDY = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        } else alert("Please select date");
        e.source.category ? catselected = e.source.category : alert("Please select category");
        e.value ? amount = e.value.trim() : alert("Please enter value");
        if (dateMDY && amount) {
            debitDetailAddRow(dateMDY, dateMDY, catselected, amount);
            Alloy.Globals.updatemodelTable("debitmodel", dateMDY, dateMDY, catselected, amount, "0", "0", "0", "0", "0");
            var totalspent = parseFloat(amount) + parseFloat(e.source.totalspent);
            console.log("debit.js: e.source.totalspent:  " + e.source.totalspent + " totalspent: " + totalspent + " amount: " + amount);
            Titanium.App.Properties.setInt("totalspent", totalspent);
            var bal = parseFloat(Titanium.App.Properties.getInt("bal")) - parseFloat(amount);
            var color = Alloy.Globals.setBalColor(bal);
            Titanium.App.Properties.setInt("bal", bal);
            console.log("debit.js:: notes_textarea totalspent: " + totalspent);
            $.debit_window.data = {
                totalspent: totalspent,
                totalcredit: totalcredit,
                debitamount: amount,
                bal: bal,
                lastdebit: lastdebit,
                color: color
            };
            $.notes_textarea.totalspent = totalspent;
            console.log("updateDummy(" + totalspent + "," + amount + "," + dateMDY + ")");
            updateDummy(bal, totalspent, amount, dateMDY, color);
        }
    });
    $.debit_window.addEventListener("close", function(e) {
        console.log("debit.js: close window: JSON.stringify(e)" + JSON.stringify(e));
        var bal = parseFloat(e.source.data.totalcredit) - parseFloat(e.source.data.totalspent);
        var color = Alloy.Globals.setBalColor(bal);
        Titanium.App.Properties.setInt("bal", bal);
        updateDummy(bal, e.source.data.totalspent, e.source.data.debitamount, e.source.data.lastdebit, color);
    });
    $.debit_tab.addEventListener("blur", function(e) {
        console.log("debit.js: tab blur: JSON.stringify(e)" + JSON.stringify(e));
    });
    __defers["$.__views.__alloyId16!click!addHandler"] && $.__views.__alloyId16.addEventListener("click", addHandler);
    __defers["$.__views.donebutton!click!Done"] && $.__views.donebutton.addEventListener("click", Done);
    __defers["$.__views.notes_textarea!focus!notesAreaFocus"] && $.__views.notes_textarea.addEventListener("focus", notesAreaFocus);
    __defers["$.__views.date_picker!change!setDate"] && $.__views.date_picker.addEventListener("change", setDate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;