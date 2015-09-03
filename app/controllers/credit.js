exports.openMainWindow = function(_tab) {
  _tab.open($.credit_window);
  Ti.API.info("This is child widow credit.js" +JSON.stringify(_tab));
	
};

//reset var
var bal=0;

$.credit_window.addEventListener("close",function(){
	console.log("credit.js: close window");
	someDummy.fetch();
});


var creditmodel = Alloy.Collections.instance('creditmodel');
creditmodel.fetch();
var content = creditmodel.toJSON();
console.log("credit.js::JSON stringify content: "+JSON.stringify(content));

	
//List table contents
for(i=0;i<content.length;i++){
	creditDetailAddRow(content[i].col1,content[i].col2,content[i].col3,'$'+content[i].col4);
	var bal = parseFloat(content[i].col3)+ parseFloat(bal);
	console.log("main.js: content[i].col3: "+content[i].col3+" bal : "+bal);	
}
var someDummy = Alloy.Models.dummy;
console.log("credit.js :: stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();
someDummy.set('bal', bal);

function addHandler(e) {
	console.log("JSON stringify addHandler(e): "+JSON.stringify(e));
}

function setDate(e){
	console.log("JSON stringify setDate(e): "+JSON.stringify(e));
	var date = e.value;
	$.dateLabel.text= (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	$.timeLabel.text= Alloy.Globals.formatAMPM(date);
}

function creditDetailAddRow (date,dateadded,amount) {
		console.log("enterpayment.js::creditDetailAddRow: date: "+date+"  dateadded: "+dateadded+" new Date(+dateadded): "+new Date(+dateadded));
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
        
        var credittable = Ti.UI.createTableView({
                backgroundColor: "white",
                separatorStyle :"Titanium.UI.iPhone.TableViewSeparatorStyle.NONE"
        });
        credittable.add(creditrow);
        
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

function blurIT(e){
	console.log("JSON stringify blurIT(e): "+JSON.stringify(e));
	$.notes_textarea.blur();
}

$.dateLabel.addEventListener('click',function(e){
  console.log("JSON stringify dateLabel(e): "+JSON.stringify(e));
  $.input_view.add($.date_picker);
  $.dateLabel.color="#0066CC";
});

