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
					name: "username"
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
					title: "Nazwa użytkownika",
					disabled: true,
					name: "username"
				},
				{
					title: "Prawa",
					type: inputType.select,
					values: [
						'Użytkownik',
						'Admin'
					],
					name: "permission"
				}
			]
		},
		{
			gridSize: 6,
			groupTitle: "Firma",
			items: [
				{
					title: "ID firmy",
					disabled: true,
					name: "companyID"
				},
				{
					title: "Nazwa Firmy",
					type: inputType.select,
					name: "companyName"
				}
			]
		},
		{
			gridSize: 6,
			groupTitle: "Adres dostawy",
			items: [
				{
					title: "Imie",
					name: "name"
				},
				{
					title: "Nazwisko",
					name: "lastName"
				},
				{
					title: "Państwo",
					name: "country"
				},
				{
					title: "Miasto",
					name: "city"
				},
				{
					title: "Kod pocztowy",
					name: "postcode"
				},
				{
					title: "Ulica",
					name: "street"
				},
				{
					title: "Numer domu",
					name: "number"
				}
			]
		},
		{
			gridSize: 6,
			groupTitle: "Zamówienia",
			items: [
				{
					title: "Numer zamówienia",
					disabled: true,
					name: "orderID"
				},
				{
					title: "Status zamówienia",
					type: inputType.select,
					values: [
						"Ordered",
						"PaymentDone",
						"Shipped",
						"Delivered"
					],
					name: "status"
				}
			]	
		}
	]
}

console.log(JSON.stringify(userInputs));

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
