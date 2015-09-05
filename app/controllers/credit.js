exports.openMainWindow = function(_tab) {
  _tab.open($.credit_window);
  Ti.API.info("This is child widow credit.js" +JSON.stringify(_tab));
  	
};

//reset var
var bal=0;var creditamount=0;

$.credit_window.addEventListener("close",function(e){
	console.log("credit.js: close window: JSON.stringify(e)"+JSON.stringify(e));
});

//pulling data from the sqlite
var creditmodel = Alloy.Collections.instance('creditmodel');
creditmodel.fetch();
var content = creditmodel.toJSON();
console.log("credit.js::JSON stringify content: "+JSON.stringify(content));

	
//Table row contents and updated balance
for(i=0;i<content.length;i++){
	creditDetailAddRow(content[i].col1,content[i].col2,content[i].col3,'$'+content[i].col4);
	var bal = parseFloat(content[i].col3)+ parseFloat(bal);
	$.notes_textarea.bal = bal;
	$.credit_window.bal = bal;	
}
//updated creditamount
var creditamount=content[(content.length-1)].col3;
console.log("credit.js::creditamount: "+creditamount);
$.credit_window.creditamount=creditamount; //feed var to window

//function to capture balance data for main summary screen
function updateDummy(bal,amount) {
	var someDummy = Alloy.Models.dummy;
	someDummy.set({'id':'1234','bal': bal,'dcreditamount':amount});
	someDummy.fetch();
	console.log("credit.js :: stringify dummy :"+JSON.stringify(someDummy));
}
updateDummy(bal,creditamount) ; //capture it


function addHandler(e) {
	console.log("JSON stringify addHandler(e): "+JSON.stringify(e));
}

function setDate(e){
	console.log("JSON stringify setDate(e): "+JSON.stringify(e));
	var date = e.value;
	$.dateLabel.text= (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	$.timeLabel.text= Alloy.Globals.formatAMPM(date);
	console.log("credit.js:: put date to notest_textare: "+date);
	$.notes_textarea.datepaid = date; // feeding date to notes_textare
}

function creditDetailAddRow (date,dateadded,amount) {
		console.log("credit.js::creditDetailAddRow: date: "+date+"  dateadded: "+dateadded);
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
        var amountlabel = Ti.UI.createLabel ({
                color : "#333",
                font : {
                	fontSize : 24
                },
                right  : "100",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "50",
                text : "$"+amount
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
		var dateMDY=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	} else alert("Please select date");
	(e.value)?amount=e.value.trim():alert("Please enter value");
	if (dateMDY && amount) {
		creditDetailAddRow(dateMDY,dateMDY,amount);//add row here with DATE and AMOUNT
		Alloy.Globals.updatemodelTable("creditmodel",dateMDY,dateMDY,amount,"0","0","0","0","0","0");//update local DB
		var bal = parseFloat(amount)+ parseFloat(e.source.bal);
		console.log("credit.js:: notes_textarea bal: "+bal);
		$.credit_window.bal = bal;
		$.credit_window.creditamount = amount;
		console.log("updateDummy("+bal+","+amount+")");
		updateDummy(bal,amount);
	}
});
