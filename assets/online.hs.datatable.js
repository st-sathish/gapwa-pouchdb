var hsDataTable = new (function() {
	var self = this;
	var datatable;

	function getOnlineHealthSeekers() {
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
			"searching": false,
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

	$(document).ready(function() {
        getOnlineHealthSeekers();
	});
	return self;
})();