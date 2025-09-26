popups.playerOpt = function (parent, id) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = meta.players[id].name;

	if (meta.currentPlayer != id) {
		popup.$content.append(new ButtonWithText("Switch Player", () => {
			switchPlayer(id);
			loadScreen("main");
		}, {
			position: Ex(30, -40, 0, 75),
			size: Ex(-60, 60, 100),
		}));
		popup.$content.append(new ButtonWithText("Delete Player", () => {
			popups.playerDel(popup, id);
		}, {
			position: Ex(30, 40, 0, 75),
			size: Ex(-60, 60, 100),
		}));
	} else {
		popup.$content.append(new Label({
			position: Ex(0, 70, 50, 75),
			scale: 25,
			style: "italic",
			text: "This is the current player"
		}));
	};

	popup.$content.append(new ButtonWithText("Back", () => {
		popup.close();
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-60, 60, 100),
	}));

	return popup;
};