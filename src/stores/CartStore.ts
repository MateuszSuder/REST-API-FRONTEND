import { makeAutoObservable, reaction} from "mobx";
import {ProductQuantity} from "../services/productService";
import {Delivery} from "../services/userService";
import {RootStore} from "./RootStore";
import {placeOrder} from "../services/orderService";

export class CartStore {
	store: RootStore;

	items: ProductQuantity[] = [];
	price: number = 0;
	amount: number = 0;
	deliveryDetails: Delivery | undefined;


	constructor(s: RootStore) {
		makeAutoObservable(this);

		this.store = s;

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

	setDelivery(d: Delivery) {
		this.deliveryDetails = d;
		localStorage.setItem('delivery', JSON.stringify(this.deliveryDetails));
	}

	async placeOrder() {
		if(!this.store.user.user || !this.store.user.user.id) {
			throw new Error('User not logged in');
		}

		if(!this.deliveryDetails) {
			throw new Error('Delivery details not found');
		}

		const productInput = this.items.map(it => ({productID: it.id, quantity: it.quantity}))

		if(productInput.length === 0) {
			throw new Error('No items found in cart');
		}

		const input = {
			delivery: this.deliveryDetails,
			items: productInput,
			userID: this.store.user.user.id
		}

		placeOrder(input).then(async r => {
			if(r.ok) {
				return r
			}
			throw r;
		})
	}
}