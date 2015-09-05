//reset var
var bal=0;var creditamount=0;
var someDummy = Alloy.Models.dummy;

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
if(content.length>0){
	var maxrec=content.length-1;
	var lastcredit=content[maxrec].col1;
	var creditamount=content[maxrec].col3;
} else var creditamount=0;

console.log("main.js: lastcredit: "+lastcredit+", creditamount: "+creditamount);
$.lastcredit.text="Last Credit on: "+lastcredit;
//$.creditamount.text=creditamount;
	

for(i=0;i<content.length;i++){
	var bal = parseFloat(content[i].col3)+ parseFloat(bal);
	console.log("main.js: content[i].col3: "+content[i].col3+" bal : "+bal);
}
someDummy.set({"id":"1234","bal":bal,"dcreditamount":creditamount});
someDummy.fetch();
console.log("main.js:: stringify dummy :"+JSON.stringify(someDummy));