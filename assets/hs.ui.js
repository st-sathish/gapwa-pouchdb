var healthseeker = new (function() {

	var self = this;

	function reset() {
		$("#name").val('');
		$("#phone").val('');
		$("#email").val('');
		location.href = '/gapwa/healthseeker_datatable.html';
	}

	self.save = function() {
		var name = $("#name").val();
		var phone = $("#phone").val();
		var email = $("#email").val();

		// construct
		var data = {};
		data.name = name;
		data.phone = phone;
		data.email = email;
		hsPresenter.saveOrUpdate(data)
			.then(res => {
				reset();
			})
			.catch(err => {
				
			});
	}

	// call on document ready
	$(document).ready(function() {
		//initialize part
	})

	return self;
	
})();