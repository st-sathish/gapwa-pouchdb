var hsPresenter = {} || hsPresenter;

hsPresenter.online_schema = hsPresenter.online_schema || 'online_health_seeker';
hsPresenter.offline_schema = hsPresenter.offline_schema || 'offline_health_seeker';

hsPresenter.online_health_seeker_schema_plural = hsPresenter.online_health_seeker_schema_plural || 'online_health_seekers';
hsPresenter.offline_health_seeker_schema_plural = hsPresenter.offline_health_seeker_schema_plural || 'offline_health_seekers';

hsPresenter.save = function(data) {
	return new Promise(function(resolve, reject) {
		//always 1 for time being
		data.hcc_id = 1;
		data.created_at = new Date().getTime();
		data.updated_at = new Date().getTime();
		var isOnline = window.navigator.onLine;
		alert("is online :"+isOnline);
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

hsPresenter.update = function(id, data) {
	return new Promise(function(resolve, reject) {
		var isOnline = window.navigator.onLine;
		if(!isOnline) {
			hsApi.saveOrUpdateHealthSeeker(data).then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
		} else {
			db.findOne(hsPresenter.offline_schema, id)
				.then(res => {
					return res[hsPresenter.offline_health_seeker_schema_plural][0];
				})
				.then(row => {
					console.log("update", row);
					row.name = data.name;
					row.age = data.age;
					row.mobile = data.mobile;
					row.updated_at = new Date().getTime();
					return save(hsPresenter.offline_schema, row);
				})
				.then(result => {
					resolve(result);
				})
				.catch(err => {
					reject(err);
				})
		}
	})
}

hsPresenter.sync = function(docId) {
	return new Promise(function(resolve, reject) {
		var isOnline = window.navigator.onLine;
		if(!isOnline) {
			reject("No Internet Connection");
			return;
		}
		db.findOne(hsPresenter.offline_schema, docId)
		.then(res => {
			return res[hsPresenter.offline_health_seeker_schema_plural][0];
		})
		.then(row => {
			row.mode = 'offline';
			return Promise.all([row, hsApi.saveOrUpdateHealthSeeker(row)]);
		})
		.then(([row, response]) => {
			var remoteData = response.data;
			return Promise.all([row, remoteData, db.delete(hsPresenter.offline_schema, row)]);
		})
		.then(([row, remoteData, deleteObjRes]) => {
			var data = {};
			data.health_seeker_id = remoteData.health_seeker_id;
			data.name = row.name;
			data.age = row.age;
			data.mobile = row.mobile;
			data.created_at = row.created_at;
			data.updated_at = new Date().getTime();
			data.last_synced_at = new Date().getTime();
			data.mode = remoteData.mode;
			return save(hsPresenter.offline_schema, data);
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
hsPresenter.getOnlineHealthSeekers = function() {
	return new Promise(function(resolve, reject) {
		if(!window.navigator.onLine) {
			reject("No Internet Connection");
			return;
		}
		var data = {"mode": "online"};
		hsApi.getRemoteHealthSeekers(data)
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
		var option = {
			selector: {name: {$eq: 'vikas'}},
        	sort: ['name']
		}
		var idxFields = ['name'];
		db.find(hsPresenter.offline_schema, idxFields, option)
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

hsPresenter.getOfflineHealthSeeker = function(docId) {
	return new Promise(function(resolve, reject) {
		db.findOne(hsPresenter.offline_schema, docId)
        	.then(res => {
        		var row = res[hsPresenter.offline_health_seeker_schema_plural][0];
        		console.log("get helath seeker by id", row);
        		resolve(row);
        	})
        	.catch(err => {
        		console.error(err);
        	})
	})
}