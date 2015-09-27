// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//MasterRecord
Titanium.App.Properties.setString('mastersid','16QfBs8Yn5ukMlVF8Tdl1iRzk2Uplwtop0ZSz2ktRZTE');
Alloy.Globals.clientId = "120519987740-374ldi5ngogurkrt42sjfmpgs6pjepe6.apps.googleusercontent.com";
Alloy.Globals.name = Titanium.App.Properties.getString('name',"Please set name").replace(/ /g,"_");;
Alloy.Globals.emailid = Titanium.App.Properties.getString('emailid',"Please enter email address");
Alloy.Globals.license = "demo";
var bootstrapid =  "1mcGGarLWUy83OXdexMili5ghQ-sGBkJFSMZysU8vF-k";

//Grab bootstrap variable
Alloy.Globals.getMaster = function() {
	var url="https://spreadsheets.google.com/feeds/list/"+bootstrapid+"/od6/public/basic?hl=en_US&alt=json";
	var xhr = Ti.Network.createHTTPClient({
		    onload: function(ee) {
			    	json = JSON.parse(this.responseText);
			    	console.log("Alloy.Globals.updateType : this.responseText: "+this.responseText);
			    	console.log("Alloy.Globals.updateType : json: "+json);
			    	var out = '{ "poi" : ['+"\n";
			    	for (var i=0; i < json.feed.entry.length; i++) {
			    		var col1 = json.feed.entry[i].title.$t.trim();
						var col2= json.feed.entry[i].content.$t.split(',')[0].split(':')[1].trim() || "none";
						if(col1 && col2){
							eval("Titanium.App.Properties.setString(\""+col1+"\",col2)");
							if(col1=="publicrepo"){Titanium.App.Properties.setString("publicrepo",col2);};
							if(col1=="privaterepo"){Titanium.App.Properties.setString("privaterepo",col2);};
							if(col1=="userindex1"){Titanium.App.Properties.setString("userindex1",col2);};
							console.log("alloy::getMaster:: Titanium.App.Properties.getString("+col1+"): "+eval("Titanium.App.Properties.getString(col1)"));
							console.log("alloy::getMaster:: Titanium.App.Properties.getString(publicrepo): "+Titanium.App.Properties.getString("publicrepo"));						}						
						if ( i == (json.feed.entry.length - 1)) {
							out += '{ "col1" : "'+col1+'" , "col2" : "'+col2+'" }]}'+"\n";
						} else {
							out += '{ "col1" : "'+col1+'" , "col2" : "'+col2+'" },'+"\n";
						}
			    	}
					Alloy.Globals.writeFile(out,"master.json");
					var json = out;		    
			}	
		});	
		console.log("alloy::getMaster:url :"+url);		
		xhr.open("GET", url);
		xhr.send();
};

//AMPM
Alloy.Globals.formatAMPM = function(date){
	var hours = date.getHours();
  	var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
};

//Google Authorization stanza
var scope = ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/drive'];
scope.push ("https://www.googleapis.com/auth/drive.appdata");
scope.push ("https://www.googleapis.com/auth/drive.apps.readonly");
scope.push ("https://www.googleapis.com/auth/drive.file");
scope.push ("https://www.googleapis.com/auth/plus.login");
scope.push ("https://www.googleapis.com/auth/userinfo.profile");
scope.push ("https://www.googleapis.com/auth/userinfo.email");
Alloy.Globals.scope = scope;
Alloy.Globals.GoogleAuth = require('googleAuth');
Alloy.Globals.googleAuthSheet = new Alloy.Globals.GoogleAuth({
	clientId : Alloy.Globals.clientId,
	propertyName : 'googleToken',
	scope : Alloy.Globals.scope,
	quiet: false
});

Alloy.Globals.checkgoogleisAuthorized = function() {
	Alloy.Globals.googleAuthSheet.isAuthorized(function() {
		console.log('Access Token: ' + Alloy.Globals.googleAuthSheet.getAccessToken());
		Titanium.App.Properties.setString('needAuth',"false");
	}, function() {
		console.log('isAuthorized:NOT:Fr Alloy.Globals.checkgoogleisAuthorized:: Authorized first, see next window: '+(new  Date()));
		Titanium.App.Properties.setString('needAuth',"true");
		Alloy.Globals.googleAuthSheet.authorize();
	});
};

console.log("Ti.Filesystem.tempDirectory: "+Ti.Filesystem.tempDirectory);
Alloy.Globals.writeFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.write(content+"\n");
};

//download json data from published google spreadsheet
Alloy.Globals.updatemodelTable = function(type,col1,col2,col3,col4,col5,col6,col7,col8,col9) {
	console.log("Alloy.Globals.updatemodelTable: type: "+type+" :col1: "+col1);
	var model = Alloy.createModel(type,{
		col1 : col1,
		col2 : col2,
		col3 : col3,
		col4 : col4,
		col5 : col5,
		col6 : col6,
		col7 : col7,
		col8 : col8,
		col9 : col9
	});			
	model.save();
};

//update local sqllite DB
Alloy.Globals.updateType = function(url,type) {
	console.log("Alloy.Globals.updateType: type: "+type+" :url: "+url);
	var xhr = Ti.Network.createHTTPClient({
		    onload: function(ee) {
		    		eval("Alloy.Collections."+type+".deleteAll()"); // cleanup data. overwrite existing.
			    	json = JSON.parse(this.responseText);
			    	console.log("Alloy.Globals.updateType : json: "+json);
			    	var out = '{ "poi" : ['+"\n";
			    	for (var i=0; i < json.feed.entry.length; i++) {
			    		var col1 = json.feed.entry[i].title.$t.trim();
						var col2= json.feed.entry[i].content.$t.split(',')[0].split(':')[1].trim() || "none";
						var col3 = json.feed.entry[i].content.$t.split(',')[1].split(':')[1].trim() || "none";
						var col4 = json.feed.entry[i].content.$t.split(',')[2].split(':')[1].trim() || "none";
						var col5 = json.feed.entry[i].content.$t.split(',')[3].split(':')[1].trim() || "none";
						var col6 = json.feed.entry[i].content.$t.split(',')[4].split(':')[1].trim() || "none";
						var col7 = json.feed.entry[i].content.$t.split(',')[5].split(':')[1].trim() || "none";
						var col8= json.feed.entry[i].content.$t.split(',')[6].split(':')[1].trim() || "none";
						var col9=  json.feed.entry[i].content.$t.split(',')[7].split(':')[1].trim() || "none";
						Alloy.Globals.updatemodelTable(type,col1,col2,col3,col4,col5,col6,col7,col8,col9);	
						if ( i == (json.feed.entry.length - 1)) {
							out += '{ "col1" : "'+col1+'" , "col2" : "'+col2+'" , "col3" : "'+col3+'"  , "col4" : "'+col4+'" , "col5" : "'+col5+'" , "col6" : "'+col6+'" , "col7" : "'+col7+'" , "col8" : "'+col8+'" , "col9" : "'+col9+'" }]}'+"\n";
						} else {
							out += '{ "col1" : "'+col1+'" , "col2" : "'+col2+'" , "col3" : "'+col3+'"  , "col4" : "'+col4+'" , "col5" : "'+col5+'" , "col6" : "'+col6+'" , "col7" : "'+col7+'" , "col8" : "'+col8+'" , "col9" : "'+col9+'" },'+"\n";
						}
			    	}
					Alloy.Globals.writeFile(out,type+".json");
					var json = out;		    
			}	
		});			
		xhr.open("GET", url);
		xhr.send();
};

//Fetching Data Global Function
Alloy.Globals.fetchingData = function(type){
	eval("var "+type+" = Alloy.Collections.instance(type);");
	eval(type+".fetch();");
	eval("var content = "+type+".toJSON();");
	return content;
};

Alloy.Globals.setBalColor = function(bal) {
	if ( bal > 0 ) {
			(bal>100)?color="#00CC00":color="#FF8800";
		} else var color = "#FF0000";
		return color;
};


Alloy.Globals.populatesidtoDB = function(filename,sid) {
	var needupdate = "yes";
	var thesid = Alloy.Collections.instance('sid');
	thesid.fetch();
    if (thesid.length > 0) {
    	var sidjson = thesid.toJSON();
    	for( var i=0; i < sidjson.length; i++ ){
    		var oldsid = sidjson[i].col2.trim();
    		console.log("alloy.js::populatesidtoDB::compare sid : "+oldsid+" vs. "+sid);
    		if ( sid == oldsid ){
    			var needupdate = "no";
    			console.log("alloy.js::populatesidtoDB::needupdate: "+needupdate+" , abort!");
    			return;
    		} 
    	}
    }   
       	if (needupdate == "yes"){
		    var dataModel = Alloy.createModel("sid",{
	            col1 :  filename || "none",
	            col2 : sid || "none",
	            col3 : "none",
	            col4 : "none"
	    	});
    		dataModel.save();
    	}; 	
	thesid.fetch();
	Ti.API.info(" alloy.js::populatesidtoDB::needupdate "+needupdate+" with thesid: "+thesid.length+" : "+JSON.stringify(thesid));
	};
	
Alloy.Globals.setPrivate = function(sid){
	console.log("alloy.js::setPrivate:folder/file with id: "+sid);
	var jsonpost = '{'
		+'\"copyable\": \"false\",'
		+'\"shareable\": \"true\",'
		+'\"shared\": \"false\"'
		+'}';
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		Ti.API.info("alloy::setPrivate::response is: "+this.responseText);
	    		var json = JSON.parse(this.responseText);
	    		var sid = json.id;
	    		Titanium.App.Properties.setString('sid',sid);
	    		console.log("alloy::setPrivate::sid : "+sid);
	    	} catch(e){
				Ti.API.info("alloy::setPrivate::cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		console.log("alloy::setPrivate::::Unable.");
	};
	xhr.open("PUT", "https://www.googleapis.com/drive/v2/files/"+sid);	
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
    console.log("alloy::setPrivate::json post: "+jsonpost);
	xhr.send(jsonpost);	
};

Alloy.Globals.createFolder = function(name,parentid){
	Alloy.Globals.checkgoogleisAuthorized();
	var foldername = name+"_dir";
	console.log("alloy.js::create folder with folder: "+foldername+" and parentid: "+parentid);
	var jsonpost = '{'
		 +'\"title\": \"'+foldername+'\",'
		 +'\"parents\": ['
		  +'{'
		   +'\"id\": \"'+parentid+'\"'
		 +' }'
		 +'],'
		 +'\"mimeType\": \"application/vnd.google-apps.folder\",'
		 +'\"shared\": \"false\"'
		+'}';
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		Ti.API.info("response is: "+this.responseText);
	    		var json = JSON.parse(this.responseText);
	    		var sid = json.id;
	    		Alloy.Globals.populatesidtoDB(foldername,sid);
	    		Titanium.App.Properties.setString('sid',sid);
	    		console.log("alloy.js::sid : "+sid+" setting it to private ");
	    		Alloy.Globals.setPrivate(sid);
	    		var ssindexname = name+"_index";  		
	    		Alloy.Globals.createSpreadsheet(ssindexname,sid,"yes");
	    		/*
	    		Alloy.Globals.createSpreadsheet(name+"_credit",sid,"no");
	    		Alloy.Globals.updateSpreadsheet(indexsid,name+"_credit",creditsid,"0","0","0","0","0","0");
	    		Alloy.Globals.createSpreadsheet(name+"_debit",sid,"no");
	    		Alloy.Globals.updateSpreadsheet(indexsid,name+"_debit",debitsid,"0","0","0","0","0","0");*/
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("projectdetail::createFolder::Unable to create Folder.");
		console.log("projectdetail::createFolder::Unable to createFolder with "+foldername+".");
	};
	xhr.open("POST", 'https://www.googleapis.com/drive/v2/files');	
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
    console.log("alloy.js::json post: "+jsonpost);
	xhr.send(jsonpost);
};

Alloy.Globals.createPubFolder = function(filename,parentid){
	console.log("alloy.js::create ss with filename: "+filename+" and parentid: "+parentid);
	var jsonpost = '{'
		 +'\"title\": \"'+filename+'\",'
		 +'\"parents\": ['
		  +'{'
		   +'\"id\": \"'+parentid+'\"'
		 +' }'
		 +'],'
		 +'\"mimeType\": \"application/vnd.google-apps.folder\"'
		+'}';
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		Ti.API.info("response is: "+this.responseText);
	    		var json = JSON.parse(this.responseText);
	    		var sid = json.id;
	    		Alloy.Globals.populatesidtoDB(filename,sid);
	    		Titanium.App.Properties.setString('sid',sid);
	    		console.log("alloy.js::sid : "+sid);
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("projectdetail::createFolder::Unable to create Folder.");
		console.log("projectdetail::createFolder::Unable to createFolder with "+filename+".");
	};
	xhr.open("POST", 'https://www.googleapis.com/drive/v2/files');	
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
    console.log("alloy.js::json post: "+jsonpost);
	xhr.send(jsonpost);
};

Alloy.Globals.populateSpreadsheetHeader = function(sid,rowno,colno,edithref,selfhref,value){ 
		var xmldatastring = ['<entry xmlns=\'http://www.w3.org/2005/Atom\' '
 		+' xmlns:gs=\'http://schemas.google.com/spreadsheets/2006\'>'
 		+'<id>'+selfhref+'</id>'
 		+'<link rel=\'edit\' type=\'application/atom+xml\''
 		+' href=\''+edithref+'\'/>'
 		+'<gs:cell row=\''+rowno+'\' col=\''+colno+'\' inputValue=\''+value+'\'>'
 		+'</gs:cell>'
 		+'</entry>'].join('');
 		console.log("alloy.js::xmldatastring: "+xmldatastring);
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
        alert("alloy::Alloy.Globals.populateSpreadsheetHeader::Unable to communicate to the cloud. Please try again"); 
    }
});
        xhr.open("PUT", ''+edithref+'');
        xhr.setRequestHeader("Content-type", "application/atom+xml");
        xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
        xhr.send(xmldatastring);
        Ti.API.info('done POSTed');
};

Alloy.Globals.getSSCell = function(sid,rowno,colno,value) {
	var pos = "R"+rowno+"C"+colno;
	console.log("alloy.js::get SS Cell on :  https://spreadsheets.google.com/feeds/cells/"+sid+"/od6/private/full/"+pos);
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var xml = Titanium.XML.parseString(this.responseText);
	    		Ti.API.info("Alloy.Globals.getSSCell:: response is: "+this.responseText);
	    		Ti.API.info("Alloy.Globals.getSSCell:: xml response is: "+xml);
	    		var entry = xml.documentElement.getElementsByTagName("entry");
	    		var link = xml.documentElement.getElementsByTagName("link");
	    		console.log("alloy.js:: number of link found: " +link+ " length: "+link.length);
	    		for (i=0;i<link.length;i++){			
	    			var listitem = link.item(i);
	    			if (listitem.getAttribute("rel") == "edit"){ var edithref = listitem.getAttribute("href");}
	    			if (listitem.getAttribute("rel") == "self"){ var selfhref = listitem.getAttribute("href");}
	    		}
	    		Ti.API.info("self href is : "+selfhref);
				Ti.API.info("edit href is : "+edithref);
	    		Alloy.Globals.populateSpreadsheetHeader(sid,rowno,colno,edithref,selfhref,value);	    				    			
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("projectdetail::Alloy.Globals.getSSCell::Unable to connect to the cloud. "+e);
	};
	xhr.open("GET", 'https://spreadsheets.google.com/feeds/cells/'+sid+'/od6/private/full/'+pos);
	xhr.setRequestHeader("Content-type", "application/atom+xml");
    xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send();
};

Alloy.Globals.updateSpreadsheet = function(sid,col1,col2,col3,col4,col5,col6,col7,col8,col9){
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+col1+'</gsx:col1><gsx:col2>'+col2+'</gsx:col2><gsx:col3>'
	+col3+'</gsx:col3><gsx:col4>'+col4+'</gsx:col4><gsx:col5>'
	+col5+'</gsx:col5><gsx:col6>'+col6+'</gsx:col6><gsx:col7>'+col7+'</gsx:col7><gsx:col8>'+col8+'</gsx:col8><gsx:col9>'+col9
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
        alert("alloy.js::updateSpreadsheet::Unable to communicate to the cloud. Please try again"); 
    }
});
	xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+sid+'/od6/private/full');
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send(xmldatastring);
	Ti.API.info('done POSTed');
};

Alloy.Globals.createSpreadsheet = function(filename,parentid,isinit){
	console.log("alloy.js::create ss with filename: "+filename+" and parentid: "+parentid);
	var jsonpost = '{'
		 +'\"title\": \"'+filename+'\",'
		 +'\"parents\": ['
		  +'{'
		   +'\"id\": \"'+parentid+'\"'
		 +' }'
		 +'],'
		 +'\"mimeType\": \"application/vnd.google-apps.spreadsheet\"'
		+'}';
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		Ti.API.info("response is: "+this.responseText);
	    		var json = JSON.parse(this.responseText);
	    		var sid = json.id;
	    		Alloy.Globals.populatesidtoDB(filename,sid);
	    		Titanium.App.Properties.setString('sid',sid); // 1st sid created.
	    		// Populate Header
    			for (i=1;i<10;i++){
					var value = "col"+i;
					Alloy.Globals.getSSCell(sid,1,i,value);
				}
				if (isinit == "yes") {
					Alloy.Globals.getSSCell(sid,2,1,"parentid");
					Alloy.Globals.getSSCell(sid,2,2,parentid);
					Alloy.Globals.getSSCell(sid,3,1,filename);
					Alloy.Globals.getSSCell(sid,3,2,sid);
	    		}		
	    		console.log("alloy.js::sid : "+sid);
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("projectdetail::createSpreadsheet::Unable to create spreadsheet.");
		console.log("projectdetail::createSpreadsheet::Unable to createSpreadsheet with "+filename+".");
	};
	xhr.open("POST", 'https://www.googleapis.com/drive/v2/files');	
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
    console.log("alloy.js::json post: "+jsonpost);
	xhr.send(jsonpost);
};

Alloy.Globals.locateIndexCreateSpreadsheet = function(name){
		Alloy.Globals.checkgoogleisAuthorized();
		var jsonlist = " ";
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var jsonlist = JSON.parse(this.responseText);
	    		Ti.API.info("Alloy.Globals.locateIndexCreateSpreadsheet::response of jsonlist is: "+JSON.stringify(jsonlist));	
	    	} catch(e){
				Ti.API.info("Alloy.Globals.locateIndexCreateSpreadsheet::cathing e: "+JSON.stringify(e));
			}
			console.log("alloy.js::Alloy.Globals.locateIndexCreateSpreadsheet::jsonlist.items.length: "+jsonlist.items.length);
			if (jsonlist.items.length == "0" ){
				console.log("alloy.js::Alloy.Globals.locateIndexCreateSpreadsheet::File DOES NOT EXIST");
				var fileexist = "false";
				Titanium.App.Properties.setString("status","failed"); 	
			} else {
				var fileexist = "true";
				var indexsid = jsonlist.items[0].id;
				var parentid = jsonlist.items[0].parents[0].id;
				console.log("alloy.js::Alloy.Globals.locateIndexCreateSpreadsheet::File exist. indexsid is: "+indexsid+" parentid:"+parentid);
				// Create Credit and Debit START
				//var filenamearray = [name+"_debit",name+"_credit"];
				function createDebitCredit(filename,parentid,indexsid) {
					var xhr1 = Ti.Network.createHTTPClient({
					onload:function(e){
						var fileexistjsonlist = JSON.parse(this.responseText);
						Ti.API.info("Alloy.Globals.locateIndexCreateSpreadsheet::response of fileexistjsonlist is: "+JSON.stringify(fileexistjsonlist));
						if (fileexistjsonlist.items.length == "0" ){
							console.log("alloy.js::Alloy.Globals.locateIndexCreateSpreadsheet::file "+filename+" does not exist, continue");
							console.log("alloy.js::create ss with filename: "+filename+" and parentid: "+parentid);
							var jsonpost = '{'
								 +'\"title\": \"'+filename+'\",'
								 +'\"parents\": ['
								  +'{'
								   +'\"id\": \"'+parentid+'\"'
								 +' }'
								 +'],'
								 +'\"mimeType\": \"application/vnd.google-apps.spreadsheet\"'
								+'}';
							var xhr2 = Ti.Network.createHTTPClient({
						    onload: function(e) {
							    try {
							    		Ti.API.info("response is: "+this.responseText);
							    		var json = JSON.parse(this.responseText);
							    		var sid = json.id;
							    		var filename = json.title;
							    		Alloy.Globals.populatesidtoDB(filename,sid); //populate sid db.
							    		console.log("alloy.js::Alloy.Globals.locateIndexCreateSpreadsheet::updateSpreadsheet filename: "+filename+" and sid: "+sid);
							    		Alloy.Globals.updateSpreadsheet(indexsid,filename,sid,"0","0","0","0","0","0","0"); //update the index ss with sid
							    		Titanium.App.Properties.setString('sid',sid); // 1st sid created.
							    		// Populate Header
						    			for (i=1;i<10;i++){
											var value = "col"+i;
											Alloy.Globals.getSSCell(sid,1,i,value);
										}		
							    		console.log("alloy.js::sid : "+sid);
							    	} catch(e){
										Ti.API.info("cathing e: "+JSON.stringify(e));
									}
								}
							});
							xhr2.onerror = function(e){
								alert("projectdetail::createSpreadsheet::Unable to create spreadsheet.");
								console.log("projectdetail::createSpreadsheet::Unable to createSpreadsheet with "+filename+".");
							};
							xhr2.open("POST", 'https://www.googleapis.com/drive/v2/files');	
							xhr2.setRequestHeader("Content-type", "application/json");
						    xhr2.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
						    console.log("alloy.js::json post: "+jsonpost);
							xhr2.send(jsonpost);
							// Create Credit and Debit END								
						} else {
							console.log("alloy.js::Alloy.Globals.locateIndexCreateSpreadsheet::file "+filename+" EXIST !! Abort...");									
						}
					}							
				});	
				var rawquerystring1 = '?q=title+%3D+\''+filename+'\'+and+mimeType+%3D+\'application%2Fvnd.google-apps.spreadsheet\'+and+trashed+%3D+false&fields=items(id%2CmimeType%2Clabels%2Cparents%2Ctitle)';	
				xhr1.open("GET", 'https://www.googleapis.com/drive/v2/files'+rawquerystring1);
				xhr1.setRequestHeader("Content-type", "application/json");
			    xhr1.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
				xhr1.send();	
					
				}
				createDebitCredit(name+"_debit",parentid,indexsid);
				createDebitCredit(name+"_credit",parentid,indexsid);
/*
				for (i=0;i<filenamearray.length;i++){	
					var filename = filenamearray[i];	
					console.log("alloy.js::check if ss with filename: "+filename+" exists ");	
	
				}*/
				Titanium.App.Properties.setString("status","passed"); 	
			};
		}
		});
	xhr.onerror = function(e){
		alert("alloy.js::locateIndexCreateSpreadsheet:Unable to connect to the cloud.");
		Alloy.Globals.Status ={ "success" : "failed"};
		Titanium.App.Properties.setString("status","failed");	
	};
	var filename = name+"_index";
	var rawquerystring = '?q=title+%3D+\''+filename+'\'+and+mimeType+%3D+\'application%2Fvnd.google-apps.spreadsheet\'+and+trashed+%3D+false&fields=items(id%2CmimeType%2Clabels%2Cparents%2Ctitle)';
	xhr.open("GET", 'https://www.googleapis.com/drive/v2/files'+rawquerystring);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send();
	console.log("alloy.js::::JSON.stringify(Alloy.Globals.Status) :"+JSON.stringify(Alloy.Globals.Status)+" Titanium.App.Properties.getString(\"status\"): " +Titanium.App.Properties.getString("status"));	
};
