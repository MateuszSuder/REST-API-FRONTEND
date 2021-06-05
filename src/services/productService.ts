import makeRequest, { requestType } from "./fetcher";

export interface ProductsInfo {
	numberOfProducts: number,
	productsWithLowAmount: number
}


export async function getProductsInfo(q: number): Promise<ProductsInfo>{
	let res = await makeRequest(requestType.POST, "api/product/info", JSON.stringify({quantityLowerThan: q})) ;
	return res.json();
}