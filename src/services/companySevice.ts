import makeRequest, { requestType } from "./fetcher";

export interface CompaniesInfo {
	numberOfCompanies: number
}


export async function getCompaniesInfo(): Promise<CompaniesInfo>{
	let res = await makeRequest(requestType.GET, "api/company/info") ;
	return res.json();
}