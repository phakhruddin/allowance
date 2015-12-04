var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.credit_window);
  Ti.API.info("This is child widow credit.js" +JSON.stringify(_tab));
  updateFunction(bal);
};
//intial var
$.credit_window.data = {"totalcredit":"","creditamount":"","bal":"","lastcredit":""};
var bal=0;var creditamount=0; var lastcredit=0; var totalspent = 0; var totalcredit=0;
var sid = Titanium.App.Properties.getString("creditsid");
//var sid="1on0tH2DzdepwpCFWhpczS5qG3QO7BQJE-bGZCikzepg";
var bal=Titanium.App.Properties.getInt('bal',0);
var balalert = Titanium.App.Properties.getInt('balalert',100);
var totalspent=Titanium.App.Properties.getString('totalspent'); // feed the data to window

// Whenever the tab is active, pull data from DB
$.credit_tab.addEventListener("focus",function(e){
	var content=Alloy.Globals.fetchingData('creditmodel');
	console.log("credit.js: tab focus: JSON.stringify(e)"+JSON.stringify(e));
	console.log("credit.js::JSON stringify content after tab is focus: "+JSON.stringify(content));
	var totalcredit=displayRow();
	$.credit_window.data = {"totalspent":totalspent,"totalcredit":totalcredit,"creditamount":creditamount,"bal":bal,"lastcredit":lastcredit}; 
});

function fetchingData(type){
	eval("var "+type+" = Alloy.Collections.instance(type);");
	eval(type+".fetch().sort();");
	eval("var content = "+type+".toJSON();");
	return content;
}
//pulling data from the sqlite
var content=Alloy.Globals.fetchingData('creditmodel');
var contentsort = content.sort(function(a,b) { return (new Date(a.col1)) - (new Date(b.col1)) ;} );
//var content=fetchingData('creditmodel');
console.log("credit.js::JSON stringify content: "+JSON.stringify(content));
console.log("credit.js::JSON stringify contentsort: "+JSON.stringify(contentsort));

//Table row contents and updated balance
function displayRow(e){
	var totalcredit=0;
	for(i=0;i<content.length;i++){
		creditDetailAddRow(content[i].col1,content[i].col2,content[i].col3,+content[i].col4);
		var totalcredit = parseFloat(content[i].col3)+ parseFloat(totalcredit);
		Titanium.App.Properties.setString('totalcredit', totalcredit);//write to persistent memory
		$.notes_textarea.data = {"totalspent":totalspent,"totalcredit":totalcredit,"creditamount":creditamount,"bal":bal,"lastcredit":lastcredit}; 
		//$.credit_window.data.totalcredit = totalcredit;	
		$.credit_window.data = {"totalspent":totalspent,"totalcredit":totalcredit,"creditamount":creditamount,"bal":bal,"lastcredit":lastcredit}; 
	}	
	return totalcredit;
}
var totalcredit=displayRow();
$.credit_window.data = {"totalspent":totalspent,"totalcredit":totalcredit,"creditamount":creditamount,"bal":bal,"lastcredit":lastcredit}; 

//updated creditamount
if(content.length>0){
	var lastcredit=content[(content.length-1)].col1;
	var creditamount=content[(content.length-1)].col3;
} else {
	var lastcredit="0/0/0";
	var creditamount="0";
}
console.log("credit.js::creditamount: "+creditamount);
//$.credit_window.data.creditamount=creditamount; //feed var to window
$.credit_window.data = {"totalspent":totalspent,"totalcredit":totalcredit,"creditamount":creditamount,"bal":bal,"lastcredit":lastcredit}; 

//function to capture balance data for main summary screen
function updateDummy(bal,totalcredit,creditamount,lastcredit,color) {
	var someDummy = Alloy.Models.dummy;
	console.log("credit.js::bal b4: "+bal);
	if(bal>1000000){var bal = (parseFloat(bal)/1000000).toFixed(2)+" mil";};if(isNaN(bal)){var bal="";}
	console.log("credit.js::bal after: "+bal);
	someDummy.set({'id':'1234','bal':Alloy.Globals.numberWithCommas(bal),'totalcredit': totalcredit,'dcreditamount':creditamount,"lastcredit":lastcredit,"color":color});
	someDummy.fetch();
	console.log("credit.js ::updateDummy:: stringify dummy :"+JSON.stringify(someDummy));
}
updateDummy(bal,totalcredit,creditamount,lastcredit) ; //capture it


function addHandler(e) {
	console.log("JSON stringify addHandler(e): "+JSON.stringify(e));
}

function setDate(e){
	console.log("JSON stringify setDate(e): "+JSON.stringify(e));
	var date = e.value;
	$.dateLabel.text= (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	//$.timeLabel.text= Alloy.Globals.formatAMPM(date);
	console.log("credit.js:: put date to notest_textare: "+date);
	$.notes_textarea.datepaid = date; // feeding date to notes_textare
}

function creditDetailAddRow (date,dateadded,creditamount) {
		console.log("credit.js::creditDetailAddRow: date: "+date+"  dateadded: "+dateadded+" creditamount: "+creditamount);
	    var creditrow = Ti.UI.createTableViewRow ({
                backgroundColor: "white",
                opacity:"0",
                color:"transparent",
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
        });
	
        var datelabel = Ti.UI.createLabel ({
                color : "orange",
                font : {
                	fontSize : 10
                },
                right  : "40",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "10",
                text : dateadded
        });
        var datecredit = Ti.UI.createLabel ({
                color : "#0F84DE",
                font : {
                	fontSize : 24
                },
                left  : "30",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "50",
                text : date.toLocaleString()
       });
        (creditamount>10000)?fontsz = 18:fontsz=24;
        var amountlabel = Ti.UI.createLabel ({
                color : "#333",
                font : {
                	fontSize : fontsz
                },
                right  : "40",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_RIGHT",
                top : "50",
                text : Alloy.Globals.numberWithCommas(creditamount.toLocaleString())
          });
        var blueline = Ti.UI.createImageView ({
                left  : "20",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "30",
                width : "85%",
                height : "3",
                image : "blueline.png"
        });
        var innerview = Ti.UI.createView({
                width:"30%",
                height:"Ti.UI.Size",
                left:"60%",
                top:"40",
                backgroundColor:"white",
                borderRadius:"10",
                borderWidth:"0.1",
                borderColor:"white"
        });
        creditrow.add(datelabel);
        creditrow.add(datecredit);
        creditrow.add(amountlabel);
        creditrow.add(blueline);
        
        creditrow.add(innerview);
    
        creditrow.metadata = dateadded; // add metadata info
        /*
        var credittable = Ti.UI.createTableView({
                backgroundColor: "white",
                separatorStyle :"Titanium.UI.iPhone.TableViewSeparatorStyle.NONE"
        });
        credittable.add(creditrow);*/
        
       $.credit_table.appendRow(creditrow);
};


var picker = Ti.UI.createPicker({
  top:90
  
});
var data = []; 

$.input_view.remove($.date_picker);
$.input_view.add(picker);

$.costLabel.addEventListener('click',function(e){
  console.log("JSON stringify costLabel(e): "+JSON.stringify(e));
  $.input_view.remove(picker);
  $.costTF.show();
});

function notesAreaFocus(e) {
	console.log("JSON stringify notes_textarea(e): "+JSON.stringify(e));
	$.notes_textarea.borderColor="#bbb";
}

//function when DONE is clicked.
function blurIT(e){
	console.log("JSON stringify blurIT(e): "+JSON.stringify(e));
	$.notes_textarea.blur();
}

$.dateLabel.addEventListener('click',function(e){
  console.log("JSON stringify dateLabel(e): "+JSON.stringify(e));
  $.input_view.add($.date_picker);
  $.dateLabel.color="#0066CC";
 
});

$.notes_textarea.addEventListener("blur",function(e){
	//update date and credit entered.
	console.log("JSON stringify notes_textarea blur(e): "+JSON.stringify(e));
	if (e.source.datepaid) {
		var date = e.source.datepaid;
		var lastcredit=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	} else alert("Please select date");
	(e.value)?creditamount=parseFloat(e.value.trim()).toFixed(2):alert("Please enter value");
	if (lastcredit && creditamount) {
		var timestamp = Date.now();
		creditDetailAddRow(lastcredit,lastcredit,creditamount);//add row here with DATE and AMOUNT
		Alloy.Globals.updatemodelTable("creditmodel",lastcredit,lastcredit,creditamount,"0","0","0","0","0",timestamp);//update local DB
		var totalcredit = parseFloat(creditamount)+ parseFloat(e.source.data.totalcredit);
		Titanium.App.Properties.setString('totalcredit', totalcredit);//write to persistent memory
		var bal = parseFloat(Titanium.App.Properties.getInt('bal'))+parseFloat(creditamount);if(isNaN(bal)){ var bal = "";}; //Don't display a NaN balance.
		Titanium.App.Properties.setInt('bal', bal);//write to persistent memory
		console.log("credit.js:: notes_textarea totalcredit: "+totalcredit);
		var color = Alloy.Globals.setBalColor(bal); //set balance color if it falls below threshold
		$.credit_window.data = {"totalspent":totalspent,"totalcredit":totalcredit,"creditamount":creditamount,"bal":bal,"lastcredit":lastcredit}; // feed data to window
		console.log("credit.js::notes_textarea:blur: updateDummy("+bal+","+totalcredit+","+creditamount+","+lastcredit+")");
		updateDummy(bal,totalcredit,creditamount,lastcredit,color);
		// test write spreadsheet
		var zero = 0;
		var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
		+'<gsx:col1>'+lastcredit+'</gsx:col1><gsx:col2>'+lastcredit+'</gsx:col2><gsx:col3>'
		+creditamount+'</gsx:col3><gsx:col4>'+zero+'</gsx:col4><gsx:col5>'
		+zero+'</gsx:col5><gsx:col6>'+zero+'</gsx:col6><gsx:col7>'+zero+'</gsx:col7><gsx:col8>'+zero+'</gsx:col8><gsx:col9>'+timestamp
		+'</gsx:col9></entry>';
		Ti.API.info('xmldatastring to POST: '+xmldatastring);
		var xhr =  Titanium.Network.createHTTPClient({
	    onload: function() {
		    	try {
		    		Ti.API.info(this.responseText); 
		    	} catch(e){
		    		Ti.API.info("cathing e: "+JSON.stringify(e));
		    	}     
		    },
		    onerror: function(e) {
		    	Ti.API.info("error e: "+JSON.stringify(e));
		    }
		});
			//xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+sid+'/od6/public/full');
			xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+sid+'/od6/private/full');
		xhr.setRequestHeader("Content-type", "application/atom+xml");
		//xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuth.getAccessToken());
		xhr.send(xmldatastring);
		Ti.API.info('done POSTed');
		var timestamp;
	}
});

var updateFunction = args.updateFunction;

//Action when the user move away from the active screen
$.credit_window.addEventListener("close",function(e){
	console.log("credit.js: close window: JSON.stringify(e)"+JSON.stringify(e));
	var bal = (parseFloat(e.source.data.totalcredit)-parseFloat(e.source.data.totalspent)).toFixed(2);
	var color = Alloy.Globals.setBalColor(bal); 
	Titanium.App.Properties.setInt('bal',bal);
	updateDummy(bal,e.source.data.totalcredit,e.source.data.creditamount,e.source.data.lastcredit,color);
	updateFunction(bal);
});
$.credit_tab.addEventListener("blur",function(e){
	console.log("credit.js: tab blur: JSON.stringify(e)"+JSON.stringify(e));
});

$.credit_window.data = {"totalspent":totalspent,"totalcredit":totalcredit,"creditamount":creditamount,"bal":bal,"lastcredit":lastcredit}; 
$.notes_textarea.data = {"totalspent":totalspent,"totalcredit":totalcredit,"creditamount":creditamount,"bal":bal,"lastcredit":lastcredit}; 

var refresh = Ti.UI.createRefreshControl({
    tintColor:'orange'
});

$.credit_table.refreshControl=refresh;

refresh.addEventListener('refreshstart',function(e){
	setTimeout(function(){
        console.log('credit::refresh:: JSON.stringify(e): '+JSON.stringify(e));
        var content=Alloy.Globals.fetchingData('creditmodel');
		console.log("credit.js::JSON stringify content: "+JSON.stringify(content));
        refresh.endRefreshing();
    }, 2000);
});
