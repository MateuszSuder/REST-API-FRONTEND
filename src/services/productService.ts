import makeRequest, { requestType } from "./fetcher";

export interface Product {
	category?: string,
	product: ProductInfo
}

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
	let res = await makeRequest(requestType.GET, "api/product/v2/products");
	return res.json();
}

export async function getProduct(id: string): Promise<Product>{
	let res = await makeRequest(requestType.GET, `api/product/${id}`);
	return res.json();
}

export async function createProduct(input: ProductInfo): Promise<string> {
	const res = await makeRequest(requestType.POST, "api/product/", JSON.stringify({...input}));
	return await res.json();
}

export async function modifyProduct(id: string, input: ProductInfo) {
	return await makeRequest(requestType.POST, `api/product/${id}`, JSON.stringify({...input}));
}

