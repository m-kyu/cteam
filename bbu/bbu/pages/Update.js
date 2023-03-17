
import { useRouter } from 'next/router'
import React, { useContext, useState,  useEffect } from 'react'
import { DbContext } from './component/MyContext';
import styles from '@/styles/community.module.scss'
import Image from 'next/image'

const Update = () => {
    const {dataFun} = useContext(DbContext);
    const router = useRouter();
    const { query } = router;


    let initial = { id: query.id, title: query.title, text: query.text }
    let likeB = {likeB: query.likeB}
    const [inputValue, setValue] = useState(initial);

    function valueChange(e) {
        let t = e.target;
        setValue((obj) => {
            return { ...obj, [t.name]: t.value }
        })
    }
    function create(e) {
        e.preventDefault()
        dataFun('put',{likeB,...inputValue })
        router.push('/Community');
    }

    return (
        <div>
            <div className="H1" style={{marginBottom:"80px"}} >EDIT</div>
            
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
                        value={inputValue.title} 
                        onChange={valueChange} 
                        type="text" 
                        name="title" 
                    />
                    <textarea 
                        className={styles.text}
                        value={inputValue.text} 
                        onChange={valueChange} 
                        type="text" 
                        name="text"
                    />
                    <input 
                        className={styles.submit}
                        type="submit" 
                        value="수정" 
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

        </div>
    )
}

export default Update