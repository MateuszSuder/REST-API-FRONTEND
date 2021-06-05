import makeRequest, { requestType } from "./fetcher";


export type categories = {
	categoryName: string
}

export async function getCategories(): Promise<categories[]> {
	let res = await makeRequest(requestType.GET, "api/category") ;
	return res.json();
}
