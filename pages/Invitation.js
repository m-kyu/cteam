import React, { useRef, useState } from 'react'
import styles from '@/styles/invitation.module.scss'
import Image from 'next/image'

const Invitation = () => {

  return (
    <>
      {/* <div className="H1">청첩장만들기</div> */}
      <Image className={styles.bbuuu} src="/img/main/bbuuu.png" alt='' width={80} height={70}/>
      <div className={styles.fabric}>
        <iframe src="https://daun1309.github.io/fabric/"/>
      </div>
    </>
  )
}

export default Invitation