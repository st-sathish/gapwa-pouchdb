var hsDataTable = new (function() {
	var self = this;
	var datatable;

	function getHealthSeekers() {
		initOfflineDataTable();
		hsPresenter.getHealthSeekers()
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

	function initOfflineDataTable() {
		if(datatable) {
			datatable.destroy();
		}
		datatable = $('#offline_datatable').DataTable({
			"searching": false,
        	'columns': [
		        { 'data': 'motherName' },
		        { 'data': 'age' },
		        { 'data': 'husbandName' },
		        { 'data': 'last_synced_at' },
		        {
		        	'data' : null,
		        	'render' : function(row) {
		        	 	var action = "<div>";
		        	 	action = action + "<a href =/gapwa/edit_health_seeker.html?mode=offline&id="+row._id+">Edit</a>&nbsp;&nbsp;";
		        	 	action = action + "<a href ='javascript:void(0)' onclick='hsDataTable.sync(\""+row._id+"\")'>Sync</a>";
		        	 	action = action + "<div>";
		        	 	return action;
		        	}
		        }
    		]
        });
	}

	self.searchOffline = function() {
		var query = $("#offline_search").val();
		hsPresenter.searchHealthSeeker(query)
			.then(res => {
				console.log("search result", res);
				refreshDataTable(res);
			})
			.catch(err => {
				console.debug(err);
				alert(err);
			});
	}

	self.sync = function(id) {
		hsPresenter.sync(id)
			.then(res => {
				alert("Successfully Synced");
				location.reload();
			})
			.catch(err => {
				alert(err);
				console.debug(err);
			})
	}
	$(document).ready(function() {
        getHealthSeekers();
	});
	return self;
})();