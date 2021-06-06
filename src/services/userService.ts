import { Company } from "./companySevice";
import makeRequest, { formInputs, inputType, requestType } from "./fetcher";
import { Product } from "./productService";

export const userInputs: formInputs = {
	create: [
		{
			gridSize: 12,
			items: [
				{
					title: "Nazwa użytkownika",
					required: true,
				}
			]
		}
	],
	modify: [
		{
			gridSize: 6,
			groupTitle: "Użytkownik",
			items: [
				{
					title: "Nazwa użytkownika"
				},
				{
					title: "Prawa",
					type: inputType.select,
					values: [
						'Użytkownik',
						'Admin'
					]
				}
			]
		},
		{
			gridSize: 6,
			groupTitle: "Firma",
			items: [
				{
					title: "ID firmy",
					disabled: true
				},
				{
					title: "Nazwa Firmy",
					type: inputType.select
				}
			]
		},
		{
			gridSize: 4,
			groupTitle: "Adres dostawy",
			items: [
				{
					title: "Imie"
				},
				{
					title: "Nazwisko"
				},
				{
					title: "Państwo"
				},
				{
					title: "Miasto"
				},
				{
					title: "Kod pocztowy"
				},
				{
					title: "Ulica"
				},
				{
					title: "Numer domu"
				}
			]
		},
		{
			gridSize: 6,
			groupTitle: "Zamówienia",
			items: [
				{
					title: "Numer zamówienia",
					disabled: true
				},
				{
					title: "Status zamówienia",
					type: inputType.select,
					values: [
						"Ordered",
						"PaymentDone",
						"Shipped",
						"Delivered"
					]
				}
			]	
		}
	]
}

export interface User {
    company:        Company;
    deliverDetails: Delivery;
    id:             string;
    orders:         Order[];
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

export interface Specification {
    key: string;
    val: string;
}

export interface Status {
    date:   Date;
    status: string;
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
