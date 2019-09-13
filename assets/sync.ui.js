var sync = new (function() {
	var self = this;

	function fetchAll() {
		syncPresenter.findAll()
			.then(res => {
				console.log(res);
				$('#syn_template').jqotesubtpl('templates/sync.tpl', {data: res.sync_tables});
			})
			.catch(err => {

			})
	}

	$(document).ready(function() {
        syncPresenter.init(fetchAll);
	});
	return self;
})();