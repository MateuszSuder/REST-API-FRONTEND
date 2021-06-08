export enum inputType {
	text,
	number,
	select
}

export enum requestType {
	GET = "GET",
	POST = "POST",
	DELETE = "DELETE"
}


const basePath = 'http://localhost:8080/';

export default async function makeRequest(request: requestType, path: string, body?: string) {
	const r = await fetch(basePath + path, {
		method: request,
		headers: {
			'Content-Type': 'application/json'
		},
		body: body
	})

	return r;
}
