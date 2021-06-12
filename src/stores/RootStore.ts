import {action, makeAutoObservable, observable} from 'mobx';
import { UserStore } from './UserStore';
import {CartStore} from "./CartStore";

export class RootStore {
	readonly timeout = 3500;
	user: UserStore;
	cart: CartStore;

	snackbarMessages: Array<{ message: string, timestamp: number }> = [];


	constructor() {
		this.user = new UserStore();
		this.cart = new CartStore();

		makeAutoObservable(this);
	}

	pushMessage(msg: string) {
		const timestamp = Date.now();
		const message = msg.substr(0, 250) + (msg.length > 247 ? '...' : '');

		if (this.snackbarMessages.some((m) => m.message === message)) {
			return;
		}

		this.snackbarMessages.push({
			message,
			timestamp
		});

		setTimeout(() => (this.snackbarMessages = this.snackbarMessages.filter((_) => _.timestamp !== timestamp)), this.timeout + msg.length * 12.5);
	}
}