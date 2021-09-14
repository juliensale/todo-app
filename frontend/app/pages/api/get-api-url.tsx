import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		try {
			const apiUrl = process.env.API_URL || ''
			if (!apiUrl) {
				return res.status(500).json('Server error.')
			}
			const data = { apiUrl }
			return res.status(200).json(data)

		} catch {
			return res.status(500).json('Server error.')
		}
	}
	return res.status(405).json('Method Denied')
}