var hsPresenter = {} || hsPresenter;

hsPresenter.save = function(data) {
	return new Promise(function(resolve, reject) {
		data.created_at = new Date().getTime();
		data.updated_at = new Date().getTime();
		var isOnline = window.navigator.onLine;
		alert("is online :"+isOnline);
		if(isOnline) {
			alert("Please use offline save");
			return;
			hsApi.saveOrUpdateHealthSeeker(data).then(res => {
				console.log(res);
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
		} else {
			if(data.motherName == '') {
				reject("Please enter your mother name");
				return;
			}
			if(data.age == '') {
				reject("Please enter your age");
				return;
			}
			data.mode = 'offline';
			data.last_synced_at = null;
			data.do_sync = true;
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
		if(isOnline) {
			alert("Please use offline save");
			return;
			hsApi.saveOrUpdateHealthSeeker(data).then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
		} else {
			db.findOne(id)
				.then(doc => {
					doc.govt_mother_id = data.govt_mother_id;
					doc.mother_name = data.mother_name;
					doc.age = data.age;
					doc.contact = data.contact;
					doc.occupation = data.occupation;
					doc.husband_name = data.husband_name;
					doc.husband_occupation = data.husband_occupation;
					doc.health_parameter = data.health_parameter;
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
		if(isOnline) {
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
hsPresenter.getHealthSeekers = function(data) {
	return new Promise(function(resolve, reject) {
		db.fetchAll()
        	.then(rows => {
        		var docs = [];
        		for(var i =0;i < rows.length;i++) {
        			if(rows[i].doc.views) {
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