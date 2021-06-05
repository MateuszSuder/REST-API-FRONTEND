import makeRequest, { requestType } from "./fetcher";

export interface OrdersInfo {
	delivered: number,
	paymentDone: number,
	shipped: number,
	waitingForPayment: number
}


export async function getOrdersInfo(): Promise<OrdersInfo>{
	let res = await makeRequest(requestType.GET, "api/order/info") ;
	return res.json();
}