popups.about = function (parent) {
	if (popupAnim) return;

	let popup = doPopup(parent);
	popup.$title.text = "About";

	popup.$content.append(new Scroller({
		position: Ex(0, -100, 0, 25),
		size: Ex(0, 200, 100, 50),
		fill: 0
	}), "view");

	let holder = popup.$content.$view.$content;
	let y = holder.size.y;
	function addTitle(title) {
		holder.append(new Label({
			position: Ex(0, y + 20, 50),
			text: title,
			scale: 20,
			fill: "#aaa",
			baseline: "top",
		}));
		y += 24;
	};
	function addLine(title) {
		holder.append(new Label({
			position: Ex(0, y + 20, 50),
			text: title,
			scale: 25,
			baseline: "top",
		}));
		y += 30;
	};

	holder.append(new Label({
		position: Ex(100, 80),
		text: "Yet Another\nMatch-3 Clone.",
		align: "left",
		scale: 50,
		style: "700",
	}));
	y += 180;

	addLine("Version " + version);
	y += 40;

	addTitle("Created by:");
	holder.append(new ButtonWithText("ducdat0507", () => {
		window.open("https://ducdat0507.github.io", '_blank');;
	}, {
		position: Ex(30, y + 30),
		size: Ex(-60, 60, 100),
	}));
	y += 120;

	addTitle("This game is open source!");
	holder.append(new ButtonWithText("GitHub Repository", () => {
		window.open("https://github.com/ducdat0507/match-3", '_blank');;
	}, {
		position: Ex(30, y + 30),
		size: Ex(-60, 60, 100),
	}));
	y += 120;

	addTitle("Made with HTML5 and vanilla JavaScript.");
	addTitle("(zero libraries used!!!!)");
	y += 40;

	addTitle("This game is inspired by other match-3 games (duh),");
	addTitle("most dominantly the Bejeweled series and such.");
	y += 40;

	addTitle("Font attribution:");
	holder.append(new ButtonWithText("\"Overused Grotesk\" by RandomMaerk", () => {
		window.open("https://github.com/RandomMaerks/Overused-Grotesk/", '_blank');;
	}, {
		position: Ex(30, y + 30),
		size: Ex(-60, 60, 100),
	}));
	y += 70;

	holder.append(new Rect({
		position: Ex(30, y + 30),
		size: Ex(-60, 2, 100),
		fill: "#fff7",
	}));
	y += 12;

	holder.append(new ButtonWithText("View Font License", () => {
		window.open("./css/FONT-LICENSE.txt", '_blank');
	}, {
		position: Ex(30, y + 30),
		size: Ex(-60, 60, 100),
	}));
	y += 120;

	popup.$content.append(new ButtonWithText("Back", () => {
		popup.close();
	}, {
		position: Ex(30, 120, 0, 75),
		size: Ex(-60, 60, 100),
	}));
	
	return popup;
}