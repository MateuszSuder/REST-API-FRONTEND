import makeRequest, { requestType } from "./fetcher";
import {Delivery} from "./userService";

export interface OrdersInfo {
	delivered: number,
	paymentDone: number,
	shipped: number,
	waitingForPayment: number
}


export interface OrderMinified {
    id:         string;
    lastStatus: string;
    price:      number;
}

export interface OrderProduct {
	productID: string;
	quantity: number;
}

export interface OrderInput {
	delivery: Delivery;
	items: Array<OrderProduct>;
	userID: string
}

export async function getOrdersInfo(): Promise<OrdersInfo>{
	let res = await makeRequest(requestType.GET, "api/order/info") ;
	return res.json();
}

export async function getOrdersMinified(): Promise<OrderMinified[]>{
	let res = await makeRequest(requestType.GET, "api/order/v2") ;
	return res.json();
}

export async function placeOrder(input: OrderInput) {
	let res = await makeRequest(requestType.POST, "api/order", JSON.stringify(input)) ;
	return res.json();
}