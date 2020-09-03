Draw.loadPlugin(function(ui) {
	// Adds resource for action
	mxResources.parse('uploadDEXagram=Upload DEXagram...');

	// Adds action
	ui.actions.addAction('uploadDEXagram', function() {
		let svg = ui.editor.graph.getSvg("#ffffff", 2, null);
		let xml = mxUtils.getXml(svg);
		/* let page = ui.currentPage;
		mxUtils.post("http://gilator.com:4445/upload/", xml, function(req) {
			if (page === ui.currentPage) {
				var dlg = new EmbedDialog(ui, 'Code: ' + req.getStatus() + '\n' + xml,
					null, null, null, 'Upload status:');
				ui.showDialog(dlg.container, 440, 240, true, true);
				dlg.init();
			}
		}, function(err) {
			editorUi.handleError(err);
		}); */
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			let DONE = this.DONE || 4;
			if(this.readyState === DONE){
				var dlg = new EmbedDialog(ui, this.responseText,
					null, null, null, 'Upload status:');
				ui.showDialog(dlg.container, 440, 240, true, true);
				dlg.init();
			}
		};
		xmlhttp.open("POST", "http://gilator.com:4445/upload/", true);
		xmlhttp.send(xml);
	});

	var menu = ui.menus.get('extras');
	var oldFunct = menu.funct;

	menu.funct = function(menu, parent) {
		oldFunct.apply(this, arguments);

		ui.menus.addMenuItems(menu, ['-', 'uploadDEXagram'], parent);
	};
});
