class Base {
	constructor(args) {
		this.id = "",
		this.controls = [],


		this.position = Ex(0, 0),
		this.size = Ex(0, 0),
		this.rect = Rect(0, 0),

		this.alpha = 1,
		this.clickthrough = false,

		this.__mouseIn = false
		if (args) Object.assign(args,this);
	}

	append(ct, id = ""){
		console.log(id)
		console.log(ct)
		if (!ct) return
		this.controls.push(ct);
		if (!id) return
		this["$" + id] = ct
		console.log(this["$" + id])
		ct.id = id;
		console.log("fucl")

	}
	remove(ct){
		let index = this.controls.indexOf(ct);
		if (index > 0) {
			this.controls.splice(index, 1);
			if (ct.id && this.controls["$" + ct.id]) delete this.controls["$" + ct.id];
		}
	}
	
	render(){}
	onupdate(){}
	onpointerin(){}
	onpointerout(){}
	onpointerdown(){}
	onpointermove(){}
	onpointerup(){}
	onmousewheel(){}
}
export {Base}