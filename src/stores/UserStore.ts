import { action, makeAutoObservable} from "mobx";
import { User } from "../services/userService";

export class UserStore {

	user: User | undefined

	constructor() {
		makeAutoObservable(this);
	}


	setUser(u: User | undefined) {
		this.user = u;
	}

	logout() {
		this.setUser(undefined);
	}

	get userLogged(): boolean {
		return this.user !== undefined;
	}
}