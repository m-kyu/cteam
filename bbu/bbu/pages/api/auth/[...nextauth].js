import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../../../lib/auth";

let prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "유저 이메일,페스워드 방식",
            // credentials: {
            //     name: { label: "유저 이메일", type: "text"},
            //     password: { label: "패스워드", type: "password" },
            // },
            credentials: {
                name: "ehdehd",
                password: "123456789",
            },
            //로그인을 담당하고 있는ㅂ부분
            async authorize(credentials) {
                const user = await prisma.users.findUnique({
                    where: {
                        name: String(credentials.name),
                    },
                    select: {
                        name: true, password: true
                    },
                });

                if (!user) {
                    throw new Error('아이디가  틀렸습니다.');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw new Error('비밀번호가 틀렸습니다.');
                }
                return { name: user.name };
                //, email: user.email
            }
        })
    ],


    //session에 정보 뿌려주기
    callbacks: {
        async session({ session }) {
            //login이라는 변수를 만들어주고  = prisma안에 users테입블을 찾는다. findUnique(id, email)
            const login = await prisma.users.findUnique({
                //어디 ? email === session안에 user안에 email
                where: {
                    name: session.user.name
                },
                select: {
                    name: true,
                    nickname: true,
                }
            })
            session.user = login;
            return session
        }
    }

    //await == 동기 > 순서대로 

})