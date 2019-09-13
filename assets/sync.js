var sync = new (function() {
	var self = this;

	function fetchAll() {
		syncMiddleware.findAll()
			.then(res => {
				console.log(res);
				$('#syn_template').jqotesubtpl('templates/sync.tpl', {data: res.sync_tables});
			})
			.catch(err => {

			})
	}

	$(document).ready(function() {
        syncMiddleware.init(fetchAll);
	});
	return self;
})();