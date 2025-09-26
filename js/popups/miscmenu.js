popups.miscmenu = function (parent) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = "Menu";
	popup.$content.append(new Scroller({
		position: Ex(0, -100, 0, 25),
		size: Ex(0, 200, 100, 50),
		fill: 0
	}), "view");

	let holder = popup.$content.$view.$content;
	let y = holder.size.y;
	
	function addEntry(title, id) {
		console.log(id);
		holder.append(new ButtonWithText(title, () => {
				popups[id](popup);
			}, {
				position: Ex(30, y + 20),
				size: Ex(-60, 60, 100),
			}));
		y += 80;
	};

	addEntry("How to Play", "help");
	addEntry("Options", "options");
	addEntry("About", "about");
	addEntry("Changelog", "changelog");

	y += 20;

	popup.$content.append(new ButtonWithText("Back", () => {
		popup.close();
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-60, 60, 100),
	}));

	return popup;
};
