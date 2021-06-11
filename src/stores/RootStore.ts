import { makeAutoObservable, observable } from 'mobx';
import { UserStore } from './UserStore';
import {CartStore} from "./CartStore";

export class RootStore {
	user: UserStore;
	cart: CartStore;
	test: string = "123";

	constructor() {
		this.user = new UserStore();
		this.cart = new CartStore();

		makeAutoObservable(this);
	}

	setTest(s: string) {
		this.test = s;
	}
}