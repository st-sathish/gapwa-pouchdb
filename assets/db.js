// initialize db
var pouchDB = new PouchDB('growayuassist');

// set all schemas
pouchDB.setSchema([
  {
    singular: 'sync_table',
    plural: 'sync_tables'
  },
  {
    singular: 'health_seeker',
    plural: 'health_seekers'
  },
  {
    singular: 'health_parameter_group',
    plural: 'health_parameter_groups'
  },
  {
    singular: 'health_parameter',
    plural: 'health_parameters',
    relations: {
      health_parameter_group: {belongsTo: 'health_parameter_group'}
    }
  },
  {
    singular: 'hcc_visit',
    plural: 'hcc_visits',
    relations: {
      health_seeker: {belongsTo: 'health_seeker'}
    }
  },
  {
    singular: 'hs_health_parameter',
    plural: 'hs_health_parameters',
    relations: {
      health_seeker: {belongsTo: 'health_seeker'},
      hcc_visit: {belongsTo: 'hcc_visit'}
    }
  }
]);

var db = {} || db;

db.save = function(schema, data) {
	return new Promise (function(resolve, reject) {
		pouchDB.rel.save(schema, data).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	});
}

db.update = function(schema, id, data) {
	return new Promise (function(resolve, reject) {
		pouchDB.rel.find(schema, id)
			.then(res => {
				db.save(schema, data).then(res => {

				})
				.catch(err => {

				});
			}).catch(err => {

			});
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

db.fetchAll = function(schema) {
	return new Promise(function(resolve, reject) {
		pouchDB.rel.find(schema).then(function (result) {
  			console.log("fetchAll()", result);
  			resolve(result);
		}).catch(function (err) {
  			console.log(err);
  			reject(err);
		});
	});
}

db.find = function(schema, selector) {
	return new Promise(function(resolve, reject) {
		pouchDB.rel.find(schema, selector).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	})
}