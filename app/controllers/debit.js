var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.debit_window);
  Ti.API.info("This is child widow debit.js" +JSON.stringify(_tab));
  
  var totalspent=displayRow();
$.notes_textarea.totalspent = totalspent;
$.debit_window.data = {"totalspent":totalspent,"totalcredit":totalcredit,"debitamount":debitamount,"bal":bal,"lastdebit":lastdebit};
Titanium.App.Properties.setString('totalspent',totalspent);
console.log("debit.js: after row display totalspent: "+totalspent);
 
};

//intial var
var sid = Titanium.App.Properties.getString("debitsid");
//var sid = '11zxiijjENT69g_97R8nvLZvv_hfBC1tdsJrJ6skNBVE';
var creditamount=0; var lastcredit=0;
var bal=Titanium.App.Properties.getInt('bal',0);
var totalspent = Titanium.App.Properties.getString('totalspent',0);
var totalcredit = Titanium.App.Properties.getString('totalcredit',0);
var balalert = Titanium.App.Properties.getInt('balalert',100);


$.debit_tab.addEventListener("focus",function(e){
	var content=Alloy.Globals.fetchingData('debitmodel');
	console.log("debit.js:debit_tab event::JSON stringify content: "+JSON.stringify(content));
	console.log("debit.js: tab focus: JSON.stringify(e)"+JSON.stringify(e));
	console.log("debit.js::JSON stringify content after tab is focus: "+JSON.stringify(content));
	var totalspent=displayRow();
	Titanium.App.Properties.setString('totalspent',totalspent);//write to persistent memory
	console.log("debit.js: tab focus: totalspent"+totalspent+" Titanium.App.Properties.getInt(totalspent): "+Titanium.App.Properties.getInt("totalspent"));
});

//fething DB
var content=Alloy.Globals.fetchingData('debitmodel');
var contentsort = content.sort(function(a,b) { return (new Date(a.col1)) - (new Date(b.col1)) ;} );
console.log("debit.js::JSON stringify content: "+JSON.stringify(content));
console.log("debit.js::JSON stringify contentsort: "+JSON.stringify(contentsort));

//updated debitamount
if(content.length>0){
	var lastdebit=content[(content.length-1)].col1;
	var debitamount=(parseFloat(content[(content.length-1)].col4)).toFixed(2);
} else {
	var lastdebit="0/0/0";
	var debitamount="0";
}
console.log("debit.js::debitamount: "+debitamount);
$.debit_window.data = {"totalspent":totalspent,"totalcredit":totalcredit,"debitamount":debitamount,"bal":bal,"lastdebit":lastdebit}; //feed var to window

function updateDummy(bal,totalspent,amount,lastdebit,color) {
	var someDummy = Alloy.Models.dummy;
	if(bal>1000000){var bal = (parseFloat(bal)/1000000).toFixed(2)+" mil";};if(isNaN(bal)){var bal="";}
	someDummy.set({'id':'1234','bal':Alloy.Globals.numberWithCommas(bal),'totalspent': totalspent,'debitamount':amount,"lastdebit":lastdebit,"color":color});
	someDummy.fetch();
	console.log("debit.js :: stringify dummy :"+JSON.stringify(someDummy));
}
updateDummy(bal,totalspent,debitamount,lastdebit) ; //capture it

$.catLabel.addEventListener('click',function(e){
	  console.log("JSON stringify catLabel(e): "+JSON.stringify(e));
	  $.input_view.add(picker);
	  $.input_view.remove($.date_picker);
});


function addHandler(e) {
	console.log("JSON stringify addHandler(e): "+JSON.stringify(e));
}

function setDate(e){
	console.log("JSON stringify setDate(e): "+JSON.stringify(e));
	var date = e.value;
	$.notes_textarea.datedebit = date;
	var dateFormat = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	$.dateLabel.left= "20";
	$.dateLabel.text= dateFormat;
	//$.donebutton.date = dateFormat;

}

function debitDetailAddRow (date,dateadded,category,amount) {
		console.log("debit.js::debitDetailAddRow: date: "+date+"  dateadded: "+dateadded+" +dateadded: "+dateadded);
	    var debitrow = Ti.UI.createTableViewRow ({
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
        var datespend = Ti.UI.createLabel ({
                color : "#0F84DE",
                font : {
                	fontSize : 12
                },
                left  : "20",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "35",
                text : date.toLocaleString()
       });
        var categorylabel = Ti.UI.createLabel ({
                color : "#333",
                font : {
                	fontSize : 24
                },
                left  : "20",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "50",
                text : category
       });
        var amountlabel = Ti.UI.createLabel ({
                color : "#333",
                font : {
                	fontSize : 24
                },
                right  : "50",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "50",
                text : amount
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
        debitrow.add(datelabel);
        debitrow.add(datespend);
        debitrow.add(categorylabel);
        debitrow.add(amountlabel);
        debitrow.add(blueline);
        
        debitrow.add(innerview);
    
        debitrow.metadata = dateadded; // add metadata info
        
        var debittable = Ti.UI.createTableView({
                backgroundColor: "white",
                separatorStyle :"Titanium.UI.iPhone.TableViewSeparatorStyle.NONE"
        });
        debittable.add(debitrow);
        
        $.debit_table.appendRow(debitrow);

};

//List table contents
/*
for(i=content.length-1;i>=0;i--){
	debitDetailAddRow(content[i].col1,content[i].col2,content[i].col3,content[i].col4);
}*/

function displayRow(e){
	var totalspent=0;
	for(i=0;i<content.length;i++){
		debitDetailAddRow(content[i].col1,content[i].col2,content[i].col3,content[i].col4);
		var totalspent = parseFloat(content[i].col4)+ parseFloat(totalspent);
		if (i == (content.length-1)) { $.debit_window.lastdebit = content[i].col1;} // capture the last date
	}	
	return totalspent;
}


var picker = Ti.UI.createPicker({
  top:93
  
});
var data = []; var cat = [];
var cat = ['Book', 'Grocery', 'Transport','Fee', 'Stationary', 'Electronics', 'Travel'];
for (i=0;i<cat.length;i++){
	data =  Ti.UI.createPickerRow({title:cat[i],font:{ fontSize:24 }});
	picker.add(data);
}
picker.selectionIndicator = true;

$.catLabel.color="red";
picker.addEventListener('change',function(e){
  console.log("JSON stringify picker(e): "+JSON.stringify(e));
  var catselected = e.row.title;
  $.catLabel.left="20";
  $.catLabel.text=catselected;
  $.notes_textarea.category = catselected;
  $.catLabel.color="#0F81C3";
  //$.input_view.remove(picker);
});

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
	//Alloy.Globals.updatemodelTable("debitmodel",col1,col2,col3,col4,col5,col6,col7,col8,col9);
}

//function when done button is clicked.
function Done(e){
	console.log("JSON stringify Done(e): "+JSON.stringify(e));
	$.notes_textarea.blur();
}

$.dateLabel.addEventListener('click',function(e){
  console.log("JSON stringify dateLabel(e): "+JSON.stringify(e));
  $.input_view.add($.date_picker);
  $.dateLabel.color="#0F81C3";
});

$.notes_textarea.addEventListener("blur",function(e){
	//update date and debit entered.
	var timestamp = Date.now();
	console.log("JSON stringify notes_textarea blur(e): "+JSON.stringify(e));
	if (e.source.datedebit) {
		var date = e.source.datedebit;
		var dateMDY=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	} else alert("Please select date");
	(e.source.category)?catselected=e.source.category:alert("Please select category");
	(e.value)?amount=parseFloat(e.value.trim()).toFixed(2):alert("Please enter value");
	if (dateMDY && amount) {
		debitDetailAddRow(dateMDY,dateMDY,catselected,amount);//add row
		Alloy.Globals.updatemodelTable("debitmodel",dateMDY,dateMDY,catselected,amount,"0","0","0","0",timestamp);//update local DB
		var totalspent = parseFloat(amount)+ parseFloat(e.source.totalspent);
		console.log("debit.js: e.source.totalspent:  "+e.source.totalspent+" totalspent: "+totalspent+" amount: "+amount);
		Titanium.App.Properties.setString('totalspent', totalspent);//write to persistent memory
		var bal = ((parseFloat(Titanium.App.Properties.getInt('bal'))-parseFloat(amount))).toFixed(2);if(isNaN(bal)){ var bal = "";}; //Don't display a NaN balance.
		var color = Alloy.Globals.setBalColor(bal); 
		Titanium.App.Properties.setInt('bal', bal);//write to persistent memory
		console.log("debit.js:: notes_textarea totalspent: "+totalspent);
		//updateDUmmy
		$.debit_window.data = {"totalspent":totalspent,"totalcredit":totalcredit,"debitamount":amount,"bal":bal,"lastdebit":lastdebit,"color":color};
		$.notes_textarea.totalspent = totalspent;
		console.log("debit.js::notes_textarea:blur: updateDummy("+bal+","+totalspent+","+amount+","+dateMDY+")");
		updateDummy(bal,totalspent,amount,dateMDY,color) ;
		Alloy.Globals.updateSpreadsheet(sid,dateMDY,dateMDY,catselected,amount,"0","0","0","0",timestamp);	//update spreadsheet
		var timestamp=0;
	}
});

var updateFunction = args.updateFunction;
$.debit_window.addEventListener("close",function(e){
	console.log("debit.js: close window: JSON.stringify(e)"+JSON.stringify(e));
	var bal = (parseFloat(e.source.data.totalcredit)-parseFloat(e.source.data.totalspent)).toFixed(2);
	var color = Alloy.Globals.setBalColor(bal);
	Titanium.App.Properties.setInt('bal',bal);
	updateDummy(bal,e.source.data.totalspent,e.source.data.debitamount,e.source.data.lastdebit,color);
	updateFunction(bal);
});
$.debit_tab.addEventListener("blur",function(e){
	console.log("debit.js: tab blur: JSON.stringify(e)"+JSON.stringify(e));
});

var refresh = Ti.UI.createRefreshControl({
    tintColor:'orange'
});

$.debit_table.refreshControl=refresh;

refresh.addEventListener('refreshstart',function(e){
	setTimeout(function(){
        console.log('refresh:: JSON.stringify(e): '+JSON.stringify(e));
        var content=Alloy.Globals.fetchingData('debitmodel');
        console.log("credit.js::JSON stringify content: "+JSON.stringify(content));
        refresh.endRefreshing();
    }, 2000);
});

