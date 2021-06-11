import { makeAutoObservable, reaction} from "mobx";
import {ProductQuantity} from "../services/productService";

export class CartStore {
	items: ProductQuantity[] = [];
	price: number = 0;
	amount: number = 0;

	constructor() {
		makeAutoObservable(this);

		const r = reaction(
			() => this.amount,
			() => {
				this.price = 0;
				this.items.forEach(it => {
					this.price += it.price * it.quantity;
				})
			}
		)

		console.log(r);
	}

	addToCart(it: ProductQuantity) {
		const p = this.items.find(e => e.id === it.id);
		if(p) {
			if(p) {
				p.quantity += it.quantity;
				this.amount += it.quantity;
			}
		} else {
			this.items.push(it);
			this.amount += it.quantity;
		}
	}
}