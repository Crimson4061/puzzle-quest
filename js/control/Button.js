import { Rect } from "./Rect.js";

class Button extends Rect {
	constructor(onclick, args){
		super();
		this.fillHover = "#fff7";
		this.fillActive = "#0003";
		this.__mouseActive = false;
		this.onclick = onclick;
		if (args) Object.assign(this, args);
	};
	onclick(){};
	onpointerin() {	mainCanvas.style.cursor = "pointer";};
	onpointerout() {
		mainCanvas.style.cursor = "";
	}
	onpointerdown() {
		this.__mouseActive = true;
		let handler = (e) => {
			this.__mouseActive = false;
			if (this.__mouseIn) this.onclick();
			document.removeEventListener("pointerup", handler);
		}
		document.addEventListener("pointerup", handler);
	};
	render() {
		ctx.fillStyle = this.fill;

		let level = this.__mouseActive * this.__mouseIn;
		if (!isTouch) level += this.__mouseIn; 

		if (this.radius) {
			let radius = this.radius * scale;
			ctx.beginPath();
			ctx.moveTo(this.rect.x + radius, this.rect.y);
			ctx.arc(
				this.rect.x + this.rect.width - radius, 
				this.rect.y + radius,
				radius, Math.PI * -.5, 0
			);
			ctx.arc(
				this.rect.x + this.rect.width - radius, 
				this.rect.y + this.rect.height - radius,
				radius, 0, Math.PI * .5
			);
			ctx.arc(
				this.rect.x + radius,
				this.rect.y + this.rect.height - radius, 
				radius, Math.PI * .5, Math.PI
			);
			ctx.arc(
				this.rect.x + radius, 
				this.rect.y + radius,
				radius, Math.PI, Math.PI * 1.5
			);
			ctx.fill();
			if (level >= 1) {
				ctx.fillStyle = this.fillHover;
				ctx.fill();
				if (level >= 2) {
					ctx.fillStyle = this.fillActive;
					ctx.fill();
				};
			};
		} else {
			ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
			if (level >= 1) {
				ctx.fillStyle = this.fillHover;
				ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
				if (level >= 2) {
					ctx.fillStyle = this.fillActive;
					ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
				};
			};
		};
	};
};
export { Button };