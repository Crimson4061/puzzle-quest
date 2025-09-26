import { Button } from "./Button.js";
import { Label  } from "./Label.js";

class Input extends Button {
	constructor(args){
		super();
		this.value = "";
		this.type = "text";
		this.maxlength = null;
		this.mask = true;
		this.fillHover = "#fff3";
		this.fillActive = "#0000";
		this.element = null;
		delete this.onclick; // needed to be able to declare method outside constructor

		this.append(new Rect({
			position: Ex(30, -15, 0, 50),
			size: Ex(2, 30),
			fill: "#7af7",
		}), "selection");
		this.append(new Rect({
			position: Ex(30, -15, 0, 50),
			size: Ex(2, 30),
			fill: "#fff",
		}), "caret")
		this.append(new Label({
			position: Ex(30, 0, 0, 50),
			scale: 25,
			font: fontFamily,
			align: "left",
		}), "content")

		if (args) Object.assign(this, args);
		console.log(this);
	};

	onpointerin() {
		mainCanvas.style.cursor = "text";
		console.log(this);
	};

	onclick() {
		console.log(this);
		let input = document.createElement("input");
		input.value = this.value;
		input.type = this.type;
		input.maxlength = this.maxlength + "";

		let handler = (e) => {
			if (!this.__mouseIn) input.blur();
		};

		let blurHandler = () => {
			input.remove();
			document.removeEventListener("pointerdown", handler);
			this.element = null;
		};

		input.oninput = () => {
			this.value = input.value;
			if (this.maxlength) this.value = this.value.substring(0, this.maxlength);
			input.value = this.value;
		};
		input.onblur = () => {
			blurHandler();
		};

		document.addEventListener("pointerdown", handler);
		document.body.append(input);
		input.focus();
		this.element = input;
	};

	onupdate() {
		this.$content.text = this.value;
		if (this.element) {
			this.element.time = (this.element.time ?? 0) + delta;
			ctx.font = this.$content.style + " " + (this.$content.scale) + "px " + this.$content.font;
			let widthStart = ctx.measureText(this.element.value.substring(0, this.element.selectionStart)).width;
			let widthEnd = this.element.selectionStart == this.element.selectionEnd ? widthStart : ctx.measureText(this.element.value.substring(0, this.element.selectionEnd)).width;
			this.$caret.alpha = Math.cos(this.element.time / 500) / 2 + .5;
			this.$caret.position.x = (this.element.selectionDirection == "forward" ? widthEnd : widthStart) + this.$content.position.x;
			if (widthStart != widthEnd) {
				this.$selection.alpha = 1;
				this.$selection.position.x = widthStart + this.$content.position.x;
				this.$selection.size.x = widthEnd - widthStart;
			} else {
				this.$selection.alpha = 0;
			};
		} else {
			this.$caret.alpha = 0;
			this.$selection.alpha = 0;
		};
	};
};
export { Input };





/*	input(args) {
		let ct = {
			...controls.button(),
			value: "",
			type: "text",
			maxlength: null,
			mask: true,
			fillHover: "#fff3",
			fillActive: "#0000",
			element: null,
			
			onpointerin() {
				mainCanvas.style.cursor = "text";
			},

			onclick() {
				let input = document.createElement("input");
				input.value = this.value;
				input.type = this.type;
				input.maxlength = this.maxlength + "";

				let handler = (e) => {
					if (!this.__mouseIn) input.blur();
				};
				
				blurHandler = () => {
					input.remove();
					document.removeEventListener("pointerdown", handler);
					this.element = null;
				}

				input.oninput = () => {
					this.value = input.value;
					if (this.maxlength) this.value = this.value.substring(0, this.maxlength);
					input.value = this.value;
				}
				input.onblur = () => {
					blurHandler();
				}

				document.addEventListener("pointerdown", handler)
				document.body.append(input);
				input.focus();
				this.element = input;
			},

			onupdate() {
				this.$content.text = this.value;
				if (this.element) {
					this.element.time = (this.element.time ?? 0) + delta;
					ctx.font = this.$content.style + " " + (this.$content.scale) + "px " + this.$content.font;
					let widthStart = ctx.measureText(this.element.value.substring(0, this.element.selectionStart)).width;
					let widthEnd = this.element.selectionStart == this.element.selectionEnd ? widthStart : ctx.measureText(this.element.value.substring(0, this.element.selectionEnd)).width;
					this.$caret.alpha = Math.cos(this.element.time / 500) / 2 + .5;
					this.$caret.position.x = (this.element.selectionDirection == "forward" ? widthEnd : widthStart) + this.$content.position.x;
					if (widthStart != widthEnd) {
						this.$selection.alpha = 1;
						this.$selection.position.x = widthStart + this.$content.position.x;
						this.$selection.size.x = widthEnd - widthStart;
					} else {
						this.$selection.alpha = 0;
					}
				} else {
					this.$caret.alpha = 0;
					this.$selection.alpha = 0;
				}
			},

			...args
		}
		ct.append(controls.rect({
			position: Ex(30, -15, 0, 50),
			size: Ex(2, 30),
			fill: "#7af7",
		}), "selection")
		ct.append(controls.rect({
			position: Ex(30, -15, 0, 50),
			size: Ex(2, 30),
			fill: "#fff",
		}), "caret")
		ct.append(controls.label({
			position: Ex(30, 0, 0, 50),
			scale: 25,
			font: fontFamily,
			align: "left",
		}), "content")
		return ct;
	}*/