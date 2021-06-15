import {CompanyInfo} from "./companySevice";
import makeRequest, {requestType} from "./fetcher";
import {ProductInfo} from "./productService";
import {OrderType} from "./orderService";

export interface UserModifyInput {
    companyID?:      string;
    deliveryDetails?: Delivery;
    permission?:     'user' | 'admin';
}

export interface User {
    company:        CompanyInfo;
    deliverDetails: Delivery;
    id:             string;
    orders:         OrderType[];
    permission:     string;
    username:       string;
}

export interface Delivery {
    address:  Address;
    lastName: string;
    name:     string;
}

export interface Address {
    city:     string;
    country:  string;
    number:   string;
    postcode: string;
    street:   string;
}

export interface Item {
    product:  ProductInfo;
    quantity: number;
}

export interface Specification {
    key: string;
    val: string;
}

export interface UserInfo {
	numberOfUsers: number
}


export interface UserMinified {
    companyName: string;
    id:          string;
    permission:  "user" | "admin";
    username:    string;
}


export async function getUsers(): Promise<User[]>{
	let res = await makeRequest(requestType.GET, "api/user") ;
	return res.json();
}

export async function getUsersInfo(): Promise<UserInfo>{
	let res = await makeRequest(requestType.GET, "api/user/info") ;
	return res.json();
}

export async function getUsersMinified(): Promise<UserMinified[]>{
	let res = await makeRequest(requestType.GET, "api/user/v2") ;
	return res.json();
}

export async function createUser(username: string): Promise<string> {
    let res = await makeRequest(requestType.POST, "api/user", JSON.stringify({username}));
    return res.json();
}

export async function modifyUser(userID: string, input: UserModifyInput) {
    return await makeRequest(requestType.POST, `api/user/${userID}`, JSON.stringify({...input}));
}

export async function getUser(userID: string): Promise<User> {
    let res = await makeRequest(requestType.GET, `api/user/${userID}`) ;
    return res.json();
}

export async function deleteUser(userID: string) {
    let res = await makeRequest(requestType.DELETE, `api/user/${userID}`) ;
    return res.json();
}