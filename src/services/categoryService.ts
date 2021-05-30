import makeRequest, { requestType } from "./fetcher";

export async function getCategories() {
	let res = await makeRequest(requestType.GET, "api/category") ;
	res = await res.json();
	return res;
}
