var hsPresenter = {} || hsPresenter;

hsPresenter.schema = hsPresenter.schema || 'health_seeker';

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
				saveLocalDB(data)
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

function saveLocalDB(data) {
	return new Promise(function(resolve, reject) {
		db.save(hsPresenter.schema, data)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
	});
}

hsPresenter.findAll = function(data) {
	return new Promise(function(resolve, reject) {
		
	})
}