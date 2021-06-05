import makeRequest, { requestType } from "./fetcher";

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


export async function getOrdersInfo(): Promise<OrdersInfo>{
	let res = await makeRequest(requestType.GET, "api/order/info") ;
	return res.json();
}

export async function getOrdersMinified(): Promise<OrderMinified[]>{
	let res = await makeRequest(requestType.GET, "api/order/v2") ;
	return res.json();
}