import { action } from "mobx";
import { User } from "../services/userService";

export class UserStore {

	user: User | undefined

	constructor() {
		
	}


	setUser(u: User) {
		this.user = u;
	}

	get userLogged(): boolean {
		return this.user !== undefined;
	}
}