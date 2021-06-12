import { makeAutoObservable, reaction} from "mobx";
import {ProductQuantity} from "../services/productService";
import {Delivery} from "../services/userService";

export class CartStore {
	items: ProductQuantity[] = [];
	price: number = 0;
	amount: number = 0;
	deliveryDetails: Delivery | undefined;

	constructor() {
		makeAutoObservable(this);

		const r = reaction(
			() => this.amount,
			() => {
				this.price = 0;
				this.items.forEach(it => {
					this.price += it.price * it.quantity;
				})
				localStorage.setItem('cart', JSON.stringify(this.items));
			}
		)
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

	removeFromCart(id: string) {
		const p = this.items.find(e => e.id === id);
		if (!p) return;
		const ind = this.items.indexOf(p);
		this.amount -= p.quantity;
		this.items.splice(ind, 1);
	}
}