import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {
    // Loading prisma client
    let prisma = new PrismaClient();
    // console.log(req.body)

    if (req.method === 'POST') {
        const data = req.body;
        const { name, password, passwordChack, nickname, date, gender, gprofile, bprofile } = data;
        // console.log(data)

        if (!gprofile && !bprofile) {
            res.status(422).json({
                message:
                    '프로필을 선택해주세요.',
                error: true,
            });
            return;
        }

        if (name.trim().length < 4) {
            res.status(422).json({
                message:
                    '아이디는 4자 이상이어야 합니다.',
                error: true,
            });
            return;
        }

        if (!date) {
            res.status(422).json({
                message:
                    '예식일을 설정해주세요.',
                error: true,
            });
            return;
        }

        if (password.trim().length < 4) {
            res.status(422).json({
                message:
                    '비밀번호는 4자 이상이어야 합니다.',
                error: true,
            });
            return;
        }

        if (password !== passwordChack) {
            res.status(422).json({
                message:
                    '비밀번호를 동일하게 입력하세요.',
                error: true,
            });
            return;
        }

        const idChack = await prisma.users.findUnique({
            where: {
                name: name,
            },
        });
        if (idChack) {
            res.status(422).json({
                message: '아이디가 이미 존재합니다.',
                error: true
            });
            return;
        }

        //비밀번호 암호화
        const hashedPassword = await hashPassword(password);


        const result = await prisma.users.create({
            data: {
                name: name,
                nickname: nickname,
                password: hashedPassword,
                date: date,
                gender: gender,
                gprofile: gprofile,
                bprofile: bprofile
            },
        });

        if (result) {
            res.status(201).json({ message: 'Created user!', error: false });
        } else {
            res.status(422).json({ message: 'Prisma error occured', error: true })
        }

    }

    if (req.method === 'GET') {

        try {
            const user = await prisma.users.findUnique({
                where: {
                    name: req.query.id
                }
            })
            // console.log(user)
            if (user) {
                res.json({ message: '이미 등록된 아이디 입니다.' })
            }
            else {
                res.json({ message: '사용 가능한 아이디 입니다.' })
            }

        }
        catch (err) {
            res.send(err);
        }
    }

    // if (req.method === 'GET') {
    //     try {
    //         const users = await prisma.users.findMany()
    //         res.json(users)
    //     } catch (err) {
    //         res.send(err)
    //     }
    // }

}




export default handler; 