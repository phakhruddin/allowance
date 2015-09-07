function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function fetchingData(type) {
        eval("var " + type + " = Alloy.Collections.instance(type);");
        eval(type + ".fetch();");
        eval("var content = " + type + ".toJSON();");
        return content;
    }
    function displayRow() {
        var totalcredit = 0;
        for (i = 0; i < content.length; i++) {
            creditDetailAddRow(content[i].col1, content[i].col2, content[i].col3, "$" + content[i].col4);
            var totalcredit = parseFloat(content[i].col3) + parseFloat(totalcredit);
            Titanium.App.Properties.setInt("totalcredit", totalcredit);
            $.notes_textarea.data = {
                totalspent: totalspent,
                totalcredit: totalcredit,
                creditamount: creditamount,
                bal: bal,
                lastcredit: lastcredit
            };
            $.credit_window.data = {
                totalspent: totalspent,
                totalcredit: totalcredit,
                creditamount: creditamount,
                bal: bal,
                lastcredit: lastcredit
            };
        }
        return totalcredit;
    }
    function updateDummy(bal, totalcredit, creditamount, lastcredit) {
        var someDummy = Alloy.Models.dummy;
        someDummy.set({
            id: "1234",
            bal: bal,
            totalcredit: totalcredit,
            dcreditamount: creditamount,
            lastcredit: lastcredit
        });
        someDummy.fetch();
        console.log("credit.js ::updateDummy:: stringify dummy :" + JSON.stringify(someDummy));
    }
    function addHandler(e) {
        console.log("JSON stringify addHandler(e): " + JSON.stringify(e));
    }
    function setDate(e) {
        console.log("JSON stringify setDate(e): " + JSON.stringify(e));
        var date = e.value;
        $.dateLabel.text = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        $.timeLabel.text = Alloy.Globals.formatAMPM(date);
        console.log("credit.js:: put date to notest_textare: " + date);
        $.notes_textarea.datepaid = date;
    }
    function creditDetailAddRow(date, dateadded, creditamount) {
        console.log("credit.js::creditDetailAddRow: date: " + date + "  dateadded: " + dateadded + " creditamount: " + creditamount);
        var creditrow = Ti.UI.createTableViewRow({
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
        var datecredit = Ti.UI.createLabel({
            color: "#0F84DE",
            font: {
                fontSize: 24
            },
            left: "30",
            textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
            top: "50",
            text: date.toLocaleString()
        });
        var amountlabel = Ti.UI.createLabel({
            color: "#333",
            font: {
                fontSize: 24
            },
            right: "100",
            textAlign: "Ti.UI.TEXT_ALIGNMENT_LEFT",
            top: "50",
            text: "$" + creditamount
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
        creditrow.add(datelabel);
        creditrow.add(datecredit);
        creditrow.add(amountlabel);
        creditrow.add(blueline);
        creditrow.add(innerview);
        creditrow.metadata = dateadded;
        $.credit_table.appendRow(creditrow);
    }
    function notesAreaFocus(e) {
        console.log("JSON stringify notes_textarea(e): " + JSON.stringify(e));
        $.notes_textarea.borderColor = "#bbb";
    }
    function blurIT(e) {
        console.log("JSON stringify blurIT(e): " + JSON.stringify(e));
        $.notes_textarea.blur();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "credit";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        var $model = __processArg(arguments[0], "$model");
        var __itemTemplate = __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Models.instance("dummy");
    Alloy.Collections.instance("creditmodel");
    $.__views.credit_window = Ti.UI.createWindow({
        id: "credit_window",
        backgroundColor: "white",
        title: "credit"
    });
    $.__views.__alloyId5 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.ADD,
        id: "__alloyId5"
    });
    addHandler ? $.addListener($.__views.__alloyId5, "click", addHandler) : __defers["$.__views.__alloyId5!click!addHandler"] = true;
    $.__views.credit_window.rightNavButton = $.__views.__alloyId5;
    var __alloyId6 = [];
    $.__views.input_view = Ti.UI.createView({
        id: "input_view",
        height: "300",
        backgroundColor: "white"
    });
    $.__views.__alloyId9 = Ti.UI.createImageView({
        top: "25",
        left: "20",
        image: "blueline.png",
        id: "__alloyId9"
    });
    $.__views.input_view.add($.__views.__alloyId9);
    $.__views.dateLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: 24
        },
        id: "dateLabel",
        color: "red",
        top: "58",
        left: "30",
        text: "Date"
    });
    $.__views.input_view.add($.__views.dateLabel);
    $.__views.timeLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: 14
        },
        id: "timeLabel",
        color: "#0066CC",
        top: "66",
        left: "140",
        text: ""
    });
    $.__views.input_view.add($.__views.timeLabel);
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
    var __alloyId12 = [];
    $.__views.donebutton = Ti.UI.createButton({
        id: "donebutton",
        title: "DONE"
    });
    __alloyId12.push($.__views.donebutton);
    blurIT ? $.addListener($.__views.donebutton, "click", blurIT) : __defers["$.__views.donebutton!click!blurIT"] = true;
    $.__views.__alloyId10 = Ti.UI.iOS.createToolbar({
        items: __alloyId12,
        id: "__alloyId10"
    });
    $.__views.notes_textarea = Ti.UI.createTextArea({
        font: {
            left: 20,
            fontSize: 24
        },
        keyboardToolbar: $.__views.__alloyId10,
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
    notesAreaFocus ? $.addListener($.__views.notes_textarea, "focus", notesAreaFocus) : __defers["$.__views.notes_textarea!focus!notesAreaFocus"] = true;
    $.__views.__alloyId10 = Ti.UI.iOS.createToolbar({
        keyboardToolbar: $.__views.__alloyId10,
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
    setDate ? $.addListener($.__views.date_picker, "change", setDate) : __defers["$.__views.date_picker!change!setDate"] = true;
    $.__views.__alloyId7 = Ti.UI.createTableViewSection({
        footerView: $.__views.input_view,
        headerTitle: "Please enter credit amount:",
        id: "__alloyId7"
    });
    __alloyId6.push($.__views.__alloyId7);
    $.__views.credit_table = Ti.UI.createTableView({
        data: __alloyId6,
        id: "credit_table",
        height: Ti.UI.FILL,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        backgroundColor: "transparent",
        editable: "true",
        moveable: "true"
    });
    $.__views.credit_window.add($.__views.credit_table);
    $.__views.credit_tab = Ti.UI.createTab({
        window: $.__views.credit_window,
        id: "credit_tab",
        title: "Credit",
        icon: "banknotes.png"
    });
    $.__views.credit_tab && $.addTopLevelView($.__views.credit_tab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.credit_window);
        Ti.API.info("This is child widow credit.js" + JSON.stringify(_tab));
    };
    $.credit_window.data = {
        totalcredit: "",
        creditamount: "",
        bal: "",
        lastcredit: ""
    };
    var bal = 0;
    var creditamount = 0;
    var lastcredit = 0;
    var totalspent = 0;
    var totalcredit = 0;
    var sid = "1on0tH2DzdepwpCFWhpczS5qG3QO7BQJE-bGZCikzepg";
    var bal = Titanium.App.Properties.getInt("bal", 0);
    var totalspent = Titanium.App.Properties.getInt("totalspent");
    $.credit_window.data = {
        totalspent: totalspent,
        totalcredit: totalcredit,
        creditamount: creditamount,
        bal: bal,
        lastcredit: lastcredit
    };
    $.notes_textarea.data = {
        totalspent: totalspent,
        totalcredit: totalcredit,
        creditamount: creditamount,
        bal: bal,
        lastcredit: lastcredit
    };
    $.credit_tab.addEventListener("focus", function(e) {
        var content = Alloy.Globals.fetchingData("creditmodel");
        console.log("credit.js: tab focus: JSON.stringify(e)" + JSON.stringify(e));
        console.log("credit.js::JSON stringify content after tab is focus: " + JSON.stringify(content));
        var totalcredit = displayRow();
        $.credit_window.data = {
            totalspent: totalspent,
            totalcredit: totalcredit,
            creditamount: creditamount,
            bal: bal,
            lastcredit: lastcredit
        };
    });
    var content = Alloy.Globals.fetchingData("creditmodel");
    console.log("credit.js::JSON stringify content: " + JSON.stringify(content));
    var totalcredit = displayRow();
    $.credit_window.data = {
        totalspent: totalspent,
        totalcredit: totalcredit,
        creditamount: creditamount,
        bal: bal,
        lastcredit: lastcredit
    };
    if (content.length > 1) {
        var lastcredit = content[content.length - 1].col1;
        var creditamount = content[content.length - 1].col3;
    } else {
        var lastcredit = 0/0;
        var creditamount = 0;
    }
    console.log("credit.js::creditamount: " + creditamount);
    $.credit_window.data = {
        totalspent: totalspent,
        totalcredit: totalcredit,
        creditamount: creditamount,
        bal: bal,
        lastcredit: lastcredit
    };
    updateDummy(bal, totalcredit, creditamount, lastcredit);
    var picker = Ti.UI.createPicker({
        top: 90
    });
    var data = [];
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
        $.dateLabel.color = "#0066CC";
    });
    $.notes_textarea.addEventListener("blur", function(e) {
        console.log("JSON stringify notes_textarea blur(e): " + JSON.stringify(e));
        if (e.source.datepaid) {
            var date = e.source.datepaid;
            var lastcredit = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        } else alert("Please select date");
        e.value ? creditamount = e.value.trim() : alert("Please enter value");
        if (lastcredit && creditamount) {
            creditDetailAddRow(lastcredit, lastcredit, creditamount);
            Alloy.Globals.updatemodelTable("creditmodel", lastcredit, lastcredit, creditamount, "0", "0", "0", "0", "0", "0");
            var totalcredit = parseFloat(creditamount) + parseFloat(e.source.data.totalcredit);
            Titanium.App.Properties.setInt("totalcredit", totalcredit);
            var bal = parseFloat(Titanium.App.Properties.getInt("bal")) + parseFloat(creditamount);
            Titanium.App.Properties.setInt("bal", bal);
            console.log("credit.js:: notes_textarea totalcredit: " + totalcredit);
            var bal = parseFloat(totalcredit) - parseFloat(e.source.data.totalspent);
            Titanium.App.Properties.setInt("bal", bal);
            $.credit_window.data = {
                totalspent: totalspent,
                totalcredit: totalcredit,
                creditamount: creditamount,
                bal: bal,
                lastcredit: lastcredit
            };
            console.log("updateDummy(" + totalcredit + "," + creditamount + "," + lastcredit + ")");
            updateDummy(bal, totalcredit, creditamount, lastcredit);
            var zero = 0;
            var xmldatastring = "<entry xmlns='http://www.w3.org/2005/Atom' xmlns:gsx='http://schemas.google.com/spreadsheets/2006/extended'><gsx:col1>" + lastcredit + "</gsx:col1><gsx:col2>" + lastcredit + "</gsx:col2><gsx:col3>" + creditamount + "</gsx:col3><gsx:col4>" + zero + "</gsx:col4><gsx:col5>" + zero + "</gsx:col5><gsx:col6>" + zero + "</gsx:col6><gsx:col7>" + zero + "</gsx:col7><gsx:col8>" + zero + "</gsx:col8><gsx:col9>" + zero + "</gsx:col9></entry>";
            Ti.API.info("xmldatastring to POST: " + xmldatastring);
            var xhr = Titanium.Network.createHTTPClient({
                onload: function() {
                    try {
                        Ti.API.info(this.responseText);
                    } catch (e) {
                        Ti.API.info("cathing e: " + JSON.stringify(e));
                    }
                },
                onerror: function(e) {
                    Ti.API.info("error e: " + JSON.stringify(e));
                }
            });
            xhr.open("POST", "https://spreadsheets.google.com/feeds/list/" + sid + "/od6/private/full");
            xhr.setRequestHeader("Content-type", "application/atom+xml");
            xhr.send(xmldatastring);
            Ti.API.info("done POSTed");
        }
    });
    $.credit_window.addEventListener("close", function(e) {
        console.log("credit.js: close window: JSON.stringify(e)" + JSON.stringify(e));
        var bal = parseFloat(e.source.data.totalcredit) - parseFloat(e.source.data.totalspent);
        Titanium.App.Properties.setInt("bal", bal);
        updateDummy(bal, e.source.data.totalcredit, e.source.data.creditamount, e.source.data.lastcredit);
    });
    $.credit_tab.addEventListener("blur", function(e) {
        console.log("credit.js: tab blur: JSON.stringify(e)" + JSON.stringify(e));
    });
    __defers["$.__views.__alloyId5!click!addHandler"] && $.addListener($.__views.__alloyId5, "click", addHandler);
    __defers["$.__views.donebutton!click!blurIT"] && $.addListener($.__views.donebutton, "click", blurIT);
    __defers["$.__views.notes_textarea!focus!notesAreaFocus"] && $.addListener($.__views.notes_textarea, "focus", notesAreaFocus);
    __defers["$.__views.date_picker!change!setDate"] && $.addListener($.__views.date_picker, "change", setDate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;