popups.gamemenu = function (parent) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = "Menu";

	popup.$content.append(new ButtonWithText("How to Play", () => {
		popups.help(popup);
	}, {
		position: Ex(30, 40, 0, 75),
		size: Ex(-60, 60, 100),
	}));

	popup.$content.append(new ButtonWithText("Main Menu", () => {
		if (scene.$board.fallCount == 0) scene.$board.save();
		loadScreen("main");
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-40, 60, 50),
	}));

	popup.$content.append(new ButtonWithText("Back", () => {
		popup.close();
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-60, 60, 100),
	}));

	return popup;
};