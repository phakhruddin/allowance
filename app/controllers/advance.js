exports.openMainWindow = function(_tab) {
  _tab.open($.advance_window);
  Ti.API.info("This is child widow advance.js" +JSON.stringify(_tab));
};

var someInfo = Alloy.Models.info;
someInfo.fetch();
console.log("advance::checkInfo: json stringify: "+JSON.stringify(someInfo));
	
function checkInfo(){
	var info=JSON.parse(JSON.stringify(someInfo));
	console.log("advance::checkInfo: name: "+info.name);
}

function createDir(){
	var info=JSON.parse(JSON.stringify(someInfo));
	var name = info.name.replace(/ /g,"_");
	console.log("advance::checkInfo: name: "+name);
	if(Alloy.Globals.license == "demo"){
		var parentid=Titanium.App.Properties.getString("publicrepo");
		} else var parentid=Titanium.App.Properties.getString("privaterepo") ;
	console.log("advance:createDir::  createFolder("+name+","+parentid+"): ");
	Alloy.Globals.createFolder(name,parentid);
}

function getMaster(){
	Alloy.Globals.getMaster();
}

function setPrivate() {
	Alloy.Globals.setPrivate(sid);
}
