import { NextApiRequest, NextApiResponse } from "next";


interface StatusAndOrData {
	status?: number;
	data?: any;
}

type HandlerReturnValue = StatusAndOrData | void;

type MethodHandler = (
	req: NextApiRequest
) => (HandlerReturnValue | Promise<HandlerReturnValue>)

type APIHandler = (
	req: NextApiRequest,
	res: NextApiResponse,
) => Promise<NextApiResponse>

export const requestHandler = (
	methodHandlers: {
		[key: string]: MethodHandler
	}
): APIHandler => {
	const apiHandler: APIHandler = async (req, res) => {
		try {
			const { method } = req;
			const handler = method ? methodHandlers[method] : null;

			if (typeof handler !== "function") {
				res.setHeader('Allow',
					Object.keys(methodHandlers)
				);
				res.status(405).end(`Method ${method} Not Allowed`);
			} else {
				const handlerReturnValue = await handler(req);
				let status = handlerReturnValue?.status || 200;
				let data = handlerReturnValue?.data;

				res.status(status);
				if (data !== null && data !== undefined) {
					res.json(data);
				}
			}
		} catch (e) {
			console.error('Request error', e);
			res.status(500);
		} finally {
			return res.end();
		}
	};
	return apiHandler;
};
