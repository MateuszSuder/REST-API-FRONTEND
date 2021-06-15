import makeRequest, { requestType } from "./fetcher";
import {Delivery, Item} from "./userService";

export interface OrderType {
	delivery: Delivery;
	id:       string;
	items:    Item[];
	price:    number;
	status:   Status[];
	userID:   string;
}

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

export interface Status {
	date:   Date;
	status: OrderStatus;
}

export enum OrderStatus {
	Ordered = "Ordered",
	PaymentDone = "PaymentDone",
	Shipped = "Shipped",
	Delivered = "Delivered"
}


export async function getOrdersInfo(): Promise<OrdersInfo>{
	let res = await makeRequest(requestType.GET, "api/order/info") ;
	return res.json();
}

export async function getOrdersMinified(): Promise<OrderMinified[]>{
	let res = await makeRequest(requestType.GET, "api/order/v2") ;
	return res.json();
}

export async function getOrder(orderID: string): Promise<OrderType> {
	let res = await makeRequest(requestType.GET, `api/order/${orderID}`) ;
	return res.json();
}

export async function getUserOrders(userID: string): Promise<OrderType[]> {
	let res = await makeRequest(requestType.GET, `api/user/${userID}/order`) ;
	return res.json();
}

export async function changeOrderStatus(orderID: string, status: OrderStatus){
	let res = await makeRequest(requestType.POST, `api/order/${orderID}`, JSON.stringify({status: status})) ;
	return res.json();
}

export async function placeOrder(input: OrderInput){
	let res = await makeRequest(requestType.POST, "api/order", JSON.stringify(input)) ;
	return res.json();
}