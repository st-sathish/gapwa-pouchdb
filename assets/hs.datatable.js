var hsDataTable = new (function() {
	var self = this;
	var datatable;

	self.getOfflineHealthSeekers = function() {
		initOfflineDataTable();
		hsPresenter.getOfflineHealthSeekers()
			.then(data => {
				console.log(data);
				refreshDataTable(data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	self.getOnlineHealthSeekers = function() {
		initOnlineDataTable();
		hsPresenter.getOnlineHealthSeekers()
			.then(data => {
				console.log(data);
				refreshDataTable(data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	function refreshDataTable(data) {
		datatable.clear();
	    datatable.rows.add(data);
	    datatable.draw();
	}

	function initOnlineDataTable() {
		
	}

	function initOfflineDataTable() {
		
	}

	$(document).ready(function() {
        datatable = $('#example').DataTable({
        	'columns': [
		        { 'data': 'name' },
		        { 'data': 'age' },
		        { 'data': 'mobile' }
    		]
        });
	});
	return self;
})();