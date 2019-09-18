var hsPresenter = {} || hsPresenter;

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
				console.log(res);
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
		} else {
			if(data.name == '') {
				reject("Please enter your name");
				return;
			}
			if(data.age == '') {
				reject("Please enter your age");
				return;
			}
			if(data.mobile == '') {
				reject("Please enter your mobile");
				return;
			}
			data.mode = 'offline';
			data.last_synced_at = null;
			save(data)
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
			db.findOne(id)
				.then(doc => {
					doc.name = data.name;
					doc.age = data.age;
					doc.mobile = data.mobile;
					doc.updated_at = new Date().getTime();
					return update(doc);
				})
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
	return new Promise(function(resolve, reject) {
		var isOnline = window.navigator.onLine;
		if(!isOnline) {
			reject("No Internet Connection");
			return;
		}
		db.findOne(docId)
		.then(res => {
			res.mode = 'offline';
			return Promise.all([res, hsApi.saveOrUpdateHealthSeeker(res)]);
		})
		.then(([row, response]) => {
			var remoteData = response.data;
			row.health_seeker_id = remoteData.health_seeker_id;
			row.updated_at = new Date().getTime();
			row.last_synced_at = new Date().getTime();
			return update(row);
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
* Save health seeker
*/
function save(data) {
	return new Promise(function(resolve, reject) {
		db.save(data)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
	})
}

/**
* Update health seeker
*/
function update(data, option) {
	return new Promise(function(resolve, reject) {
		db.update(data, option)
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

/**
* get offline health seekers
*/
hsPresenter.getOfflineHealthSeekers = function(data) {
	return new Promise(function(resolve, reject) {
		db.fetchAll()
        	.then(rows => {
        		var docs = [];
        		for(var i =0;i < rows.length;i++) {
        			if(!rows[i].doc.name) {
        				continue;
        			}
        			docs.push(rows[i].doc);
        		}
        		resolve(docs);
        	})
        	.catch(err => {
        		console.error(err);
        	})
	})
}

hsPresenter.searchHealthSeeker = function(query) {
	return new Promise(function(resolve, reject) {
		var option = {
			'selector': { '$or': [
									{ 'name': { '$regex': RegExp(query, "i") }}, 
									{ 'mobile': { '$regex': RegExp(query, "i") }}
								]
						}
		};
		db.search(option)
        	.then(res => {
        		resolve(res.docs);
        	})
        	.catch(err => {
        		console.error(err);
        	})
	})
}

hsPresenter.getOfflineHealthSeeker = function(docId) {
	return new Promise(function(resolve, reject) {
		db.findOne(docId)
        	.then(res => {
        		resolve(res);
        	})
        	.catch(err => {
        		console.error(err);
        	})
	})
}