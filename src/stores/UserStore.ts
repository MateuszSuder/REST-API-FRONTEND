import { action, makeAutoObservable} from "mobx";
import { User } from "../services/userService";

export class UserStore {

	user: User | undefined

	constructor() {
		makeAutoObservable(this);
	}


	setUser(u: User | undefined) {
		this.user = u;
		localStorage.setItem('user', JSON.stringify(this.user));
	}

	logout() {
		this.setUser(undefined);
		localStorage.removeItem('user');
	}

	get userLogged(): boolean {
		return this.user !== undefined;
	}
}