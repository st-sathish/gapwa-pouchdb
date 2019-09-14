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
				alert(err);
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
		        { 'data': 'mobile' },
		        {
		        	'data' : null,
		        	'render' : function(row) {
		        	 	var action = "<div>";
		        	 	action = action + "<a href ='#'>Edit</a>&nbsp;&nbsp;";
		        	 	action = action + "<a href ='javascript:void(0)' onclick='hsPresenter.sync(\""+row.rev+"\")'>Sync</a>";
		        	 	action = action + "<div>";
		        	 	return action;
		        	}
		        }
    		]
        });
	});
	return self;
})();