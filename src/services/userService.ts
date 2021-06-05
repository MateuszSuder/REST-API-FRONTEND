import makeRequest, { requestType } from "./fetcher";

export interface User {
    company:        Company;
    deliverDetails: Delivery;
    id:             string;
    orders:         Order[];
    permission:     string;
    username:       string;
}

export interface Company {
    id:   string;
    name: string;
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

export interface Order {
    delivery: Delivery;
    id:       string;
    items:    Item[];
    price:    number;
    status:   Status[];
    userID:   string;
}

export interface Item {
    product:  Product;
    quantity: number;
}

export interface Product {
    amount:        number;
    description:   string;
    id:            string;
    name:          string;
    price:         number;
    specification: Specification[];
}

export interface Specification {
    key: string;
    val: string;
}

export interface Status {
    date:   Date;
    status: string;
}


export async function getUsers(): Promise<User[]>{
	let res = await makeRequest(requestType.GET, "api/user") ;
	return res.json();
}