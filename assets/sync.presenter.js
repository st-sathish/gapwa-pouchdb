var syncPresenter = {} || syncPresenter;

//sync tables;
var sync_tables = syncPresenter.sync_tables || 
	[
		{'table_name': "health_seeker", 'display_name' : 'Health Seeker'}, 
	 	{'table_name': "health_parameter_group", 'display_name' : 'Health Parameter Group'},
	 	{'table_name': "health_parameter", 'display_name' : 'Health Parameter'},
	 	{'table_name': "hcc_visit", 'display_name':'Hcc Visit'}, 
	 	{'table_name': "hs_health_parameter", 'display_name': 'Hs Health Parameter'}
	];

// schema name
syncPresenter.schema = syncPresenter.schema || "sync_table";

syncPresenter.init = function(p_callback) {
	db.findAll(syncPresenter.schema)
		.then(res => {
			if(res.sync_tables.length == 0) {
				async.mapSeries(sync_tables, function(item, callback) {
					var table = {};
					table.table_name = item.table_name;
					table.display_name = item.display_name;
					table.last_synced_at = new Date().getTime();
					table.created_at = new Date().getTime();
					table.updated_at = new Date().getTime();
					table.total_row = 0;
					table.processed_row = 0;
					return callback(null, table);
			    }, function(err, results) {
			    	console.debug("saving first time");
			    	save(results).then(response => {
			    		p_callback();
			    	})
			    	.catch(err => {

			    	})
			    });
			} else {
				console.debug("get it from cache second time");
				p_callback();
			}
		})
		.catch(err => {

		});
}

function save(tables) {
	return new Promise(function(resolve, reject) {
		async.mapSeries(tables, function(item, callback) {
			db.save(syncPresenter.schema, item).then(res => {
				return callback(null, item);
			}).catch(err => {
				return err;
			});
		}, function(err, results) {
			if(err) {
				reject(err);
				return;
			}
			resolve(results);
		})
	})
}

syncPresenter.findAll = function() {
	return new Promise(function(resolve, reject) {
		db.findAll(syncPresenter.schema).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	});
}

