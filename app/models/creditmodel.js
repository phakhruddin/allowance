exports.definition = {
	config: {
		columns: {
		    "col1": "TEXT",
		    "col2": "TEXT",
		    "col3": "TEXT",
		    "col4": "TEXT",
		    "col5": "TEXT",
		    "col6": "TEXT",
		    "col7": "TEXT",
		    "col8": "TEXT",
		    "col9": "TEXT"	
		},
		adapter: {
			type: "sql",
			collection_name: "creditmodel"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			deleteAll : function() {
 
				var collection = this;
				 
				var sql = "DELETE FROM " + collection.config.adapter.collection_name;
				console.log("collection deleteAll: "+sql);
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();	 
				collection.trigger('sync');
				},
				
			deleteCol1 : function(col1) {
 
				var collection = this;
				 
				var sql = "DELETE FROM " + collection.config.adapter.collection_name +" WHERE col1=\""+col1+"\"";
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();
				 
				collection.trigger('sync');
				 
				},
				 
			 saveAll : function() {
				var collection = this;
				 
				var dbName = collection.config.adapter.db_name;
				var table = collection.config.adapter.collection_name;
				var columns = collection.config.columns;
				 
				db = Ti.Database.open(dbName);
				db.execute("BEGIN;");
				 
				collection.each(function(model) {
				 
				if (!model.id) {
				model.id = guid();
				model.attributes[model.idAttribute] = model.id;
				}
				 
				var names = [], values = [], q = [];
				for (var k in columns) {
				names.push(k);
				values.push(model.get(k));
				q.push("?");
				}
				var sqlInsert = "INSERT INTO " + table + " (" + names.join(",") + ") VALUES (" + q.join(",") + ");";
				 
				db.execute(sqlInsert, values);
				 
				});
				 
				db.execute("COMMIT;");
				db.close();
				 
				collection.trigger('sync');
			}
		});

		return Collection;
	}
};