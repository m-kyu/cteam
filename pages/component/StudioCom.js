import React, { useState } from 'react'
import Image from 'next/image';
import styles from '@/styles/studio.module.scss';
import Link from 'next/link';



const StudioCom = ({ value,studioName,src,url }) => {

    const [hover, setHover] = useState('');
    // const [enter, setEnter] = useState('')
    return (
        <>
            <div
                className={hover !== 'hover' ? `${styles.imgBox}` : `${styles.imgBox} ${styles.action}`}
                onMouseEnter={() => {
                    setHover('hover')

                    // setEnter(value)
                }}
                onMouseLeave={() => {
                    setHover('');
                    // setEnter('')
                }}>
                <div className={hover === 'hover' ? `${styles.imgCont}` : `${styles.imgCont} ${styles.action}`}>
                    <div className={styles.contBtn}>
                        <button
                            onClick={() => {
                                console.log('aaa')
                            }}><Image src="/img/SDM/Group 97.png" width={50} height={40} alt='' ></Image></button>
                    </div>
                    <p>{studioName}</p>
                    <Link href={`${src}`}>보러가기</Link>
                </div>
                <Image
                    className={hover !== 'hover' ? `${styles.imsTest}` : `${styles.imsTest} ${styles.action}`}
                    src={url}
                    width={390} height={270}
                    alt='' />
            </div>

        </>
    )
}

export default StudioCom