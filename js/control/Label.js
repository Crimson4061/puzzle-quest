import { Base } from "./Base.js"

class Label extends Base {
	constructor(args) {
		super();
		this.fill = "white";
		this.stroke = "#0000";
		this.thickness = 4;
		this.text = "";
		this.scale = 16;
		this.style = "normal";
		this.font = fontFamily;
		this.align = "center";
		this.baseline = "middle";
		this.wrap = false;
		this.lines = [];
		this.oldArgs = {};
		if (args) Object.assign(this,args);
	};
	render() {
		ctx.fillStyle = this.fill;
		ctx.strokeStyle = this.stroke;
		ctx.lineWidth = this.thickness * scale;
		ctx.textAlign = this.align;
		ctx.textBaseline = this.baseline;
		ctx.font = this.style + " " + (this.scale * scale) + "px " + this.font;

		let lines;
		let pos = this.rect.y;

		if (this.oldArgs.width == this.rect.width && this.oldArgs.height == this.rect.height && this.oldArgs.font == ctx.font && this.oldArgs.text == this.text) {
			lines = this.lines;
		} else if (!this.wrap) {
			lines = this.text.split("\n");
		} else {
			let newLines = [];
			for (let line of this.text.split("\n")) {
				let words = line.split(" ");
				let newLine = "";
				for (let word of words) {
					if (ctx.measureText(newLine + word).width > this.rect.width) {
						newLines.push(newLine);
						newLine = word + " ";
					} else {
						newLine += word + " ";
					};
				};
				newLines.push(newLine);
			};
			lines = newLines;
		};

		this.oldArgs = {
			width: this.rect.width,
			height: this.rect.height,
			font: ctx.font,
			text: this.text
		};

		for (let line of lines) {
			ctx.strokeText(line, this.rect.x, pos);
			ctx.fillText(line, this.rect.x, pos);
			pos += this.scale * scale * 1.2;
		};

		this.lines = lines;
	};
};
export {Label};