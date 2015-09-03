exports.openMainWindow = function(_tab) {
  _tab.open($.debit_window);
  Ti.API.info("This is child widow debit.js" +JSON.stringify(_tab));
 
};

var debitmodel = Alloy.Collections.instance('debitmodel');
debitmodel.fetch();
var content = debitmodel.toJSON();
console.log("debit.js::JSON stringify content: "+JSON.stringify(content));

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
	var dateFormat = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()+" "+Alloy.Globals.formatAMPM(date);
	$.dateLabel.text= dateFormat;
	$.donebutton.date = dateFormat;
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

//List table contents
for(i=0;i<content.length;i++){
	debitDetailAddRow(content[i].col1,content[i].col2,content[i].col3,'$'+content[i].col4);
}

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
	//Alloy.Globals.updatemodelTable("debitmodel",col1,col2,col3,col4,col5,col6,col7,col8,col9);
}

function Done(e){
	console.log("JSON stringify Done(e): "+JSON.stringify(e));
	$.notes_textarea.blur();
}

$.dateLabel.addEventListener('click',function(e){
  console.log("JSON stringify dateLabel(e): "+JSON.stringify(e));
  $.input_view.add($.date_picker);
  $.dateLabel.color="blue";
});

