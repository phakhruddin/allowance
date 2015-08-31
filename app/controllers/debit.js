exports.openMainWindow = function(_tab) {
  _tab.open($.debit_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
  
  $.catLabel.addEventListener('click',function(e){
  console.log("JSON stringify catLabel(e): "+JSON.stringify(e));
  $.input_view.add(picker);
  $.input_view.remove($.date_picker);
});

};

function addHandler(e) {
	console.log("JSON stringify addHandler(e): "+JSON.stringify(e));
}

function setDate(e){
	console.log("JSON stringify setDate(e): "+JSON.stringify(e));
	var date = e.value;
	$.dateLabel.text= (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()+" "+Alloy.Globals.formatAMPM(date);
}

function debitDetailAddRow (date,dateadded,category,amount) {
		console.log("enterpayment.js::debitDetailAddRow: date: "+date+"  dateadded: "+dateadded+" new Date(+dateadded): "+new Date(+dateadded));
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

debitDetailAddRow("8/22/2015","8/1/2015","Grocery","$200.00");
debitDetailAddRow("8/23/2015","8/2/2015","Book","$205.00");
debitDetailAddRow("8/24/2015","8/3/2015","Book","$301.00");
debitDetailAddRow("8/25/2015","8/4/2015","Book","$221.00");
debitDetailAddRow("8/26/2015","8/5/2015","Book","$132.00");

var picker = Ti.UI.createPicker({
  top:90
  
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
  $.catLabel.text=e.row.title;
  $.catLabel.color="blue";
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
}

function blurIT(e){
	console.log("JSON stringify blurIT(e): "+JSON.stringify(e));
	$.notes_textarea.blur();
}

$.dateLabel.addEventListener('click',function(e){
  console.log("JSON stringify dateLabel(e): "+JSON.stringify(e));
  $.input_view.add($.date_picker);
  $.dateLabel.color="blue";
});

