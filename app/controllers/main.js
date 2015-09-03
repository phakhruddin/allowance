//reset var
var bal=0;

$.lastcredit_button.addEventListener ("click", function(e){
	console.log("main.js:: JSON.stringify(e)" +JSON.stringify(e));
	var tabViewOneController = Alloy.createController("credit");
	tabViewOneController.openMainWindow($.main_tab);	
});

$.lastdebit_button.addEventListener ("click", function(e){
	console.log("main.js:: JSON.stringify(e)" +JSON.stringify(e));
	var tabViewOneController = Alloy.createController("debit");
	tabViewOneController.openMainWindow($.main_tab);	
});

function debitAction(e){
	var url="https://spreadsheets.google.com/feeds/list/11zxiijjENT69g_97R8nvLZvv_hfBC1tdsJrJ6skNBVE/od6/public/basic?hl=en_US&alt=json"
	var type="debitmodel";
	Alloy.Globals.updateType(url,type);
}

function creditAction(e){
	var sid="1on0tH2DzdepwpCFWhpczS5qG3QO7BQJE-bGZCikzepg";
	var url="https://spreadsheets.google.com/feeds/list/"+sid+"/od6/public/basic?hl=en_US&alt=json";
	var type="creditmodel";
	Alloy.Globals.updateType(url,type);
}

var creditmodel = Alloy.Collections.instance('creditmodel');
creditmodel.fetch();
var content = creditmodel.toJSON();
console.log("credit.js::JSON stringify content: "+JSON.stringify(content));

for(i=0;i<content.length;i++){
	var bal = parseFloat(content[i].col3)+ parseFloat(bal);
	console.log("main.js: content[i].col3: "+content[i].col3+" bal : "+bal);
}

var someDummy = Alloy.Models.dummy;
console.log("main.js:: stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();
someDummy.set('bal', bal);