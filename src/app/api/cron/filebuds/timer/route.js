import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

const filebuds = axios.create({
	baseURL: `https://${process.env.FILEBUDS_DOMAIN}`,
	headers: { 'Content-Type': 'application/json;charset=UTF-8' },
	params: {
		apikey: process.env.FILEBUDS_SECRET_KEY
	}
});

/** @param {NextRequest} request */
export async function GET(request) {
	const apiKey = request.headers.get('authorization')?.replace('Bearer ', '');

	if (apiKey === process.env.CRON_SECRET) {
		let data;

		await filebuds
			.get('/internal/logs')
			.then((response) => {
				data = response?.data?.data || null;
			})
			.catch(() => {
				data = null;
			});

		return NextResponse.json(
			{ status: 'success', code: 200, data },
			{ status: 200 }
		);
	}

	return NextResponse.json(
		{ status: 'error', code: 401, message: 'Authorization required' },
		{ status: 401 }
	);
}
