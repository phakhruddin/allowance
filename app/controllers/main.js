//reset var
var bal=0;var creditamount=0; var lastcredit=0; var totalspent = 0; var totalcredit=0;
var someDummy = Alloy.Models.dummy;
var someInfo = Alloy.Models.info;
var balalert = Titanium.App.Properties.getInt('balalert',100);
$.main_window.login="no";

$.main_window.addEventListener ("open", function(e){
	console.log("main.js:: main_window open JSON.stringify(e)" +JSON.stringify(e));
	if (e.source.login = "no"){
		$.status_view.show();
		$.status_label.text="Please click login above.";
	} else {
		$.status_view.height="1";
		$.status_view.backgroundColor="green";
	}
	
});

//set account name
//$.name.text=Alloy.Globals.name;

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
	var url="https://spreadsheets.google.com/feeds/list/11zxiijjENT69g_97R8nvLZvv_hfBC1tdsJrJ6skNBVE/od6/public/basic?hl=en_US&alt=json";
	var type="debitmodel";
	Alloy.Globals.updateType(url,type);
}

function creditAction(e){
	var sid="1on0tH2DzdepwpCFWhpczS5qG3QO7BQJE-bGZCikzepg";
	var url="https://spreadsheets.google.com/feeds/list/"+sid+"/od6/public/basic?hl=en_US&alt=json";
	var type="creditmodel";
	Alloy.Globals.updateType(url,type);
}

//checkng data last credit information
var creditmodel = Alloy.Collections.instance('creditmodel');
creditmodel.fetch();
var content = creditmodel.toJSON();
if(content.length>0){
	var maxrec=content.length-1;
	var lastcredit=content[maxrec].col1;
	var creditamount=content[maxrec].col3;
	var lastcredit = content[maxrec].col1;
} else {
	var creditamount=0;
	var lastcredit=0/0/0;
}
console.log("main.js: lastcredit: "+lastcredit+", creditamount: "+creditamount);

//checkng data last debit information
var debitmodel = Alloy.Collections.instance('debitmodel');
debitmodel.fetch();
var content = debitmodel.toJSON();
if(content.length>0){
	var maxrec=content.length-1;
	var lastdebit=content[maxrec].col1;
	var debitamount=content[maxrec].col4;
	var lastdebit = content[maxrec].col1;
} else {
	var debitamount=0;
	var lastdebit=0/0/0;
}
console.log("main.js: lastdebit: "+lastdebit+", debitamount: "+debitamount);
	
//calculate initial balance when app launched
var totalcredit = Titanium.App.Properties.getInt('totalcredit',0);//get from persistent memory
var totalspent = Titanium.App.Properties.getInt('totalspent',0);//get from persistent memory
console.log("main.js: totalcredit: "+totalcredit+", totalspent: "+totalspent);
(Titanium.App.Properties.getInt('bal'))?bal="NONE":bal = parseFloat(totalcredit)-parseFloat(totalspent);
Alloy.Globals.setBalColor(bal);

someInfo.set({"id":"1234",
	"namecolor": "black",
	"name": Titanium.App.Properties.getString('name'),
	"emailid": Titanium.App.Properties.getString('emailid')
});
someInfo.fetch();
console.log("main.js:: stringify info :"+JSON.stringify(someInfo));

someDummy.set({"id":"1234",
	"bal":bal,
	"dcreditamount":creditamount,
	"lastcredit":lastcredit,
	"lastdebit":lastdebit,
	"debitamount":debitamount,
	"totalspent":totalspent,
	"totalcredit":totalcredit,
	"color": "#13CA13"
});
someDummy.fetch();
console.log("main.js:: stringify dummy :"+JSON.stringify(someDummy));


//Google Auth Local
var GoogleAuth = require('googleAuth');
var googleAuthSheet = new GoogleAuth({
	clientId : Alloy.Globals.clientId,
	propertyName : 'googleToken',
	scope : Alloy.Globals.scope,
	quiet: false
});

console.log('main.js:: googleAuthSheet.getAccessToken() Token: ' + googleAuthSheet.getAccessToken());

//get email address used to login 
function getEmail(e){
			var xhr = Ti.Network.createHTTPClient({
		    onload: function(e) {
		    try {
		    		var json = JSON.parse(this.responseText);
		    		Ti.API.info("response is: "+JSON.stringify(json));
		    		var emailid = json.email;
		    		Titanium.App.Properties.setString('emailid',emailid);
		    		console.log("main.js::args inside getEmail: emailid "+emailid+" :: "+JSON.stringify(e));
		    	} catch(e){
					Ti.API.info("cathing e: "+JSON.stringify(e));
				}
				return emailid;
				Titanium.App.Properties.setString('emailid',emailid);
			}
			});
		xhr.onerror = function(e){
			console.log('main::getEmail:: unable to get info for '+e);
		};
		console.log('main::getEmail:: URL:: https://www.googleapis.com/oauth2/v1/userinfo?alt=json');
		xhr.open("GET", 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json');
		xhr.setRequestHeader("Content-type", "application/json");
	    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
		xhr.send();
	}

//if user login. LOGOUT button.
function login(e) {
	//check if user is authorized. If authorized, load user info, and create datastore if not yet existed.
	console.log("main.js:: login/logout: JSON.stringify(e)" +JSON.stringify(e));
	if (e.source.title == "LOGIN") {
		googleAuthSheet.isAuthorized(function() {
			console.log('Access Token: ' + googleAuthSheet.getAccessToken());
			Titanium.App.Properties.setString('needAuth',"false");
			$.login_button.title="LOGOUT";
			someInfo.set({"namecolor": "#13CA13"});
			Alloy.Globals.getMaster(); // Load user info
			getEmail();
			Alloy.Globals.initialUserSetup(); //setup datastore if it is not yet done
			alert("Logged in successfully with "+Titanium.App.Properties.getString('emailid')+" ");
			$.main_window.login="yes";
			$.status_view.height="1";
			$.status_view.backgroundColor="green";
		}, function() {
			console.log('isAuthorized:NOT:Fr AlloyGlobal Authorized first, see next window: '+(new  Date()));
			Titanium.App.Properties.setString('needAuth',"true");
			googleAuthSheet.authorize();
			$.login_button.title="LOGOUT";
			someInfo.set({"namecolor": "#13CA13"});
			getEmail();
			alert("Logged in successfully with "+Titanium.App.Properties.getString('emailid')+" ");
			$.main_window.login="yes";
			$.status_view.height="1";
			$.status_view.backgroundColor="green";
			}
		);
	} else {
		Ti.API.info('Logout: ');
		googleAuthSheet.deAuthorize();
		$.login_button.title="LOGIN";
		someInfo.set({"namecolor": "red"});
	}

}

