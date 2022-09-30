exports.definition = {
    config : {
    	"URL": Alloy.Globals.endPoints.friendsGet,
        "columns": {
            "id":"INTEGER PRIMARY KEY",
            "date":"text",
        },
        "useStrictValidation":0, 
        "adapter" : {
            "type" : "sqlrest",
            "collection_name" : "peoplefriends",
            "idAttribute" : "id",
            "lastModifiedColumn": "date",
            "addModifedToUrl": true,
        },
        "headers": {
            "Accept": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
			"Pragma": "no-cache",
			"Expires": "0"
        },
        "eTagEnabled" : true,
        "deleteAllOnFetch": true,
		"initFetchWithLocalData" : false,
 		"returnErrorResponse" : true,
 		"disableSaveDataLocallyOnServerError" : true,
        "debug": 0
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};