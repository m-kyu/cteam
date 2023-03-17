import React, { useRef, useState } from "react";
import styles from '@/styles/edit.module.scss';

const Edit = () => {

    let mainImg=useRef();
    let inputWedding=useRef();
    let [Wed,setWed]=useState(false);
    let [styleName,setStyleName]=useState(false);

    function create(e) { 
        e.preventDefault(e);
    }
    function changeImg(e) {
        var newImg = e.target.src;
        mainImg.current.src=newImg;
    }
    function toggle() {
        setWed(setWed=>!setWed)
        if(Wed == false){
            inputWedding.current.disabled = true;
        }else{
            inputWedding.current.disabled = false;
        }
    }
    function profile(n){
        if(n){
            setStyleName(true) 
        }else{
            setStyleName(false) 
        }

    return (
        <main className={styles.main}>
            <h2 className={styles.title}>EDIT</h2>
            <div className={styles.container}>
                <img className={styles.smile} src="/img/edit/smile.png" />
                <form onSubmit={create}>
                    <div className={styles.nickname}>
                        <label for="nickname">닉네임</label> <br />
                        <div>
                            <input type="text" placeholder="닉네임을 입력해주세요" name="nickname" />
                            <input type="button" value="중복확인" />
                        </div>
                    </div> v
                    <div className={styles.gender}>
                        <label for="gender" className={styles.title}>본인선택</label> <br />
                        <div>
                            <input type="radio" id="female" name="gender" value="female" />
                            <label for="female" onClick={()=>profile(1)}>신부</label>
                            <input type="radio"  id="male" name="gender" value="male" />
                            <label for="male" onClick={()=>profile(0)}>신랑</label>
                        </div>
                    </div>
                    <div className={styles.weddingday}>
                        <label for="weddingday">예식일</label> <br />
                        <div>
                            <input type="date" name="weddingday" ref={inputWedding}/>
                            <input type="checkbox" id="yet" onClick={()=>toggle()}/>
                            <label for="yet">아직 결정되지 않았어요</label>
                        </div>
                    </div>
                    <div className={styles.profile}>
                        <label for="profile">프로필</label>
                        <div> 
                            {
                                styleName ? 
                                <>
                                    <img ref={mainImg} src="/img/edit/gface01.png" className={styles.profile} />
                                    <img onClick={changeImg} className={styles.face} src="/img/edit/gface01.png" />
                                    <img onClick={changeImg} className={styles.face} src="/img/edit/gface02.png" />
                                    <img onClick={changeImg} className={styles.face} src="/img/edit/gface03.png" />
                                    <img onClick={changeImg} className={styles.face} src="/img/edit/gface04.png" />
                                </> : 
                                <>
                                    <img ref={mainImg} src="/img/edit/bface01.png" className={styles.profile} />
                                    <img onClick={changeImg} className={styles.face} src="/img/edit/bface01.png" />
                                    <img onClick={changeImg} className={styles.face} src="/img/edit/bface02.png" />
                                    <img onClick={changeImg} className={styles.face} src="/img/edit/bface03.png" />
                                    <img onClick={changeImg} className={styles.face} src="/img/edit/bface04.png" />
                                </>
                            }
                        </div>
                    </div>
                    <div className={styles.submit}>
                        <input type="submit" value="EDIT" />
                        <img src="/img/edit/btn_bottom.png" />
                    </div>
                </form>
            </div>
        </main>
    )
    }
}

export default Edit