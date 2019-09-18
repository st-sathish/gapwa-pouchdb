var healthseeker = new (function() {

	var self = this;

	function reset() {
		$("#name").val('');
		$("#mobile").val('');
		$("#age").val('');
		location.href = '/gapwa/hs_datatable.html';
	}

	self.save = function() {
		var name = $("#name").val();
		var mobile = $("#mobile").val();
		var age = $("#age").val();

		// construct
		var data = {};
		data.name = name;
		data.mobile = mobile;
		data.age = age;
		hsPresenter.save(data)
			.then(res => {
				alert("Successfully Saved");
				reset();
			})
			.catch(err => {
				alert(err);
				console.log(err);
			});
	}

	self.update = function() {
		var name = $("#name").val();
		var mobile = $("#mobile").val();
		var age = $("#age").val();
		var parameters = new URL(window.location).searchParams;
		var id = parameters.get("id");
		// construct
		var data = {};
		data.name = name;
		data.mobile = mobile;
		data.age = age;
		hsPresenter.update(id, data)
			.then(res => {
				alert("Successfully Updated");
				reset();
			})
			.catch(err => {
				console.log(err);
			});
	}

	function initOfflineEdit(id) {
		hsPresenter.getOfflineHealthSeeker(id)
			.then(res => {
				$("#name").val(res.name);
				$("#mobile").val(res.mobile);
				$("#age").val(res.age);
			})
			.catch(err => {
				console.debug(err);
			})
	}

	// call on document ready
	$(document).ready(function() {
		//initialize part
		var parameters = new URL(window.location).searchParams;
		if (parameters.get("id")) {
			if(parameters.get("mode") == 'offline') {
				initOfflineEdit(parameters.get("id"));
			}
		}
	})

	return self;
	
})();