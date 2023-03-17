import React, { useContext, useEffect, useState } from 'react'
import styles from '@/styles/quiz.module.scss'
import Link from 'next/link';
import { DbContext } from './component/MyContext';
import { useRouter } from 'next/router';

const Quiz = () => {
  const {userInfo, quizDataFun, quizData} = useContext(DbContext);
  const [bg,setBg]=useState(true);
  const [collect,setCollect]=useState([]);
  const [quizNum,setQuizNum]=useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const data = require('public/data/data.json')
  const router = useRouter();

  //하트
  function heartff (){
   
    const easeOutQuart = "cubic-bezier(0.165, 0.84, 0.44, 1)";
    const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
    const btnHearts = document.querySelectorAll(".btn-heart");
    const createParticle = (x, y) => {
    const width = randomNumberInRange(6, 36);
    const tx = randomNumberInRange(-360, 360);
    const ty = randomNumberInRange(-360, 360);
    const rz = randomNumberInRange(0, 480);
    const delay = randomNumberInRange(0, 240);
    const duration = randomNumberInRange(1000, 5000);
    const particle = document.createElement("div");
    particle.className = "heart";
    document.body.appendChild(particle);
    const anime = particle.animate(
        [
        {
            opacity: 1,
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(-45deg)`
        },
        {
            opacity: 0,
            transform: `translate(-50%, -50%) translate(${x + tx}px, ${y + ty}px) rotate(${-45 + rz}deg)`
        }
        ],
        {
        duration,
        delay,
        easing: easeOutQuart
        }
    );
    anime.onfinish = (e) => e.srcElement.effect.target.remove();
    };
    const createParticles = (x, y, n) => {
    for (let i = 0; i < n; i++) {
        createParticle(x, y);
    }
    };
  btnHearts.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log('sdfsfs')
        const x = e.clientX;
        const y = e.clientY + window.scrollY;
        createParticles(x, y, 50);
    });
  });
  }
  
  //버튼 값 담아두기
  function addData(text) {
    
    setCollect(enter => [...enter, text])
  }

//버튼클릭시 1씩증가
function increaseQuizNum() {
  setQuizNum(prevNum => prevNum + 1);

  
}

//마지막 선택한 값 보여주기
function showResults() {
  setBg(false);
}

//인트로 화면 보여주기
useEffect(() => {
  setTimeout(() => {
    setShowIntro(false);
  }, 1500);
}, []);

async function insert(collect){
  console.log(collect)
  const nick=userInfo.nickname;
  const gen=userInfo.gender;
  await quizDataFun('post',{nick, gen,collect});
  router.push('/Mypage')
}

if(quizNum == 13){
  setTimeout(()=>{
    heartff();
  },500)
}

if (showIntro) {
  return (
    <div className={styles.intro}>
      <img className={styles.bbu} src='/img/quiz/bbu.png' />
      <img className={styles.front} src='/img/quiz/introFront.png' />
    </div>
  );
}

if (quizNum === 13) {
  return (
    <main className={bg?`${styles.main} ${styles.noneResult}`:`${styles.main}`}>
      <div className={styles.result}>
        <div className={styles.computer}>
          <div className={styles.icon}>
            <img src='/img/quiz/icon01.png'/>
            <img src='/img/quiz/icon02.png'/>
            <img src='/img/quiz/icon03.png'/>
          </div>
          <button className="btn btn-danger btn-heart">
            <div className={styles.resultContainer} onClick={() => setBg(true)}>
              <p>내 결과 저장</p>
                <img src='/img/quiz/heart.png' />
            </div>
          </button>
        </div>
        <div className={styles.vase}>
          <img className={styles.rstem} src='/img/quiz/rightStem.png'/>
          <img className={styles.lstem} src='/img/quiz/leftStem.png'/>
          <img className={styles.fvase} src='/img/quiz/vase.png'/>
          <img className={styles.rflower} src='/img/quiz/rightFlower.png'/>
          <img className={styles.lflower} src='/img/quiz/leftFlower.png'/>
        </div> 
        <div className={styles.candle}>
          <img src='/img/quiz/candlelight.png'/>
        </div>
        <div className={styles.post}>
          <h2>MY CHOICE</h2>
          {
            collect.map((item,key) => (
              <p key={key}>{item}</p>
            ))
          }
        </div>
      </div>
      <div className={styles.last}>
        <div className={styles.computer}>
          <div className={styles.icon}>
            <img src='/img/quiz/icon01.png'/>
            <img src='/img/quiz/icon02.png'/>
            <img src='/img/quiz/icon03.png'/>
          </div>
          <div className={styles.resultContainer} onClick={()=> insert(collect)}>
            <p>마이페이지로</p>
           
              <img src='/img/quiz/screen.png' />
           
        </div>
        </div>
        <div className={styles.vase}>
          <img className={styles.rstem} src='/img/quiz/rightStem.png'/>
          <img className={styles.lstem} src='/img/quiz/leftStem.png'/>
          <img className={styles.fvase} src='/img/quiz/vase.png'/>
          <img className={styles.rflower} src='/img/quiz/rightFlower.png'/>
          <img className={styles.lflower} src='/img/quiz/leftFlower.png'/>
        </div> 
        <div className={styles.candle}>
          <img src='/img/quiz/candlelight.png'/>
        </div>
        <div className={styles.post}>
          <h2>MY CHOICE</h2>
          {
            collect.map((item,key) => (
              <p key={key}>{item}</p>
            ))
          }
        </div>
      </div>
    </main> 
  );
}
  return (
    <main className={styles.main}>
      <div className={styles.back}>
        <div className={bg?`${styles.container}`:`${styles.container} ${styles.noneContainer}`}>
          <section className={styles.start} >
            <div className={styles.computer}>
              <div className={styles.icon}>
                <img src='/img/quiz/icon01.png'/>
                <img src='/img/quiz/icon02.png'/>
                <img src='/img/quiz/icon03.png'/>
              </div>
              <div className={styles.hscreen}>
                <img src='/img/quiz/heartscreen.png'/>
              </div>
              <div className={styles.screen} onClick={() => setBg(false)}>
                <img src='/img/quiz/screen.png'/>
                <p>MOVE TO QUIZ</p> 
              </div>
            </div>
            <div className={styles.vase}>
              <img className={styles.rstem} src='/img/quiz/rightStem.png'/>
              <img className={styles.lstem} src='/img/quiz/leftStem.png'/>
              <img className={styles.fvase} src='/img/quiz/vase.png'/>
              <img className={styles.rflower} src='/img/quiz/rightFlower.png'/>
              <img className={styles.lflower} src='/img/quiz/leftFlower.png'/>
            </div>
            <div className={styles.candle}>
              <img src='/img/quiz/candlelight.png'/>
            </div>
            <div className={styles.post}>
              <h2>MY CHOICE</h2>
            </div>
          </section>  
          <section className={styles.balance}>
            <div className={styles.computer}>
              <div className={styles.icon}>
                <img src='/img/quiz/icon01.png'/>
                <img src='/img/quiz/icon02.png'/>
                <img src='/img/quiz/icon03.png'/>
              </div>
              <h2>{data[quizNum].title}</h2>
              <div className={styles.screen}>
                <div className={styles.screen01}>
                  <button onClick={() => {addData(data[quizNum].answera);increaseQuizNum();if(quizNum === 12){showResults();}}}>{data[quizNum].answera}</button>
                </div>
                <div className={styles.screen02}>
                  <button onClick={() => {addData(data[quizNum].answerb);increaseQuizNum();if(quizNum === 12){showResults();}}}>{data[quizNum].answerb}</button>
                </div>
              </div>
            </div>
            <div className={styles.vase}>
              <img className={styles.rstem} src='/img/quiz/rightStem.png'/>
              <img className={styles.lstem} src='/img/quiz/leftStem.png'/>
              <img className={styles.fvase} src='/img/quiz/vase.png'/>
              <img className={styles.rflower} src='/img/quiz/rightFlower.png'/>
              <img className={styles.lflower} src='/img/quiz/leftFlower.png'/>
            </div> 
            <div className={styles.candle}>
              <img src='/img/quiz/candlelight.png'/>
            </div>
            <div className={styles.post}>
              <h2>MY CHOICE</h2>
              {
                collect.map((item,key) => (
                  <p key={key}>{item}</p>
                ))
              }
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Quiz