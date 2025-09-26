import { Base } from "./Base.js";

class Rect extends Base {
	constructor(args){
		super();
		this.fill = "white";
		this.radius = 0;
		if (args) Object.assign(this, args);
	};
	render() {
		ctx.fillStyle = this.fill;
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
		} else {
			ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		};
	};
};
export { Rect };