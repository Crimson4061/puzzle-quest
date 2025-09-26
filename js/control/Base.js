class Base {
	constructor(args) {
		this.id = "";
		this.controls = [];

		this.position = Ex(0, 0);
		this.size = Ex(0, 0);
		this.rect = Rectangle(0, 0);

		this.alpha = 1;
		this.clickthrough = false;

		this.__mouseIn = false;
		if (args) Object.assign(args,this);
	}

	append(ct, id = ""){
		if (!ct) return;
		this.controls.push(ct);
		if (!id) return;
		this["$" + id] = ct;
		ct.id = id;
	};
	remove(ct){
		let index = this.controls.indexOf(ct);
		if (index > 0) {
			this.controls.splice(index, 1);
			if (ct.id && this.controls["$" + ct.id]) delete this.controls["$" + ct.id];
		};
	};
	
	render(){};
	onupdate(){if(this.id == "logic") console.log("defualt onupdate")};
	onpointerin(){};
	onpointerout(){};
	onpointerdown(){};
	onpointermove(){};
	onpointerup(){};
	onmousewheel(){};
};
export {Base};