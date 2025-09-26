import { Rect } from "./Rect.js";

class Scroller extends Rect {
	constructor(args){
		super();
		this.__mouseActive = false;
		this.scrollPos = 0;
		this.scrollSpd = 0;
		this.mask = true;
		this.$content = new Base({size: Ex(0, 0, 100)});
		if (args) Object.assign(this, args);
	};

	onupdate(){
		let max = Math.max((this.$content.rect.height - this.rect.height) / scale, 0);

		if (!this.__mouseActive) {
			this.scrollPos += this.scrollSpd * delta / 1000;
			this.scrollSpd *= 0.1 ** (delta / 1000);
			if (this.scrollPos > 0) {
				this.scrollSpd *= 1e-3 ** (delta / 1000);
				this.scrollPos *= 1e-3 ** (delta / 1000);
			} else if (this.scrollPos < -max) {
				let p = this.scrollPos + max;
				this.scrollSpd *= 1e-3 ** (delta / 1000);
				this.scrollPos = -max + p * 1e-3 ** (delta / 1000);
			};
		};
		this.$content.position.y = this.scrollPos;

		if (this.$content.position.y > 0) {
			this.$content.position.y -= this.scrollPos * (1 - 1 / (1 + this.scrollPos / 150));
		} else if (this.$content.position.y < -max) {
			let p = this.scrollPos + max;
			this.$content.position.y -= p * (1 - 1 / (1 - p / 150));
		};
	};
	onpointerdown(pos, args) {
		this.__mouseActive = true;
		let startPos = mousePos;
		let startScr = this.scrollPos;
		let scrTime = time;
		let isScrolling = false;
		let movehandler = (e) => {
			let pos = {
				x: e.clientX * resScale,
				y: e.clientY * resScale,
			};
			if (!isScrolling && Math.abs(startPos.y - pos.y) < 10 * scale) return;
			isScrolling = true;
			let d = startScr + (pos.y - startPos.y) / scale;
			this.scrollSpd = (d - this.scrollPos) / delta * 1000;
			this.scrollPos = d;
			this.$content.clickthrough = true;
			scrTime = time;
		};
		let uphandler = (e) => {
			this.__mouseActive = false;
			if (Math.abs(this.scrollSpd) < 20 || time - scrTime > 100) this.scrollSpd = 0;
			this.$content.clickthrough = false;

			document.removeEventListener("pointermove", movehandler);
			document.removeEventListener("pointerup", uphandler);
		};
		document.addEventListener("pointermove", movehandler);
		document.addEventListener("pointerup", uphandler);
	};
	onmousewheel(pos, args) {
		this.scrollPos -= Math.sign(args.deltaY) * 50;
	};	
	render() {
		ctx.fillStyle = this.fill;
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		let fraction = this.$content.rect.height / this.rect.height;
		if (fraction > 1) {
			ctx.fillStyle = "#aaa";
			let offset = (this.rect.y - this.$content.rect.y);
			ctx.fillRect(
				this.rect.x + this.rect.width - 5 * scale, 
				this.rect.y + this.rect.height * offset / this.rect.height / fraction, 
				5 * scale, 
				this.rect.height / fraction
			);
		};
	};
};






export { Scroller };
/*
scroller(args) {
		let ct = {
			...controls.rect(),

			__mouseActive: false,
			scrollPos: 0,
			scrollSpd: 0,
			mask: true,

			onupdate() {
				let max = Math.max((this.$content.rect.height - this.rect.height) / scale, 0);

				if (!this.__mouseActive) {
					this.scrollPos += this.scrollSpd * delta / 1000;
					this.scrollSpd *= 0.1 ** (delta / 1000);
					if (this.scrollPos > 0) {
						this.scrollSpd *= 1e-3 ** (delta / 1000);
						this.scrollPos *= 1e-3 ** (delta / 1000);
					} else if (this.scrollPos < -max) {
						let p = this.scrollPos + max;
						this.scrollSpd *= 1e-3 ** (delta / 1000);
						this.scrollPos = -max + p * 1e-3 ** (delta / 1000);
					}
				}

				this.$content.position.y = this.scrollPos;

				if (this.$content.position.y > 0) {
					this.$content.position.y -= this.scrollPos * (1 - 1 / (1 + this.scrollPos / 150));
				} else if (this.$content.position.y < -max) {
					let p = this.scrollPos + max;
					this.$content.position.y -= p * (1 - 1 / (1 - p / 150));
				}
			},

			onpointerdown(pos, args) {
				this.__mouseActive = true;
				let startPos = mousePos;
				let startScr = this.scrollPos;
				let scrTime = time;
				let isScrolling = false;
				let movehandler = (e) => {
					let pos = {
						x: e.clientX * resScale,
						y: e.clientY * resScale,
					}
					if (!isScrolling && Math.abs(startPos.y - pos.y) < 10 * scale) return;
					isScrolling = true;
					let d = startScr + (pos.y - startPos.y) / scale;
					this.scrollSpd = (d - this.scrollPos) / delta * 1000;
					this.scrollPos = d;
					this.$content.clickthrough = true;
					scrTime = time;
				}
				let uphandler = (e) => {
					this.__mouseActive = false;
					if (Math.abs(this.scrollSpd) < 20 || time - scrTime > 100) this.scrollSpd = 0;
					this.$content.clickthrough = false;

					document.removeEventListener("pointermove", movehandler);
					document.removeEventListener("pointerup", uphandler);
				}
				document.addEventListener("pointermove", movehandler);
				document.addEventListener("pointerup", uphandler);
			},

			onmousewheel(pos, args) {
				this.scrollPos -= Math.sign(args.deltaY) * 50;
			},

			render() {
				ctx.fillStyle = this.fill;
				ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
				let fraction = this.$content.rect.height / this.rect.height;
				if (fraction > 1) {
					ctx.fillStyle = "#aaa";
					let offset = (this.rect.y - this.$content.rect.y);
					ctx.fillRect(
						this.rect.x + this.rect.width - 5 * scale, 
						this.rect.y + this.rect.height * offset / this.rect.height / fraction, 
						5 * scale, 
						this.rect.height / fraction
					);
				} 
			},

			...args
		}
		ct.append(new Base().append({
			size: Ex(0, 0, 100),
		}), "content")
		return ct;
	},*/