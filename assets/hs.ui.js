var healthseeker = new (function() {

	var self = this;

	function reset() {
		$("#gmi").val('');
		$("#mobile").val('');
		$("#age").val('');
		location.href = '/gapwa/offline_hs_datatable.html';
	}

	self.next = function(template) {
		var govtMotherId = $("#gmi").val();
		var motherName = $("#mother_name").val();
		var age = $("#age").val();
		var contact = $("#contact").val();
		var occupation = $("#occupation").val();
		var husbandName = $("#Husband_Name").val();
		var husbandOccupation = $("#Husband_Occupation").val();

		var data = {};
		data.govtMotherId = govtMotherId;
		data.motherName = motherName;
		data.age = age;
		data.contact = contact;
		data.occupation = occupation;
		data.husbandName = husbandName;
		data.husbandOccupation = husbandOccupation;
		var parameters = new URL(window.location).searchParams;
		var id = parameters.get("id");
		if(id) {
			data.id = id;
			template = template+'?id='+id;
		}
		storage.saveHealthSeeker(data);
		location.href = '/gapwa/'+template;
	}

	self.goBack = function() {
		window.history.back();
	}

	self.save = function() {

		var data = storage.getHealthSeeker();

		var visit_date = $("#visit_date").val();
		var height = $("#Height").val();
		var weight = $("#weight").val();
		var bp = $("#bp").val();
		var hemoglobin = $("#Hemoglobin").val();
		var blood_sugar = $("#Blood_sugar").val();
		var urine_albumin = $("#urine_albumin").val();

		// construct
		var health_parameter = {};
		health_parameter.visit_date = visit_date;
		health_parameter.height = height;
		health_parameter.weight = weight;
		health_parameter.bp = bp;
		health_parameter.hemoglobin = hemoglobin;
		health_parameter.blood_sugar = blood_sugar;
		health_parameter.urine_albumin = urine_albumin;

		data.health_parameter = health_parameter;
		hsPresenter.save(data)
			.then(res => {
				storage.resetHealthSeeker();
				alert("Successfully Saved");
				reset();
			})
			.catch(err => {
				alert(err);
				console.log(err);
			});
	}

	self.update = function() {
		var data = storage.getHealthSeeker();

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
				storage.resetHealthSeeker();
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