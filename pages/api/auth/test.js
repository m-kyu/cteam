import { PrismaClient } from '@prisma/client';

async function handler(req, res) {
    // Loading prisma client
    let prisma = new PrismaClient();
    // console.log(req.body)


    if (req.method === 'GET') {
        const user = await prisma.users.findMany({})
        // console.log(user)
        res.json(user)
    }
    
}

export default handler; 