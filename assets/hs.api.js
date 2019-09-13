var hsApi = {} || hsApi;

hsApi.saveOrUpdateHealthSeeker = function(data) {
	return new Promise(function(resolve, reject) {
		var url = "/offline/save_update_healthseeker.php";
		api.postApi(url, payload).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		})
	})
}

hsApi.downstreamHealthSeeker = function(data) {
	return new Promise(function(resolve, reject) {
		var url = "/offline/downstream_healthseeker.php";
		api.postApi(url, payload).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		})
	})
}

hsApi.upstreamHealthSeeker = function(data) {
	return new Promise(function(resolve, reject) {
		var url = "/offline/upsream_healthseeker.php";
		api.postApi(url, payload).then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		})
	})
}