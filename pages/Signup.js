import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/signup.module.scss";
import sss from "../styles/test.module.scss";
import btnStyles from "../styles/buttonTest.module.css";
import Image from 'next/image';
import axios from "axios";

async function createUser(
    name,
    password,
    passwordChack,
    nickname,
    date,
    gender,
    gprofile,
    bprofile
) {
    console.log(JSON.stringify({ name, password, passwordChack, nickname, date, gender, gprofile, bprofile }),)

    //CREATE ==  POST
    //READ == GET
    //UPDATE == PUT
    //DELETE == DELETE
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, password, passwordChack, nickname, date, gender, gprofile, bprofile }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
    }

    return data;
}


export default function Signup(props) {

    const [formStatus, setFormStatus] = useState();
    const [idchack, setIdchack] = useState();


    const [genderBtn, setGenderBtn] = useState(false);
    const [ddaybtn, setDdayBtn] = useState(false)


    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordChackInputRef = useRef();
    const nicknameInputRef = useRef();
    const dateInputRef = useRef();

    const [enteredGender, setEnteredGender] = useState();


    const GmainImg = useRef();
    const BmainImg = useRef();

    const { status } = useSession();
    console.log(status)
    const router = useRouter();

    async function submitHandler(e) {
        e.preventDefault();

        const enteredName = nameInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;
        const enteredPasswordChack = passwordChackInputRef.current?.value;
        const enteredNickname = nicknameInputRef.current?.value;
        const enteredDate = dateInputRef.current?.value;

        const enteredGmainImg = GmainImg.current?.value;
        const enteredBmainImg = BmainImg.current?.value;

        // console.log(GmainImg.current?.value)

        try {
            const result = await createUser(
                enteredName,
                enteredPassword,
                enteredPasswordChack,
                enteredNickname,
                enteredDate,
                enteredGender,
                enteredGmainImg,
                enteredBmainImg,
            );
            // console.log(result);
            setFormStatus(result.message);
            // window.location.href = "/";
            router.replace("/");
        } catch (error) {
            // console.log(error);
            setFormStatus(error.message);
        }
    }


    //로그인 되어있는데 회원가입을 누르면
    if (status === "authenticated") {
        router.replace("/");
    }

    //아이디 중복확인
    async function IDchack() {
        let target = nameInputRef.current.value;
        await axios.get('/api/auth/signup', {
            params: {
                id: target
            }
        }).then((aa) => {
            setIdchack(aa.data.message)
        })
        if (target == '') {
            setIdchack('아이디를 입력해주세요')
        }

    }


    const toggle = () => {
        setDdayBtn(ddaybtn => !ddaybtn);
        // console.log(ddaybtn)
        if (ddaybtn === false) {
            // console.log('달력닫기')
            dateInputRef.current.disabled = true;
            dateInputRef.current.type = 'text'
            dateInputRef.current.value = '미정 입니다.'
        } else {
            dateInputRef.current.disabled = false;
            dateInputRef.current.type = 'date'
        }
    }

    function bbbb(e) {
        setGenderBtn(true);
        setEnteredGender('신부');
    }

    function gggg() {
        setGenderBtn(false);
        setEnteredGender('신랑');
    }





    function GchangeImg(e) {
        var newImg = e.target.src;
        GmainImg.current.src = newImg;
        var imgURL = e.target.alt;
        GmainImg.current.value = imgURL;
        if (genderBtn === true) {
            BmainImg.current.value = '';
        }
        // console.log(GmainImg.current.value)
    }

    function BchangeImg(e) {
        var newImg = e.target.src;
        BmainImg.current.src = newImg;
        var imgURL = e.target.alt;
        BmainImg.current.value = imgURL;
        // console.log(BmainImg.current.value)
        if (genderBtn !== true) {
            GmainImg.current.value = '';
        }
    }


    return (
        <div className={styles.SignupPage}>
            <div className={styles.smile}><Image src="/img/edit/smile.png" width={100} height={100} alt='' ></Image></div>
            <div className={styles.Logo}>
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={submitHandler}>
                {/* 이름 */}
                <div className={styles.Name}>
                    <label htmlFor="name">
                        아이디
                    </label><br></br>
                    <input
                        id="name"
                        type="text"
                        placeholder="아이디를 입력해 주세요"
                        required
                        ref={nameInputRef}
                    /><button type="button" onClick={IDchack}>중복확인</button>
                    <p>{idchack}</p>
                </div>
                {/* 비밀번호 */}
                <div className={styles.password}>
                    <label htmlFor="password">
                        비밀번호
                    </label><br></br>
                    <input
                        id="password"
                        type="password"
                        required
                        ref={passwordInputRef}
                    />


                </div>
                {/* 비밀번호 확인 */}
                <div className={styles.passwordChack}>
                    <label htmlFor="passwordChack">
                        비밀번호 확인
                    </label><br></br>
                    <input
                        id="passwordChack"
                        type="password"
                        required
                        ref={passwordChackInputRef}
                    />
                </div>
                {/* 닉네임 */}
                <div className={styles.nickname}>
                    <label htmlFor="nickname">
                        닉네임
                    </label><br></br>
                    <input
                        id="nickname"
                        type="text"
                        placeholder="닉네임"
                        required
                        ref={nicknameInputRef}
                    /><button type="button">중복확인</button>
                </div>

                {/* 성별 */}
                <div className={styles.Gender}>
                    <p>본인선택</p>
                    <div className={styles.genbtn}>
                        <input
                            value='신부'
                            type='button'
                            onClick={bbbb}
                            className={genderBtn === true ? `${styles.btn} ${styles.active}` : `${styles.btn}`} />
                        <input
                            value='신랑'
                            type="button"
                            className={genderBtn === false ? `${styles.btn} ${styles.active}` : `${styles.btn}`}
                            onClick={gggg} />
                    </div>
                </div>

                {/* 예식일 */}
                <div className={styles.d_day}>
                    <p>예식일</p>
                    <div className={styles.ddaycont}>
                        <input
                            type="date"
                            ref={dateInputRef} />
                        <button
                            type="button"
                            onClick={() => toggle()}
                            className={ddaybtn === false ? `${styles.bttn} ${styles.active}` : `${styles.bttn}`}>
                            아직 결정 되지 않았어요</button>
                    </div>
                </div>

                {/* 프로필 */}
                <div className={styles.profile}>
                    <label for="profile">프로필</label>

                    <div className={genderBtn === true ? `${styles.proCont}` : `${styles.proCont} ${styles.active}`}>
                        <div className={styles.left}>
                            <img ref={GmainImg} src="/img/signup/1.png" className={styles.profile} />
                        </div>
                        <div className={styles.right}>
                            <img onClick={GchangeImg} src="/img/signup/1.png" alt="https://ifh.cc/g/7J9o2a.png" />
                            <img onClick={GchangeImg} src="/img/signup/2.png" alt="https://ifh.cc/g/wnMccv.png" />
                            <img onClick={GchangeImg} src="/img/signup/3.png" alt="https://ifh.cc/g/0jQwno.png" />
                            <img onClick={GchangeImg} src="/img/signup/4.png" alt="https://ifh.cc/g/SJysRT.png" />
                        </div>
                    </div>

                    <div className={genderBtn === true ? `${styles.proCont} ${styles.active}` : `${styles.proCont} `}>
                        <div className={styles.left}>
                            <img ref={BmainImg} src="/img/signup/5.png" className={styles.profile} />
                        </div>
                        <div className={styles.right}>
                            <img onClick={BchangeImg} src="/img/signup/5.png" alt="https://ifh.cc/g/NXQr7r.png" />
                            <img onClick={BchangeImg} src="/img/signup/6.png" alt="https://ifh.cc/g/WGWaT7.png" />
                            <img onClick={BchangeImg} src="/img/signup/7.png" alt="https://ifh.cc/g/YYyjdl.png" />
                            <img onClick={BchangeImg} src="/img/signup/8.png" alt="https://ifh.cc/g/Sd2a5V.png" />
                        </div>
                    </div>
                </div>

                {/* 신부프로필
                    1. https://ifh.cc/g/7J9o2a.png
                    2. https://ifh.cc/g/wnMccv.png
                    3. https://ifh.cc/g/0jQwno.png
                    4. https://ifh.cc/g/SJysRT.png
                    신랑프로필
                    5. https://ifh.cc/g/NXQr7r.png
                    6. https://ifh.cc/g/WGWaT7.png
                    7. https://ifh.cc/g/YYyjdl.png
                    8. https://ifh.cc/g/Sd2a5V.png */}

                <p>
                    {formStatus}
                </p>

                <div className={btnStyles.wrapper}>
                    <div className={btnStyles.container}>
                        <button
                            type="submit"
                            className={`${btnStyles.button} ${btnStyles.btnPush} ${btnStyles.btnBlueGreen}`}>SIGN UP
                        </button>
                    </div>
                </div >
            </form >
        </div >
    );
};
