import React, { useContext, useState,  useEffect } from 'react'
import { useRouter } from 'next/router';
import { DbContext } from './component/MyContext';
import styles from '@/styles/community.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const Write = () => {
    const {dataFun, userInfo} = useContext(DbContext);
    const router = useRouter();

    console.log(userInfo);

    const userProfile = userInfo?.gender === "신부" ? userInfo?.gprofile : userInfo?.bprofile;
    const sampleTimestamp = Date.now();
    const date = new Date(sampleTimestamp); 
    const year = date.getFullYear().toString().slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2); 
    const returnDate = year + "-" + month + "-" + day + " " + hour + ":" + minute;

    const initial = { title: '', text: '', date: returnDate };
    const [inputValue, setValue] = useState(initial);

    const create =(e) => {
         e.preventDefault();
        dataFun('post',{ profile:userProfile, nickname:userInfo.nickname, name:userInfo.name, ...inputValue });
        router.push('/Community');
    }

    const valueChange = (e) => {
        let t = e.target;
        setValue((obj) => {
            return { ...obj, [t.name]: t.value }
        })
    }

    return (
        <>
            <div className="H1" style={{marginBottom:"80px"}}>WRITE</div>

            <div className={styles.bg01}>
                <Image src="/img/community/communitybg.png" alt='' width={400} height={160}/>
            </div>
            <div className={styles.bg02}>
                <Image src="/img/community/communitybg.png" alt='' width={400} height={160}/>
            </div>

            <article className={styles.container} style={{height:"55vh"}}>
                <form onSubmit={create}>
                    <input
                        className={styles.title}
                        onChange={valueChange} 
                        type="text" 
                        placeholder='제목을 입력해주세요' 
                        name="title" 
                    />
                    <textarea 
                        className={styles.text}
                        onChange={valueChange} 
                        type="text" 
                        placeholder='내용을 입력해주세요' 
                        name="text" 
                    />
                    <input 
                        className={styles.submit}
                        type="submit" 
                        value="저장" 
                    />
                </form>

                <div className={styles.sidebarW}> 
                    <button 
                        className={styles.slide} 
                        onClick={()=> {router.push("/Community")}}
                    >
                        돌아가기
                    </button>
                    <div className={styles.sidebarI}>
                        <Image src="/img/community/iiiii.gif" alt='' width={55} height={55}/>
                    </div>
                </div>

            </article>
        </>
    )
}

export default Write