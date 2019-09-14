var hsPresenter = {} || hsPresenter;

hsPresenter.online_schema = hsPresenter.online_schema || 'online_health_seeker';
hsPresenter.offline_schema = hsPresenter.offline_schema || 'offline_health_seeker';

hsPresenter.online_health_seeker_schema_plural = hsPresenter.online_health_seeker_schema_plural || 'online_health_seekers';
hsPresenter.offline_health_seeker_schema_plural = hsPresenter.offline_health_seeker_schema_plural || 'offline_health_seekers';

hsPresenter.saveOrUpdate = function(data) {
	return new Promise(function(resolve, reject) {
		//always 1 for time being
		data.hcc_id = 1;
		hsApi.saveOrUpdateHealthSeeker(data).then(res => {
			resolve(res);
		})
		.catch(err => {
			//service unavailable so save to local db
			if(err.status == 503 || err.status == 404) {
				data.mode = 'offline';
				save(hsPresenter.offline_schema, data)
					.then(res => {
						resolve(res);
					})
					.catch(err => {
						reject(err);
					})
			} else {
				reject(err);
			}
		})
	})
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
		hsApi.getRemoteHealthSeekers('online')
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