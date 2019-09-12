// initialize db
var pouchDB = new PouchDB('growayuassist');

var db = {} || db;

db.save = function(data) {
	return new Promise (function(resolve, reject) {
		pouchDB.post(data).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	});
}

db.update = function(data) {
	return new Promise (function(resolve, reject) {
		pouchDB.put(data).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	});
}

db.destroy = function() {
	return new Promise(function(resolve, reject) {
		pouchDB.destroy().then(res => {
			resolve(res);
		})
		.catch(err => {
			reject(err);
		})
	})
}

db.fetchAll = function() {
	return new Promise(function(resolve, reject) {
		pouchDB.allDocs({
  			include_docs: true
		}).then(function (result) {
  			console.log(result);
  			resolve(result);
		}).catch(function (err) {
  			console.log(err);
  			reject(err);
		});
	});
}