var hsDataTable = new (function() {
	var self = this;
	var datatable;

	function fetchAllDocs() {
        hsPresenter.getOnlineHealthSeekers()
        	.then(data => {
        		refreshDataTable(data);
        	})
        	.catch(err => {
        		console.error(err);
        	});
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
		        { 'data': 'age' },
		        { 'data': 'mobile' }
    		]
        });
        fetchAllDocs();
	});
	return self;
})();