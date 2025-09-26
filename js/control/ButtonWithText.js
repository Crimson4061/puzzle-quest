import { Button } from "./Button.js";
import { Label } from "./Label.js";
// { Rect, Base } is imported upstream

class ButtonWithText extends Button {
	constructor(text, onclick, args, argsRect, argsLabel){
		super();
		this.onclick = onclick;

		let temprect = new Rect({
			position: Ex(2, 2),
			size: Ex(-4, -4, 100, 100),
			fill: "#000a"
		});
		if (argsRect) {Object.assign(temprect, argsRect)};
		this.append(temprect, "fill");

		let label = new Label({
			position: Ex(0, 0, 50, 50),
			scale: 25,
			text: text
		});
		if (argsLabel) {Object.assign(label,argsLabel)}
		this.append(label, "text");

		if (args) Object.assign(this,args);
	};
};
export { ButtonWithText };

/*function ButtonWithText(parent, args, text, onclick, id) {
	let button;
	parent.append(button = new Button({
		fill: "#aaa7",
		onclick,
		...args
	}), id)
	button.append(new Rect({
		position: Ex(2, 2),
		size: Ex(-4, -4, 100, 100),
		fill: "#000a",
	}), "fill")
	button.append(new Label({
		position: Ex(0, 0, 50, 50),
		scale: 25,
		text,
	}), "text")
	return button;
}*/