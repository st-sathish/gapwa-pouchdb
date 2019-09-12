var hsDataTable = new (function() {
	var self = this;
	var datatable;

	function fetchAllDocs() {
		db.fetchAll()
        	.then(res => {
        		var docs = [];
        		var rows = res.rows;
        		rows.forEach(row => {
        			docs.push(row.doc);
        		});
        		refreshDataTable(docs);
        	})
        	.catch(err => {
        		console.error(err);
        	})
	}

	function refreshDataTable(data) {
		datatable.clear();
	    datatable.rows.add(data);
	    datatable.draw();
	}

	$(document).ready(function() {
        datatable = $('#example').DataTable({
        	'columns': [
		        { 'data': 'name' },
		        { 'data': 'phone' },
		        { 'data': 'email' }
    		]
        });
        fetchAllDocs();
	});
	return self;
})();