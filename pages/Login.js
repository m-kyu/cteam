import React, { useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/login.module.scss";
import Image from 'next/image';

export default function Login(props) {
    const [formStatus, setFormStatus] = useState();

    const nameInputRef = useRef();
    const passwordInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;

        console.log(enteredName, enteredPassword)
        const result = await signIn("credentials", {
            redirect: false,
            name: enteredName,
            password: enteredPassword,
            // callbackUrl: '/'
        });

        if (!result.error) {
            console.log('성공')
            setFormStatus(`로그인 성공!`);
            router.replace("/");
        } else {
            setFormStatus(result.error);
        }
    } // end of submitHandler function

    const { data: session, status } = useSession();
    const router = useRouter();


    //로그인이 되어있으면 index페이지로
    if (status === "authenticated") {
        // router.replace("/");
        // return (
        //     <div>
        //         <h1>Log in</h1>
        //         <div>You are already logged in.</div>
        //         <div>Now redirect to main page.</div>
        //     </div>
        // );
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.smile}><Image src="/img/edit/smile.png" width={100} height={100} alt='' ></Image></div>
            <div className={styles.Logo}>
                <h1>
                    LOGIN
                </h1>
            </div>
            <form onSubmit={submitHandler}>
                <div>
                    <input
                        id="text"
                        type="text"
                        required
                        ref={nameInputRef}
                        placeholder="아이디를 입력해 주세요"
                    />
                </div>


                <div>
                    <input
                        id="password"
                        type="password"
                        required
                        ref={passwordInputRef}
                        placeholder="비밀번호를 입력해 주세요"
                    />

                    <p>
                        {/* Please choose a password. */}
                        {formStatus}
                    </p>
                </div>
                <div className={styles.loginbtn}>
                    <button type="submit">
                        <p>LOGIN</p>
                    </button>
                </div>
            </form>

            <div className={styles.toSignup}>
                <Link href="/Signup">회원가입하러가기</Link>
            </div>
        </div>
    );
};























// =========================================================================================================
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================


// import styles from "@/styles/LoginPage.module.css";
// import btnStyles from "@/styles/buttonTest.module.css";
// import Image from 'next/image';

// export default function Login() {
//     function idChack() {
//         console.log('아이디 중복')
//     }

//     function bride() {
//         console.log('신부 클릭');
//     }
//     function groom() {
//         console.log('신랑 클릭');
//     }
//     return (
//         <div className={styles.LoginPage}>
//             <h1>SIGN UP
//                 <style jsx>{`
//                 h1{
//                     text-align: center;
//                     border: 3px solid;
//                     width: 250px;
//                     min-width : 250px
//                     height: 50px;
//                     margin : 0 auto;
//                     margin-top : 10px
//                 }
//                 `}</style>
//             </h1>

//             <div className={styles.Form}>
//                 <div className={styles.LogoBox}>
//                     <Image src="/img/smile.png" width={100} height={100} className={styles.logo} alt="logo"></Image>
//                 </div>
//                 <div className={styles.FormD}>
//                     <div className={styles.Id}>
//                         <p>아이디</p>
//                         <input type="text"></input>
//                         <button onClick={idChack}>중복확인
//                             <style jsx>{`
//                             button{
//                                 margin-left: 30px;
//                                 background-color: #79A5FF;
//                                 height: 40px;
//                                 border-radius : 20px;
//                                 border : 3px solid;
//                             }
//                             `}</style>
//                         </button>
//                     </div>

//                     <div className={styles.Password}>
//                         <p>비밀번호</p>
//                         <input type="text"></input>
//                     </div>

//                     <div className={styles.PasswordCH}>
//                         <p>비밀번호 확인</p>
//                         <input type="text"></input>
//                     </div>

//                     <div className={styles.Nn}>
//                         <p>닉네임</p>
//                         <input type="text"></input>
//                         <button>중복확인
//                             <style jsx>{`
//                             button{
//                                 margin-left: 30px;
//                                 background-color: #79A5FF;
//                                 height: 40px;
//                                 border-radius : 20px;
//                                 border : 3px solid;
//                             }
//                             `}</style>
//                         </button>
//                     </div>

//                     <div className={styles.Gender}>
//                         <p>본인선택</p>
//                         <div>
//                             <button onClick={bride}>신부님</button>
//                             <button onClick={groom}>신랑님</button>
//                         </div>
//                     </div>

//                     <div className={styles.date}>
//                         <p>예식일</p>
//                         <div>
//                             <input type="date"></input>
//                             <button>아직 결정X</button>
//                         </div>
//                     </div>

//                     <div className={styles.profile}>
//                         <p>프로필</p>
//                         <div>
//                             <div className={styles.left}></div>
//                             <div className={styles.right}>
//                                 <div><Image src="/img/smile.png" width={50} height={50}></Image></div>
//                                 <div><Image src="/img/smile.png" width={50} height={50}></Image></div>
//                                 <div><Image src="/img/smile.png" width={50} height={50}></Image></div>
//                                 <div><Image src="/img/smile.png" width={50} height={50}></Image></div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className={btnStyles.wrapper}>
//                         <div className={btnStyles.container}>
//                             <a href="" className={`${btnStyles.button} ${btnStyles.btnPush} ${btnStyles.btnBlueGreen}`}>SIGN UP
//                                 <style jsx>{`
//                             a {text-decoration: none;}
//                             `}</style>
//                             </a>
//                         </div>
//                     </div >

//                 </div>
//             </div >
//         </div>
//     )
// }
