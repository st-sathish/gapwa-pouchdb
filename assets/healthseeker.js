var healthseeker = new (function() {

	var self = this;

	self.save = function() {
		var name = $("#name").val();
		var phone = $("#phone").val();
		var email = $("#email").val();

		// construct
		var data = {};
		data.name = name;
		data.phone = phone;
		data.email = email;
		db.save(data).then(res => {
			alert("success");
			$("#name").val('');
			$("#phone").val('');
			$("#email").val('');
		}).catch(err => {
			console.debug(err);
			alert("err");
		});
	}

	// call on document ready
	$(document).ready(function() {
		//initialize part
	})

	return self;
	
})();