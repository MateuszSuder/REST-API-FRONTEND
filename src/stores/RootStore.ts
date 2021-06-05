import { makeAutoObservable, observable } from 'mobx';
import { UserStore } from './UserStore';

export class RootStore {
	user: UserStore
	
	test: string = "123";

	constructor() {
		this.user = new UserStore();

		makeAutoObservable(this);
	}

	setTest(s: string) {
		this.test = s;
	}
}