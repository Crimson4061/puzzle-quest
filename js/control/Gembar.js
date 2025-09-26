import { Rect } from "./Rect.js";

class Gembar extends Rect {
	constructor(args){
		super();
		this.progress = 0;
		this.borderWidth = 4;
		this.tileSize = 8;
		if (args) Object.assign(this, args);
	};
	render() {
		ctx.fillStyle = this.fill;
		ctx.fillRect(
			this.rect.x, this.rect.y, 
			this.rect.width, this.rect.height
		);

		ctx.fillStyle = "#0007";
		ctx.fillRect(
			this.rect.x + this.borderWidth * scale, this.rect.y + this.borderWidth * scale, 
			this.rect.width - this.borderWidth * scale * 2, this.rect.height - this.borderWidth * scale * 2
		);

		let width = Math.round((this.rect.width / scale - this.borderWidth * 2) / this.tileSize);
		let height = Math.round((this.rect.height / scale - this.borderWidth * 2) / this.tileSize);
		let area = width * height;
		let fillArea = this.progress * area;

		let count = 0;

		ctx.strokeStyle = "#0007";
		ctx.lineWidth = 1 * scale;

		loop:
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				count++;
				if (count > fillArea) break loop;
				ctx.fillStyle = "hsl(" + ((time / 50 + (x + y) * 5) % 360) + "deg, 100%, 80%)";
				ctx.fillRect(
					this.rect.x + (this.borderWidth + this.tileSize * x) * scale, 
					this.rect.y + (this.borderWidth + this.tileSize * y) * scale, 
					this.tileSize * scale, this.tileSize * scale
				);
				ctx.strokeRect(
					this.rect.x + (this.borderWidth + this.tileSize * x + 0.5) * scale, 
					this.rect.y + (this.borderWidth + this.tileSize * y + 0.5) * scale, 
					(this.tileSize - 1) * scale, (this.tileSize - 1) * scale
				);
			};
		};
	};
};
export { Gembar };
/*
	gembar(args) {
		return {
			...controls.rect(),

			progress: 0,

			borderWidth: 4,
			tileSize: 8,
			
			render() {
				ctx.fillStyle = this.fill;
				ctx.fillRect(
					this.rect.x, this.rect.y, 
					this.rect.width, this.rect.height
				);

				ctx.fillStyle = "#0007";
				ctx.fillRect(
					this.rect.x + this.borderWidth * scale, this.rect.y + this.borderWidth * scale, 
					this.rect.width - this.borderWidth * scale * 2, this.rect.height - this.borderWidth * scale * 2
				);

				let width = Math.round((this.rect.width / scale - this.borderWidth * 2) / this.tileSize);
				let height = Math.round((this.rect.height / scale - this.borderWidth * 2) / this.tileSize);
				let area = width * height;
				let fillArea = this.progress * area;

				let count = 0;

				ctx.strokeStyle = "#0007";
				ctx.lineWidth = 1 * scale;

				loop:
				for (let x = 0; x < width; x++) {
					for (let y = 0; y < height; y++) {
						count++;
						if (count > fillArea) break loop;
						ctx.fillStyle = "hsl(" + ((time / 50 + (x + y) * 5) % 360) + "deg, 100%, 80%)";
						ctx.fillRect(
							this.rect.x + (this.borderWidth + this.tileSize * x) * scale, 
							this.rect.y + (this.borderWidth + this.tileSize * y) * scale, 
							this.tileSize * scale, this.tileSize * scale
						);
						ctx.strokeRect(
							this.rect.x + (this.borderWidth + this.tileSize * x + 0.5) * scale, 
							this.rect.y + (this.borderWidth + this.tileSize * y + 0.5) * scale, 
							(this.tileSize - 1) * scale, (this.tileSize - 1) * scale
						);
					}
				}
			},

			...args
		}
	}*/