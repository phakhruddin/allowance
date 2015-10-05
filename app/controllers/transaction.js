console.log("transaction.js")
var content=[]; //reset content value
function debitDetailAddRow (date,dateadded,category,amount) {
		console.log("transaction.js::debitDetailAddRow: date: "+date+"  dateadded: "+dateadded);
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
        
      $.transaction_table.appendRow(debitrow);
};

//fething DB and redraw table
function redrawTable(){
	var content=Alloy.Globals.fetchingData('debitmodel');
	console.log("transaction.js::JSON stringify content: "+JSON.stringify(content));
	if(content.length>10){var oldest=parseFloat(content.length-10);} else var oldest=0; // display only last 10 xsaction
	for(i=(content.length-1);i>oldest;i--){
		debitDetailAddRow(content[i].col1,content[i].col2,content[i].col3,content[i].col4); //display row
	}
	var content=[];
}

redrawTable();

var refresh = Ti.UI.createRefreshControl({
    tintColor:'orange'
});

$.transaction_table.refreshControl=refresh;

refresh.addEventListener('refreshstart',function(e){
	setTimeout(function(){
        console.log('transaction::refresh:: JSON.stringify(e): '+JSON.stringify(e));
        $.transaction_table.setData([]);//reset table view before refresh
        //var content=Alloy.Globals.fetchingData('debitmodel');
		//console.log("transaction.js::JSON stringify content: "+JSON.stringify(content));
		redrawTable();//redraw table
        refresh.endRefreshing();
    }, 2000);
    var content=[];
});