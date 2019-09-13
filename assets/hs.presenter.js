var hsPresenter = {} || hsPresenter;

hsPresenter.schema = 'health_seeker';

hsPresenter.saveOrUpdate = function(data) {
	return new Promise(function(resolve, reject) {
		hsApi.saveOrUpdateHealthSeeker().then(res => {
			resolve(res);
		})
		.catch(err => {
			//service unavailable so save to local db
			if(err.status == 503) {
				db.save(hsPresenter.schema, data)
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