popups.storage = function (parent) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = "Manage Storage";

	popup.$content.append(new Scroller({
		position: Ex(0, -100, 0, 25),
		size: Ex(0, 200, 100, 50),
		fill: 0
	}), "view");

	let holder = popup.$content.$view.$content;
	holder.size.y = 640;

	holder.append(new Label({
		position: Ex(0, 50, 50),
		size: Ex(-60, 0, 100),
		scale: 25,
		text: 
			"Due to how browsers work, your save file may get deleted some time in the future if you clear your cookies or whenever your browser need to clean its storage.\n\n" +
			"It is recommended that you make a backup of your player data into a file in order to recover it when needed.\n\n\n\n\n" +
			"Or alternatively, you can click the button below to request this page to use \"persistent storage\" that will make your data a little bit more sturdy.",
		wrap: true,
	}), "subtitle")

	holder.append(new ButtonWithText("Backup Player", () => {
		exportPlayer();
	}, {
		position: Ex(30, 300, 0),
		size: Ex(-40, 60, 50),
	}));

	holder.append(new ButtonWithText("Restore Backup", () => {
		importPlayer(popup);
	}, {
		position: Ex(10, 300, 50),
		size: Ex(-40, 60, 50),
	}, "Restore Backup"));

	holder.append(new ButtonWithText("Request Persistent Storage", () => {
		try {
			navigator.storage.persist().then(x => {
				holder.$persist.$text.text = x ? "Request Successful!!!!" : "Failure: User denied request";
			});
		} catch {
			holder.$persist.$text.text = "Failure: Feature unsupported";
		};
	}, {
		position: Ex(30, 540, 0),
		size: Ex(-60, 60, 100),
	}), "persist");

	popup.$content.append(new ButtonWithText("Back", () => {
		popup.close();
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-60, 60, 100),
	}));

	return popup;
};