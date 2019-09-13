var api = {} || api;

var BASE_API = "http://localhost/growayuassist/";

api.postApi = function(url, payload) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: BASE_API + url,
			type: 'POST',
			data: JSON.stringify(payload),
			dataType: 'json',
			contentType: 'application/json',
			success: function(data) {
			  	resolve(data);
			},
			error: function(error) {
			  	reject(error);
			}
		});
	});
};

api.getApi = function(url) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: BASE_API + url,
			type: 'GET',
			contentType: 'application/json',
			success: function(data) {
			  	resolve(data);
			},
			error: function(error) {
			 	reject(error);
			}
		});
	});
}