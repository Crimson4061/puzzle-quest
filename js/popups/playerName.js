popups.playerName = function (parent, id) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = id ? "Rename Player" : "New Player";

	popup.$content.append(new Label({
		position: Ex(0, -40, 50, 25),
		scale: 25,
		text: "Who are you?"
	}), "subtitle");

	popup.$content.append(new Input({
		position: Ex(30, 0, 0, 25),
		size: Ex(-60, 60, 100),
		fill: "#0007",
		maxlength: 16,
		value: meta.players[id]?.name ?? "",
	}), "input");

	popup.$content.append(new Base({
		render() {
			popup.$content.$input.onclick();
			popup.$content.remove(popup.$content.$init);
		}
	}), "init");


	popup.$content.append(new ButtonWithText("Confirm", () => {
		let value = popup.$content.$input.value;
		
		if (!value.trim() || value.includes("\n")) return;
		try {
			JSON.stringify({ name: value });
		} catch {
			return;
		};

		if (id) {
			meta.players[id].name = popup.$content.$input.value;
			save();
			let p = popup;
			while (p) {
				p.close();
				p = p.parent;
				popupAnim = false;
			};
			popups.profile();
		} else {
			createPlayer(popup.$content.$input.value);
			loadScreen("mainMenu");
		};
	}, {
		position: Ex(30, 40, 0, 75),
		size: Ex(-60, 60, 100),
	}, "Confirm",));

	popup.$content.append(new ButtonWithText("Cancel", () => {
		popup.close();
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-60, 60, 100),
	}));
	
	return popup;
};