import makeRequest, { requestType } from "./fetcher";
import {ProductInfo} from "./productService";


export type Category = {
	categoryName: string
}

export async function getCategories(): Promise<Category[]> {
	let res = await makeRequest(requestType.GET, "api/category") ;
	return res.json();
}

export async function addProductsToCategory(category: string, productIDs: Array<string>): Promise<Response> {
	return await makeRequest(requestType.POST, `api/category/${category}/add`, JSON.stringify(productIDs));
}

export async function getProductsFromCategory(category: string): Promise<ProductInfo[]> {
	const res = await makeRequest(requestType.GET, `api/category/${category}`);
	if(res.ok) {
		return await res.json();
	} else {
		throw new Error(await res.text());
	}
}