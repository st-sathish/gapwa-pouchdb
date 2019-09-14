var hsPresenter = {} || hsPresenter;

hsPresenter.online_schema = hsPresenter.online_schema || 'online_health_seeker';
hsPresenter.offline_schema = hsPresenter.offline_schema || 'offline_health_seeker';

hsPresenter.online_health_seeker_schema_plural = hsPresenter.online_health_seeker_schema_plural || 'online_health_seekers';
hsPresenter.offline_health_seeker_schema_plural = hsPresenter.offline_health_seeker_schema_plural || 'offline_health_seekers';

hsPresenter.saveOrUpdate = function(data) {
	return new Promise(function(resolve, reject) {
		//always 1 for time being
		data.hcc_id = 1;
		data.created_at = new Date().getTime();
		data.updated_at = new Date().getTime();
		var isOnline = window.navigator.onLine;
		if(!isOnline) {
			hsApi.saveOrUpdateHealthSeeker(data).then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
				//service unavailable so save to local db
				// if(err.status == 503 || err.status == 404) {
				// 	data.mode = 'offline';
				// 	save(hsPresenter.offline_schema, data)
				// 		.then(res => {
				// 			resolve(res);
				// 		})
				// 		.catch(err => {
				// 			reject(err);
				// 		})
				// } else {
				// 	reject(err);
				// }
			})
		} else {
			data.mode = 'offline';
			data.last_synced_at = null;
			save(hsPresenter.offline_schema, data)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		}
	})
}

hsPresenter.sync = function(docId) {
	console.debug(docId);
	return new Promise(function(resolve, reject) {
		db.findOne(hsPresenter.offline_schema, docId)
		.then(res => {
			var rows = res[hsPresenter.offline_health_seeker_schema_plural];
			return rows[0];
		})
		.then(row => {
			row.mode = 'offline';
			return hsApi.saveOrUpdateHealthSeeker(row);
		})
		.then(response => {
			return Promise.all([response.data, db.findOne(hsPresenter.offline_schema, docId)]);
		})
		.then(([remoteData, localData]) => {
			var localRow = localData[hsPresenter.offline_health_seeker_schema_plural][0];
			console.log("hello3", remoteData);
			console.log("hello3", localRow);
			//localRow.health_seeker_id = remoteData.health_seeker_id;
			//localRow.updated_at = new Date().getTime();
			//localRow.last_synced_at = new Date().getTime();
			return save(hsPresenter.offline_schema, localRow);
		})
		.then(result => {
			resolve(result);
		})
		.catch(err => {
			reject(err);
		});
	});
}

/**
* Save health seeker by schema
*/
function save(schema, data) {
	return new Promise(function(resolve, reject) {
		db.save(schema, data)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
	})
}

/**
* get online health seekers
**/
hsPresenter.getOnlineHealthSeekers = function(data) {
	return new Promise(function(resolve, reject) {
		if(!window.navigator.onLine) {
			reject("No Internet Connection");
			return;
		}
		hsApi.getRemoteHealthSeekers()
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err);
			})
	})
}

function getLocalHealthSeekers(schema, schema_plural) {
	return new Promise(function(resolve, reject) {
		db.findAll(schema)
        	.then(res => {
        		var docs = [];
        		var rows = res[schema_plural];
        		rows.forEach(row => {
        			docs.push(row);
        		});
        		resolve(docs);
        	})
        	.catch(err => {
        		console.error(err);
        	})
	})
}

/**
* get offline health seekers
*/
hsPresenter.getOfflineHealthSeekers = function(data) {
	return new Promise(function(resolve, reject) {
		getLocalHealthSeekers(hsPresenter.offline_schema, hsPresenter.offline_health_seeker_schema_plural)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
	})
}

hsPresenter.search = function(query) {
	return new Promise(function(resolve, reject) {
		var selector = {'name': {'$elemMatch': {query}}};
		console.log(selector);
		db.find(hsPresenter.offline_schema, selector)
        	.then(res => {
        		var docs = [];
        		var rows = res[hsPresenter.offline_health_seeker_schema_plural];
        		rows.forEach(row => {
        			docs.push(row);
        		});
        		resolve(docs);
        	})
        	.catch(err => {
        		console.error(err);
        	})
	})
}