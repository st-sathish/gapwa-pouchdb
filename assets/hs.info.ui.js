var hs_info = new (function() {

	var self = this;

	function reset() {
		location.href = '/gapwa/offline_hs_datatable.html';
	}

	self.goBack = function() {
		storage.resetHealthSeeker();
		window.history.back();
	}

	self.save = function() {
		var data = concatFieldValue();
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

	function concatFieldValue() {
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
		return data;
	}

	function initOfflineEdit(id) {
		hsPresenter.getOfflineHealthSeeker(id)
			.then(res => {
				var data = res.health_parameter;
				$("#visit_date").val(data.visit_date);
				$("#Height").val(data.height);
				$("#weight").val(data.weight);
				$("#bp").val(data.bp);
				$("#Hemoglobin").val(data.hemoglobin);
				$("#Blood_sugar").val(data.blood_sugar);
				$("#urine_albumin").val(data.urine_albumin);
			})
			.catch(err => {
				console.debug(err);
			})
	}

	self.update = function() {
		var parameters = new URL(window.location).searchParams;
		var id = parameters.get("id");
		var data = concatFieldValue();
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