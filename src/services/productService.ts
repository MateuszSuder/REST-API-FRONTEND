import makeRequest, { requestType } from "./fetcher";

export interface ProductsInfo {
	numberOfProducts: number,
	productsWithLowAmount: number
}

export interface ProductInfo {
    amount:        number;
    description?:   string;
    id?:            string;
    name:          string;
    price:         number;
    specification?: Specification[];
}

export interface Specification {
    key: string;
    val: string;
}

export interface ProductMinified {
    amount: number;
    id:     string;
    name:   string;
    price:  number;
}


export async function getProductsInfo(q: number): Promise<ProductsInfo>{
	let res = await makeRequest(requestType.POST, "api/product/info", JSON.stringify({quantityLowerThan: q})) ;
	return res.json();
}

export async function getProducts(): Promise<ProductInfo[]>{
	let res = await makeRequest(requestType.GET, "api/product/");
	return res.json();
}

export async function getProductsMinified(): Promise<ProductMinified[]>{
	let res = await makeRequest(requestType.GET, "api/product/v2");
	return res.json();
}

export async function createProduct(input: ProductInfo) {
	return await makeRequest(requestType.POST, "api/product/", JSON.stringify({...input}));
}

export async function modifyProduct(id: string, input: ProductInfo) {
	return await makeRequest(requestType.POST, `api/product/${id}`, JSON.stringify({...input}));
}
