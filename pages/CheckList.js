import React, { useRef, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from '@/styles/checkList.module.scss'
import Image from 'next/image'
import { DbContext } from './component/MyContext';

const CheckList = () => {

  const { todoData, todoDataFun } = useContext(DbContext);
  const note = useRef();
  const elInput = useRef();
  const initial = { todo: '' };
  const [inputValue, setInputValue] = useState(initial);
  const [editingId, setEditingId] = useState(null);

  const create =(e) => {
      e.preventDefault();
      todoDataFun('post',{...inputValue});
      elInput.current.value = "";
      elInput.current.focus();
  }

  function dataget() {
    todoDataFun('get')
  }

  const valueChange = (e) => {
    let t = e.target;
    setInputValue((obj) => {
        return { ...obj, [t.name]: t.value }
    })
  }

  function dataEdit(id) {
    const todo = todoData.find(obj => obj.id === id);
    setInputValue({ todo });
    setEditingId(id);
  }

  const edit = (e) => {
    e.preventDefault();
    todoDataFun('put', { id: editingId, todo: inputValue.todo });
    setInputValue(initial);
    setEditingId(null);
    window.location.reload();
  }
  

  function dataDelete(id) {
    todoDataFun('delete',id)
  }

  useEffect(dataget,[])

  return (
    <>
      <div className="H1">CHECK LIST</div>

      <section ref={note} className={styles.note}>

        <form onSubmit={editingId !== null ? edit : create}>
          <input 
            ref={elInput}
            type="text" 
            className={styles.textInput}
            onChange={valueChange} 
            value={inputValue.todo.todo}
            placeholder='결혼식 전 체크리스트를 작성해주세요!' 
            name="todo" 
          />
          <input 
            type="submit" 
            value={editingId !== null ? "수정" : "등록"} 
            className={styles.submitInput}
          />
        </form>

        <div className={styles.textBox}>
          {todoData &&
            todoData.map((obj) => (
              <div key={obj.id} className={styles.textList}>
                <div className={styles.check}>
                  <input type="checkbox" onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      e.target.parentNode.parentNode.classList.add(styles.checked);
                    } else {
                      e.target.parentNode.parentNode.classList.remove(styles.checked);
                    }
                  }} />
                  <p>{obj.todo}</p>
                </div>
                <div className={styles.btnBox}>
                  <button onClick={() => dataEdit(obj.id)}>수정</button>
                  <button onClick={() => dataDelete(obj.id)}>삭제</button>
                </div>
              </div>
            ))}
        </div>

        <div className={styles.buttonBox}>
          <button onClick={()=>{note.current.style="background:#FFFDC7"}}></button>
          <button onClick={()=>{note.current.style="background:#FFD1C7"}}></button>
          <button onClick={()=>{note.current.style="background:#E2FFE5"}}></button>
          <button onClick={()=>{note.current.style="background:#ade5ec"}}></button>
          <button onClick={()=>{note.current.style="background:#D8C1FF"}}></button>
          <button onClick={()=>{note.current.style="background:#FFFFFF"}}></button>
        </div>

        <div className={styles.bbubbubbu}>
          <Image src="/img/main/bbus.png" alt='' width={120} height={180}/>
        </div>
      </section>

      <div className={styles.line}>
        <Image src="/img/main/line.png" alt='' width={280} height={160}/>
      </div>
    </>
  )
}

export default CheckList
