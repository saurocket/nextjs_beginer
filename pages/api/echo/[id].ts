import {NextApiRequest, NextApiResponse} from "next";


interface MessageNextApiRequest extends NextApiRequest{
    query: {
        id: string
    }
}
type JsonResponse = {
    yourId: string
}
interface MessageNextApiResponse extends NextApiResponse{
    json(body: JsonResponse): ()=> void
}

export default function getById(req:MessageNextApiRequest,res:NextApiResponse) {
    // req.statusConde = 200
    // res.setHeader('Content-Type', 'application/json')
    // res.end(req.query.id)
    res.json({"Your id": req.query.id})
}