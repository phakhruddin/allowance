var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Titanium.App.Properties.setInt("mastersid", "16QfBs8Yn5ukMlVF8Tdl1iRzk2Uplwtop0ZSz2ktRZTE");

Alloy.Globals.formatAMPM = function(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours ? hours : 12;
    minutes = 10 > minutes ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
};

console.log("Ti.Filesystem.tempDirectory: " + Ti.Filesystem.tempDirectory);

Alloy.Globals.writeFile = function(content, filename) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filename);
    file.write(content + "\n");
};

Alloy.Globals.updatemodelTable = function(type, col1, col2, col3, col4, col5, col6, col7, col8, col9) {
    console.log("Alloy.Globals.updatemodelTable: type: " + type + " :col1: " + col1);
    var model = Alloy.createModel(type, {
        col1: col1,
        col2: col2,
        col3: col3,
        col4: col4,
        col5: col5,
        col6: col6,
        col7: col7,
        col8: col8,
        col9: col9
    });
    model.save();
};

Alloy.Globals.updateType = function(url, type) {
    console.log("Alloy.Globals.updateType: type: " + type + " :url: " + url);
    var xhr = Ti.Network.createHTTPClient({
        onload: function(ee) {
            eval("Alloy.Collections." + type + ".deleteAll()");
            json = JSON.parse(this.responseText);
            console.log("Alloy.Globals.updateType : json: " + json);
            var out = '{ "poi" : [\n';
            for (var i = 0; i < json.feed.entry.length; i++) {
                var col1 = json.feed.entry[i].title.$t.trim();
                var col2 = json.feed.entry[i].content.$t.split(",")[0].split(":")[1].trim() || "none";
                var col3 = json.feed.entry[i].content.$t.split(",")[1].split(":")[1].trim() || "none";
                var col4 = json.feed.entry[i].content.$t.split(",")[2].split(":")[1].trim() || "none";
                var col5 = json.feed.entry[i].content.$t.split(",")[3].split(":")[1].trim() || "none";
                var col6 = json.feed.entry[i].content.$t.split(",")[4].split(":")[1].trim() || "none";
                var col7 = json.feed.entry[i].content.$t.split(",")[5].split(":")[1].trim() || "none";
                var col8 = json.feed.entry[i].content.$t.split(",")[6].split(":")[1].trim() || "none";
                var col9 = json.feed.entry[i].content.$t.split(",")[7].split(":")[1].trim() || "none";
                Alloy.Globals.updatemodelTable(type, col1, col2, col3, col4, col5, col6, col7, col8, col9);
                out += i == json.feed.entry.length - 1 ? '{ "col1" : "' + col1 + '" , "col2" : "' + col2 + '" , "col3" : "' + col3 + '"  , "col4" : "' + col4 + '" , "col5" : "' + col5 + '" , "col6" : "' + col6 + '" , "col7" : "' + col7 + '" , "col8" : "' + col8 + '" , "col9" : "' + col9 + '" }]}\n' : '{ "col1" : "' + col1 + '" , "col2" : "' + col2 + '" , "col3" : "' + col3 + '"  , "col4" : "' + col4 + '" , "col5" : "' + col5 + '" , "col6" : "' + col6 + '" , "col7" : "' + col7 + '" , "col8" : "' + col8 + '" , "col9" : "' + col9 + '" },\n';
            }
            Alloy.Globals.writeFile(out, type + ".json");
            var json = out;
        }
    });
    xhr.open("GET", url);
    xhr.send();
};

Alloy.Globals.fetchingData = function(type) {
    eval("var " + type + " = Alloy.Collections.instance(type);");
    eval(type + ".fetch();");
    eval("var content = " + type + ".toJSON();");
    return content;
};

Alloy.createController("index");