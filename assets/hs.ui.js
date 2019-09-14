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
		hsPresenter.saveOrUpdate(data)
			.then(res => {
				alert("Successfully Saved");
				reset();
			})
			.catch(err => {
				console.log(err);
			});
	}

	// call on document ready
	$(document).ready(function() {
		//initialize part
	})

	return self;
	
})();