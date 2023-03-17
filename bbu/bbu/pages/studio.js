
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import styles from '@/styles/studio.module.scss';



import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import StudioCom from './component/StudioCom';



function studio() {

    const studioList = [
        {
            id: 1,
            studioName: "구호스튜디오",
            time: "09:00~19:00",
            url: "/img/SDM/studio/구호스튜디오/1.jpg",
            src: "http://www.kuhostudio.co.kr/"
        },
        {
            id: 2,
            studioName: "그날의기억",
            time: "09:00~19:00",
            url: "/img/SDM/studio/그날의기억/1.jpg",
            src: "http://www.kuhostudio.co.kr/"
        },
        {
            id: 3,
            studioName: "달빛스쿠터",
            time: "09:00~19:00",
            url: "/img/SDM/studio/달빛스쿠터/1.jpg",
            src: "http://www.kuhostudio.co.kr/"
        },
        {
            id: 4,
            studioName: "더브라이드 스튜디오",
            time: "09:00~19:00",
            url: "/img/SDM/studio/더브라이드 스튜디오/1.jpg",
            src: "http://www.kuhostudio.co.kr/"
        },
        {
            id: 5,
            studioName: "더청담스튜디오",
            time: "09:00~19:00",
            url: "/img/SDM/studio/달빛스쿠터/1.jpg",
            src: "http://www.kuhostudio.co.kr/"
        },
        {
            id: 6,
            studioName: "더청담스튜디오",
            time: "09:00~19:00",
            url: "/img/SDM/studio/달빛스쿠터/1.jpg",
            src: "http://www.kuhostudio.co.kr/"
        },
        {
            id: 7,
            studioName: "더청담스튜디오",
            time: "09:00~19:00",
            url: "/img/SDM/studio/달빛스쿠터/1.jpg",
            src: "http://www.kuhostudio.co.kr/"
        },
    ]






    return (
        <div className={styles.studio}>

            <div className={styles.logo}>
                <Image src="/img/SDM/Group38.png" width={50} height={50} alt='' ></Image>
                <p>STUDIO</p>
                <Image src="/img/SDM/Group38.png" width={50} height={50} alt='' ></Image>
            </div>

            <div className={styles.recommendStudio}>
                <div className={styles.recommendStudioLogo}>
                    <Image src="/img/SDM/Group 90.png" width={30} height={30} alt='' ></Image>
                    <p>추천 스튜디오</p>
                </div>

                {/* <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={50}
                    // autoplay={{ delay: 1500, disableOnInteraction: false }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className={styles.cont}
                    
                >
                    {studioList.map((v, k) => {
                        return (
                            <SwiperSlide key={k} className={styles.SwiperSlide}>
                                <StudioCom value={v} studioName={v.studioName}></StudioCom>
                            </SwiperSlide>
                        )
                    })}
                </Swiper > */}

                <div>
                    {studioList.map((v, k) => {
                        return (
                            <div key={k} className={styles.SwiperSlide}>
                                <StudioCom value={v} studioName={v.studioName} src={v.src} url={v.url}></StudioCom>
                            </div>
                        )
                    })}
                </div>

            </div >

            {/* 영상 */}
            <div div className={styles.videoPlayer} >
                <div className={styles.videoPlayerLogo}>
                    <Image src="/img/SDM/Group 90.png" width={30} height={30} alt='' ></Image>
                    <p>관련 영상</p>
                </div>

                <div className={styles.player}>
                    <div id='player' >
                        <YouTube
                            // videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
                            videoId={"0E3_EXhnp5M"}
                            //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
                            //밑에서 더 설명하겠습니다.
                            opts={{
                                width: "486",
                                height: "284",
                                playerVars: {
                                    autoplay: 0, //자동재생 O
                                    rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                                    modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                                },
                            }}
                            //이벤트 리스너
                            onEnd={(e) => { e.target.stopVideo(0); }}
                        />
                    </div>
                    <div id='player' >
                        <YouTube
                            // videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
                             videoId={"0E3_EXhnp5M"}
                            //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
                            //밑에서 더 설명하겠습니다.
                            opts={{
                                width: "486",
                                height: "284",
                                playerVars: {
                                    autoplay: 0, //자동재생 O
                                    rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                                    modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                                },
                            }}
                            //이벤트 리스너
                            onEnd={(e) => { e.target.stopVideo(0); }}
                        />
                    </div>
                    <div id='player' >
                        <YouTube
                            // videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
                             videoId={"0E3_EXhnp5M"}
                            //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
                            //밑에서 더 설명하겠습니다.
                            opts={{
                                width: "486",
                                height: "284",
                                playerVars: {
                                    autoplay: 0, //자동재생 O
                                    rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                                    modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                                },
                            }}
                            //이벤트 리스너
                            onEnd={(e) => { e.target.stopVideo(0); }}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default studio

