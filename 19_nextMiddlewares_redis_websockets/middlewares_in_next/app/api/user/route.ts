import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	console.log(`Request method: ${request.method}`);
	const responseBody = {
		message: `Hi there!`,
	};
	return NextResponse.json(responseBody);
}
