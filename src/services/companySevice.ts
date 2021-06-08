import makeRequest, {requestType} from "./fetcher";

export interface CompaniesInfo {
	numberOfCompanies: number
}

export interface CompanyInfo {
    id:   string;
    name: string;
}

export async function getCompany(id: string): Promise<CompanyInfo> {
	let res = await makeRequest(requestType.GET, `api/company/${id}`);
	return res.json();
}

export async function getCompanies(): Promise<CompanyInfo[]> {
	let res = await makeRequest(requestType.GET, "api/company");
	return res.json();
}

export async function getCompaniesInfo(): Promise<CompaniesInfo> {
	let res = await makeRequest(requestType.GET, "api/company/info") ;
	return res.json();
}

export async function createCompany(name: string) {
	return await makeRequest(requestType.POST, 'api/company', JSON.stringify({name}));
}

export async function modifyCompany(id: string, name: string) {
	return await makeRequest(requestType.POST, `api/company/${id}`, JSON.stringify({name}));
}