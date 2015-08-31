exports.openMainWindow = function(_tab) {
  _tab.open($.debit_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
};

function addHandler(e) {
	console.log("JSON stringify addHandler(e): "+JSON.stringify(e));
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
                left  : "20",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "10",
                text : dateadded
        });
        var datespend = Ti.UI.createLabel ({
                color : "#333",
                font : {
                	fontSize : 24
                },
                left  : "20",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "50",
                text : date.toLocaleString()
       });
        var categorylabel = Ti.UI.createLabel ({
                color : "#333",
                font : {
                	fontSize : 24
                },
                left  : "40",
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

debitDetailAddRow("1/1/2008","2/1/2015","grocery","$200.00");


