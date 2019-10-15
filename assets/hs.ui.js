var healthseeker = new (function() {

	var self = this;

	function reset() {
		$("#gmi").val('');
		$("#mother_name").val('');
		$("#age").val('');
		$("#contact").val('');
		$("#occupation").val('');
		$("#Husband_Name").val('');
		$("#Husband_Occupation").val('');
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
		data.govt_mother_id = govtMotherId;
		data.mother_name = motherName;
		data.age = age;
		data.contact = contact;
		data.occupation = occupation;
		data.husband_name = husbandName;
		data.husband_occupation = husbandOccupation;
		var parameters = new URL(window.location).searchParams;
		var id = parameters.get("id");
		if(id) {
			template = template+'?id='+id+'&mode='+parameters.get("mode");
		}
		storage.saveHealthSeeker(data);
		location.href = '/gapwa/'+template;
	}

	function initOfflineEdit(id) {
		hsPresenter.getOfflineHealthSeeker(id)
			.then(res => {
				$("#gmi").val(res.govt_mother_id);
				$("#mother_name").val(res.mother_name);
				$("#age").val(res.age);
				$("#contact").val(res.contact);
				$("#occupation").val(res.occupation);
				$("#Husband_Name").val(res.husband_name);
				$("#Husband_Occupation").val(res.husband_occupation);
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