exports.definition = {
	config: {
		columns: {
		    "stuff": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "info"
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
		});

		return Collection;
	}
};