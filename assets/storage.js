var storage = {} || storage;

storage.KEY_HEALTH_SEEKER = 'health_seeker';

storage.saveHealthSeeker = function(data) {
	localStorage.setItem(storage.KEY_HEALTH_SEEKER, JSON.stringify(data));
}

storage.getHealthSeeker = function() {
	return JSON.parse(localStorage.getItem(storage.KEY_HEALTH_SEEKER));
}

storage.resetHealthSeeker = function(data) {
	return JSON.parse(localStorage.getItem(storage.KEY_HEALTH_SEEKER));
}