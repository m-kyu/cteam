
import Image from 'next/image'
import styles from '@/styles/community.module.scss'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { DbContext } from '../MyContext';

const List = () => {
    const { data, dataFun, like, likeFun, userInfo} = useContext(DbContext);
    const router = useRouter();
    const [commentBox, setCommentBox] = useState(false);
    const [filterU, setFilterU] = useState([]);

    const filterUFun = () => {
        const filteredLikes = like.filter((likeU) => {
            return likeU.user === userInfo.nickname;
        });
        setFilterU(filteredLikes);
    };
    
     async function dataget() {
        dataFun('get');
        likeFun('get');
        filterUFun();
    }

    function dataDelete(id) {
        dataFun('delete',id)
        window.location.reload();
    }

    useEffect(()=> { dataget()},[])
    useEffect(()=> { filterUFun()},[like])
    console.log(data)
   
    return (
        <>
            <div>
                <section>
                    {
                        data && data.map(obj => (
                            <div key={obj.id} className={styles.listBox}>
                                <div className={styles.top}>
                                    <div className={styles.profile}>
                                        <img src={obj.profile}/>
                                        <div className={styles.nickname}>
                                            <b>{obj.nickname}</b>
                                            <p>{obj.date}</p>  
                                        </div>
                                    </div>
                                    <div className={styles.BTN}>
                                        <button onClick={() => router.push({ pathname: '/Update', query: obj })}>
                                            <Image  src="/img/community/edit.png" alt='' width={28} height={25}/>
                                        </button>
                                        <button onClick={() => dataDelete(obj.id)}>
                                            <Image  src="/img/community/delete.png" alt='' width={28} height={28}/>
                                        </button>
                                    </div>
                                </div>
    
                                <div className={styles.middle}>
                                    <h4>{obj.title}</h4>
                                    <p>{obj.text}</p>
                                </div>
                                <div className={styles.bottom}>
                                    <div className={styles.bottom01}>
                                        <b onClick={() => {setCommentBox(!commentBox)}}>
                                            {commentBox ?  "닫기" : "댓글" }
                                        </b>
                                        <div>
                                        <button onClick={() => { dataFun('put', {id:obj.id, icon1: obj.icon1 = "1"}) }}>
                                                <Image src="/img/community/icon06.png" alt='' width={20} height={20}/>
                                                <p>{obj.num1}</p>
                                            </button>
                                            <button>
                                                <Image src="/img/community/icon11.png" alt='' width={20} height={20}/>
                                                <p>{obj.num2}</p>
                                            </button>
                                            <button>
                                                <Image src="/img/community/icon13.png" alt='' width={20} height={20}/>
                                                <p>{obj.num3}</p>
                                            </button>
                                            <button>
                                                <Image src="/img/community/icon14.png" alt='' width={20} height={20}/>
                                                <p>{obj.num4}</p>
                                            </button>  
                                        </div>
                                    </div>

                                    {
                                        filterU.find((h) => h.communityId == obj.id) ? (
                                            <button onClick={() => {
                            
                                                likeFun('delete', {params :{communityId:obj.id, user: userInfo.nickname}}); }} className={styles.like}
                                            >
                                                <Image  src="/img/community/r.png" alt='' width={28} height={26}/>
                                            </button>
                                        ) : (
                                            <button onClick={() => { 
                                                console.log('sdfsdfsdfsdfsdfsd2322232232')
                                                likeFun('post', {communityId:obj.id, user: userInfo.nickname, likeB:1 }); }} className={styles.like}
                                               
                                            
                                            >
                                                <Image  src="/img/community/w.png" alt='' width={28} height={26}/>               
                                            </button>
                                        )
                                    }

                                </div>
                                { 
                                    commentBox && 
                                    (
                                        <div className={styles.comment}>
                                            <div className={styles.commentInput}> 
                                                <input/>
                                                <button>
                                                    <Image  src="/img/community/send.png" alt='' width={25} height={23}/>
                                                </button>
                                            </div>
                                            <div className={styles.profileC}>
                                                <div className={styles.profileCC}>
                                                    <img src="obj.commentProfile"/>
                                                    <p>obj.commentName</p>
                                                </div>
                                                <p>obj.comment</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        ))

                    }
                    
        

                </section>
            </div>
        
        </>
    )
}

export default List

