var syncMiddleware = {} || syncMiddleware;

//sync tables;
syncMiddleware.sync_tables = syncMiddleware.sync_tables || 
	[
		{'table_name': "health_seeker", 'display_name' : 'Health Seeker'}, 
	 	{'table_name': "health_parameter_group", 'display_name' : 'Health Parameter Group'},
	 	{'table_name': "health_parameter", 'display_name' : 'Health Parameter'},
	 	{'table_name': "hcc_visit", 'display_name':'Hcc Visit'}, 
	 	{'table_name': "hs_health_parameter", 'display_name': 'Hs Health Parameter'}
	];

// schema name
syncMiddleware.schema = syncMiddleware.schema || "sync_table";

syncMiddleware.init = function(callback) {
	syncMiddleware.sync_tables.forEach(function(item) {
		var table = {};
		table.table_name = item.table_name;
		table.display_name = item.display_name;
		table.last_synced_at = new Date().getTime();
		table.created_at = new Date().getTime();
		table.updated_at = new Date().getTime();
		table.total_row = 0;
		table.processed_row = 0;

		//save
		db.save(syncMiddleware.schema, table).then(res => {
			
		}).catch(err => {
			
		});
	});
	// callback once successfully initialized
	callback();
}

syncMiddleware.findAll = function() {
	return new Promise(function(resolve, reject) {
		db.fetchAll(syncMiddleware.schema).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	});
}

