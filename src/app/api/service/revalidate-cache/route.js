import { NextResponse, NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/** @param {NextRequest} request */
export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const apiKeyParam = searchParams.get('apiKey');

    if (apiKeyParam === process.env.API_KEY) {
        const processed = [];
        const tagParam = searchParams.get('tag');
        const pathParam = searchParams.get('path');

        if (tagParam) {
            revalidateTag(tagParam);
            processed.push({ tag: tagParam })
        }

        if (pathParam) {
            revalidatePath(pathParam);
            processed.push({ path: pathParam });
        }

        return NextResponse.json({ status: 'success', code: 200, data: processed }, { status: 200 });
    }

    return NextResponse.json({ status: 'error', code: 401, message: 'Authorization required' }, { status: 401 });
}