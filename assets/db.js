// initialize db
var pouchDB = new PouchDB('growayuassist');

var KEY_HEALTH_SEEKER_TABLE = "health_seeker_table";
var KEY_SYNC_TABLE = "sync_table";

// create index for fields
pouchDB.createIndex({
    index: {
        fields: ['name', 'mobile'],
        name: 'hsindex',
        ddoc: 'hsdoc',
        type: 'json',
    }
});

var db = {} || db;

//new db
db.save = function(data) {
    return new Promise(function(resolve, reject) {
      pouchDB.post(data)
          .then(res => {
              resolve(res);
          })
          .catch(err => {
              reject(err);
          });
    })
}

db.update = function(data, a_option) {
    return new Promise(function(resolve, reject) {
      var option = {'force': true};
      if(a_option) {
          option = Object.assign(option, a_option);
      }
      pouchDB.put(data, option)
          .then(res => {
              resolve(res);
          })
          .catch(err => {
              reject(err);
          });
    })
}

db.fetchAll = function() {
    return new Promise(function(resolve, reject) {
        var option = { include_docs: true, attachments: true };
        pouchDB.allDocs(option)
            .then(result => {
                resolve(result.rows);
            })
            .catch(err => {
                reject(err);
            });
    })
}

db.findOne = function(docId) {
    return new Promise(function(resolve, reject) {
        pouchDB.get(docId)
          .then(res => {
              resolve(res);
          })
          .catch(err => {
              reject(err);
          })
    })
}

db.search = function(option) {
    return new Promise(function(resolve, reject) {
        pouchDB.find(option).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    })
}

db.saveSyncData = function(data) {
  return new Promise(function(resolve, reject) {
      data.type = db.KEY_SYNC_TABLE;
      pouchDB.post(data).then(result => {
          resolve(result);
      }).catch(err => {
          reject(err);
      });
  })
}

db.updateSyncData = function(data) {
    return new Promise(function(resolve, reject) {
      var option = {'force': true};
      data.type = db.KEY_SYNC_TABLE;
      pouchDB.put(data, option)
          .then(res => {
              resolve(res);
          })
          .catch(err => {
              reject(err);
          });
    })
}