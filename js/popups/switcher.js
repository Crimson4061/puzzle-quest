popups.switcher = function (parent) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = "Player Switcher";

	popup.$content.append(new Scroller({
		position: Ex(0, -100, 0, 25),
		size: Ex(0, 120, 100, 50),
		fill: 0
	}), "view");
	console.log(popup);
	let holder = popup.$content.$view.$content
	let y = holder.size.y;

	function addEntry(id) {
		holder.append(new ButtonWithText(
			meta.currentPlayer == id ? "⮞   " + meta.players[id].name + "   ⮜" : meta.players[id].name,
			() => {
			popups.playerOpt(popup, id);
			},
			{
			position: Ex(30, y + 20),
			size: Ex(-60, 60, 100),
			}));
		y += 80;
	}



/*	function addEntry(id) {
		let btn = ButtonWithText(holder, {
			position: Ex(30, y + 20),
			size: Ex(-60, 60, 100),
		}, meta.currentPlayer == id ? "⮞   " + meta.players[id].name + "   ⮜" : meta.players[id].name, () => {
			popups.playerOpt(popup, id);
		});
		y += 80;
	}*/

	for (let id in meta.players) addEntry(id);

	popup.$content.append(new ButtonWithText(
		"New Player",
		() => {
			popups.playerName(popup);
		}, {
		position: Ex(30, 40, 0, 75),
		size: Ex(-40, 60, 50),
		}
	));
	popup.$content.append(new ButtonWithText(
		"Manage Storage",
		() => {
			popups.storage(popup);
		}, {
		position: Ex(10, 40, 50, 75),
		size: Ex(-40, 60, 50),
		}
	));

	popup.$content.append(new ButtonWithText("Back", () => {
		popup.close();
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-60, 60, 100),
	}));

	return popup;
};