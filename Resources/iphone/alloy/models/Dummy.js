var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            stuff: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "dummy"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("dummy", exports.definition, []);

collection = Alloy.C("dummy", exports.definition, model);

exports.Model = model;

exports.Collection = collection;