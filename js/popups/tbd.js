popups.tbd = function (parent) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = "Coming Soon...";

	popup.$content.append(new Label({
		position: Ex(0, -40, 50, 25),
		size: Ex(-60, 0, 100),
		scale: 25,
		text: 
			"This game mode is not yet implemented.\n\n" +
			"It might be available in the next update...?",
		wrap: true,
	}), "subtitle")

	popup.$content.append(new ButtonWithText("Back", () => {
		popup.close();
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-60, 60, 100),
	}));

	return popup;
};