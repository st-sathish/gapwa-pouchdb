// initialize db
var pouchDB = new PouchDB('growayuassist');

// set all schemas
pouchDB.setSchema([
  /*{
    singular: 'sync_table',
    plural: 'sync_tables'
  },*/
  {
    singular: 'online_health_seeker',
    plural: 'online_health_seekers'
  },
  {
    singular: 'offline_health_seeker',
    plural: 'offline_health_seekers'
  }/*,
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
  }*/
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

db.findAll = function(schema) {
	return new Promise(function(resolve, reject) {
		pouchDB.rel.find(schema).then(res => {
  			console.log("fetchAll()", res);
  			resolve(res);
		}).catch(err => {
  			console.log(err);
  			reject(err);
		});
	});
}