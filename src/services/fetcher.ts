import { GridSize } from "@material-ui/core";

export interface formInputs {
	create: Array<formGroup>,
	modify: Array<formGroup>
}

export interface formGroup {
	groupTitle?: string,
	gridSize: GridSize,
	items: Array<formItem>
}

export interface formItem {
	title: string,
	name: string,
	type?: inputType, //default text
	required?: boolean,
	disabled?: boolean
	values?: Array<any>
}

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
