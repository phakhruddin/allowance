exports.openMainWindow = function(_tab) {
  _tab.open($.settings_window);
  Ti.API.info("This is child widow settings.js" +JSON.stringify(_tab));
};

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