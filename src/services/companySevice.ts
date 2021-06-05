import makeRequest, { requestType } from "./fetcher";

export interface CompaniesInfo {
	numberOfCompanies: number
}

export interface Company {
    id:   string;
    name: string;
}


export async function getCompanies(): Promise<Company[]>{
	let res = await makeRequest(requestType.GET, "api/company");
	console.log(res)
	return res.json();
}


export async function getCompaniesInfo(): Promise<CompaniesInfo>{
	let res = await makeRequest(requestType.GET, "api/company/info") ;
	return res.json();
}