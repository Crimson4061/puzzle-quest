popups.continue = function (parent, mode, decideMode) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = "Continue?";

	popup.$content.append(new Label({
		position: Ex(0, -40, 50, 25),
		size: Ex(-60, 0, 100),
		scale: 25,
		text: 
			"There is a saved game in progress, what will you do?\n\n" +
			"Pressing \"New Game\" will forfeit your current game.",
		wrap: true,
	}), "subtitle");

	popup.$content.append(new ButtonWithText("New Game", () => {
		delete game.boards[mode];
		decideMode(mode, true);
		popup.close();
	}, {
		position: Ex(30, 40, 0, 75),
		size: Ex(-40, 60, 50),
	}));
	popup.$content.append(new ButtonWithText("Continue", () => {
		decideMode(mode, true);
		popup.close();
	}, {
		position: Ex(10, 40, 50, 75),
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