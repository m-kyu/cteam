import React, { useRef, useState } from 'react'
import styles from '@/styles/quiz.module.scss'

const Quiz = () => {
 const [bg,setBg]=useState(true);
 const [collect,setCollect]=useState([]);

function addData(e) {
  console.log(e.target.id)
  setCollect(enter => [...enter, e.target.id])

}
console.log(collect)

  return (
    <main className={styles.main}>
      <div className={styles.back}>
        <div className={bg?`${styles.container}`:`${styles.container} ${styles.noneContainer}`}>
          <section className={styles.start} >
            <p>Move to Quiz</p>
            <p>Choose a better one</p>
            <div className={styles.btn} onClick={() => setBg(false)}>
              <p>Get Started</p>
              <img className={styles.rocket} src='/img/quiz/rocket.png' />
              <img src='/img/quiz/rcloud.png' />
            </div>
          </section>
          <section className={`${styles.content01} ${styles.balance}`}>
            <button id='분리수거하기' onClick={(id)=> addData(id)}>분리수거하기</button>
            <button id='청소하기' onClick={(id)=> addData(id)}>청소하기</button>
          </section>
          <section className={`${styles.content02} ${styles.balance}`}>
            <button id='요리하기' onClick={(id)=> addData(id)}>요리하기</button>
            <button id='설거지하기' onClick={(id)=> addData(id)}>설거지하기</button>
          </section>
          <section className={`${styles.content03} ${styles.balance}`}>
            <button id='음식물쓰레기 버리기' onClick={(id)=> addData(id)}>음식물쓰레기 버리기</button>
            <button id='화장실청소' onClick={(id)=> addData(id)}>화장실청소</button>
          </section>
          <section className={`${styles.content04} ${styles.balance}`}>
            <button id='몰아서 치우기' onClick={(id)=> addData(id)}>몰아서 치우기</button>
            <button id='눈에보이면 당장 치우기' onClick={(id)=> addData(id)}>눈에보이면 당장 치우기</button>
          </section>
          <section className={`${styles.content05} ${styles.balance}`}>
            <button id='직접해먹기' onClick={(id)=> addData(id)}>직접해먹기</button>
            <button id='배달시키기' onClick={(id)=> addData(id)}>배달시키기</button>
          </section>
          <section className={`${styles.content05} ${styles.balance}`}>
            <button id='쩝쩝소리' onClick={(id)=> addData(id)}>쩝쩝소리</button>
            <button id='질질흘리기' onClick={(id)=> addData(id)}>질질흘리기</button>
          </section>
          <section className={`${styles.content05} ${styles.balance}`}>
            <button id='간단히 먹기' onClick={(id)=> addData(id)}>간단히 먹기</button>
            <button id='잘 차려먹기' onClick={(id)=> addData(id)}>잘 차려먹기</button>
          </section>
          <section className={`${styles.content05} ${styles.balance}`}>
            <button id='외출' onClick={(id)=> addData(id)}>외출</button>
            <button id='집콕' onClick={(id)=> addData(id)}>집콕</button>
          </section>
          <section className={`${styles.content05} ${styles.balance}`}>
            <button id='추운 느낌' onClick={(id)=> addData(id)}>추운 느낌</button>
            <button id='더운 느낌' onClick={(id)=> addData(id)}>더운 느낌</button>
          </section>
          <section className={`${styles.content05} ${styles.balance}`}>
            <button id='집에오면 바로 씻기' onClick={(id)=> addData(id)}>집에 오면 바로 씻기</button>
            <button id='자기전에 씻기' onClick={(id)=> addData(id)}>자기전에 씻기</button>
          </section>
          <section className={`${styles.content05} ${styles.balance}`}>
            <button id='같이 공유' onClick={(id)=> addData(id)}>같이 공유</button>
            <button id='각자 알아서' onClick={(id)=> addData(id)}>각자 알아서</button>
          </section>
          <section className={`${styles.content05} ${styles.balance}`}>
            <button id='마음이 담긴 꽃이나 편지' onClick={(id)=> addData(id)}>마음이 담긴 꽃이나 편지</button>
            <button id='실용적인 선물이나 현물' onClick={(id)=> addData(id)}>실용적인 선물이나 현물</button>
          </section>
          <section className={`${styles.content05} ${styles.balance}`}>
            <button id='딸' onClick={(id)=> addData(id)}>딸</button>
            <button id='아들' onClick={(id)=> addData(id)}>아들</button>
          </section>
        </div>
      </div>
      <div className={styles.bottom}></div>
    </main>
  )
}

export default Quiz