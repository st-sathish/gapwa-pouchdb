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
		if(datatable) {
			datatable.destroy();
		}
		$('#online').css("display", "block");
		$('#offline').css("display", "none");
		datatable = $('#online_datatable').DataTable({
        	'columns': [
		        { 'data': 'name' },
		        { 'data': 'age' },
		        { 'data': 'mobile' },
		        {
		        	'data' : null,
		        	'render' : function(row) {
		        		console.debug(row);
		        	 	var action = "<div>";
		        	 	action = action + "<a href =/gapwa/edit_health_seeker.html?mode=online&id="+row.health_seeker_id+">Edit</a>&nbsp;&nbsp;";
		        	 	action = action + "<div>";
		        	 	return action;
		        	}
		        }
    		]
        });
	}

	function initOfflineDataTable() {
		if(datatable) {
			datatable.destroy();
		}
		$('#online').css("display", "none");
		$('#offline').css("display", "block");
		datatable = $('#offline_datatable').DataTable({
        	'columns': [
		        { 'data': 'doc.name' },
		        { 'data': 'doc.age' },
		        { 'data': 'doc.mobile' },
		        { 'data': 'doc.last_synced_at' },
		        {
		        	'data' : null,
		        	'render' : function(row) {
		        	 	var action = "<div>";
		        	 	action = action + "<a href =/gapwa/edit_health_seeker.html?mode=offline&id="+row.doc._id+">Edit</a>&nbsp;&nbsp;";
		        	 	action = action + "<a href ='javascript:void(0)' onclick='hsDataTable.sync(\""+row.doc._id+"\")'>Sync</a>";
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
				//refreshDataTable();
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
        
	});
	return self;
})();