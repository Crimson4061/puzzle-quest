export function Base(args) {
	return {
		id: "",
		controls: [],
		append(ct, id = "") {
			this.controls.push(ct);
			if (id) {
				this["$" + id] = ct;
				ct.id = id;
			}
		},
		remove(ct) {
			let index = this.controls.indexOf(ct);
			if (index > 0) {
				this.controls.splice(index, 1);
				if (ct.id && this.controls["$" + ct.id]) delete this.controls["$" + ct.id];
			}
		},

		position: Ex(0, 0),
		size: Ex(0, 0),
		rect: Rect(0, 0),

		alpha: 1,
		clickthrough: false,

		__mouseIn: false,

		render() {},

		onupdate() {},
		onpointerin() {},
		onpointerout() {},
		onpointerdown() {},
		onpointermove() {},
		onpointerup() {},
		onmousewheel() {},
		...args
	}
}
