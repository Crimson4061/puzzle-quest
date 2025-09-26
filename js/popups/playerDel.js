popups.playerDel = function (parent, id) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = "Delete Player?";

	popup.$content.append(new ButtonWithText("Yes", () => {
		deletePlayer(id);
		let p = popup;
		while (p) {
			p.close();
			p = p.parent;
			popupAnim = false;
		};
		popups.switcher();
	}, {
		position: Ex(30, 40, 0, 75),
		size: Ex(-60, 60, 100),
	}));

	popup.$content.append(new ButtonWithText("Back", () => {
		popup.close();
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-60, 60, 100),
	}));

	return popup;
};