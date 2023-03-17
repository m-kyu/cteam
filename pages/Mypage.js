import React, { useContext, useEffect, useState } from 'react'
import styles from '@/styles/mypage.module.scss'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { DbContext } from './component/MyContext'

const Mypage = () => {
  const {quizData, userInfo,data} = useContext(DbContext);
  const {data:session, status} =useSession();
  const keydata = require('public/data/data.json');
  const [keywords, setKeywords] = useState()

  const date = new Date(userInfo?.date);
  const today = new Date();
  const diffTime = date?.getTime()-today.getTime(); 
  const diffDay =  Math.ceil(diffTime/(1000*60*60*24));

  console.log(data,userInfo)

  // const myData = data.filter((obj)=>{
  //   obj.nickname === userInfo.nickname
  // })
  // console.log(myData);


  useEffect(()=>{

    if(quizData.length){
      let kw,kwArr=[], db = quizData[quizData.length-1];
      keydata.forEach((obj,key) => {
        if(obj.answera == db[`q0${key+1}`] ){
          kw = (db.gender == '신부') ? obj.keywordag : obj.keywordab
        }else{
          kw = (db.gender == '신부') ? obj.keywordbg : obj.keywordbb
        }
        kwArr[key] = kw;
      });

      setKeywords(kwArr)
    }
  },[quizData])


  return (
    <main className={styles.main}>
      <div className={styles.mainWidth}>
        <div className={styles.top}>
          <img className={styles.icon01} src='/img/mypage/icon01.png' />
          <img className={styles.icon02} src='/img/mypage/icon02.png' />
          <div className={styles.box01}>
            <p>안녕하세요 <br className={styles.br} />{userInfo?.nickname} 님의 마이룸 입니다</p>
            <div className={styles.icon03}>
              <img src='/img/mypage/face01.png' />
              <img src='/img/mypage/face02.png' />
              <img src='/img/mypage/face03.png' />
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <Link href="/Edit">
            <img src='/img/mypage/set.png' />
          </Link>
          <div className={styles.middle}>
            <div className={styles.dday}>
              <p>결혼식까지<br /><span>{diffDay}일</span><br />남았습니다</p> 
            </div>
            <div className={styles.character}>
              <div className={styles.charTitle}>취향분석표</div>
              <div className={styles.collect}>
                <ul>
                  {
                    keywords&&keywords.map((item,key) => (
                      <li key={key}>#{item}</li>
                    ))
                  }
                </ul>
  myData            </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.btn}>
              <button>내가 쓴글</button>
              <button>좋아요</button>
            </div>
            <div className={styles.container}>
              <div className={styles.content}></div>
              <div className={styles.content}></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Mypage