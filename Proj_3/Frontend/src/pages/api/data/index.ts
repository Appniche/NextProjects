const testres = [
	{
		msg : "This is test ",
	}
];

export async function GET() {
	return new Response(JSON.stringify(testres),{
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
