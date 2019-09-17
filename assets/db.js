// initialize db
var pouchDB = new PouchDB('growayuassist');


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