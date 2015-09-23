exports.openMainWindow = function(_tab) {
  _tab.open($.settings_window);
  Ti.API.info("This is child widow settings.js" +JSON.stringify(_tab));
};

var someDummy = Alloy.Models.dummy;
var someInfo = Alloy.Models.info;


function addHandler(e) {
	console.log("JSON stringify addHandler(e): "+JSON.stringify(e));
}

 function myRefresher(e) {
	console.log("refreshing after pull : " +JSON.stringify(e));
    Alloy.Collections.settings.fetch({
        success: e.hide,
        error: e.hide
    });
}

Titanium.App.Properties.setInt('balalert',100);

$.name_tf.addEventListener('blur', function(e) {
    var name = $.name_tf.value.trim();
    Ti.API.info("settings:: entered is: "+name);
    Titanium.App.Properties.setString('name',name);
    Ti.API.info("settings:: name obtained is: "+Titanium.App.Properties.getString('name'));
    console.log("settings:: JSON of textfield: "+JSON.stringify(e));
    someInfo.set({"id":"1234",
		"name": name
	});
	someInfo.fetch();
	console.log("main.js:: stringify dummy :"+JSON.stringify(someInfo));
 });
 
$.emailid_tf.addEventListener('blur', function(e) {
    var emailid = $.emailid_tf.value.trim();
    Ti.API.info("settings:: entered is: "+emailid);
    Titanium.App.Properties.setString('emailid',emailid);
    Ti.API.info("settings:: emailid obtained is: "+Titanium.App.Properties.getString('emailid'));
    console.log("settings:: JSON of textfield: "+JSON.stringify(e));
 });