exports.openMainWindow = function(_tab) {
  _tab.open($.advance_window);
  Ti.API.info("This is child widow advance.js" +JSON.stringify(_tab));
};



function createDir(){
	var name = Alloy.Globals.name;
	Alloy.Globals.createFolder();
}
