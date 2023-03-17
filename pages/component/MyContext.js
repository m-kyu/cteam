import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
export const DbContext = createContext(null);

const MyContext = ({ children }) => {


    const [data, setData] = useState();
    const [todoData, todoSetData] = useState();

    const [quizData, setQuizData] = useState([]);
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [like, setLike] = useState([]);
    const [s, setS] = useState();
    const [d, setD] = useState();
    const [m, setM] = useState();
    const session = useSession();


    async function userData(type, obj) {
        // console.log(type, obj)
        if (type == 'get') {
            await axios.get('/api/auth/test', {
            }).then((aa) => {
                setUsers(aa.data)
            })
        }
    }

    const userFun = async () =>{
        const filteredUsers = users.filter((obj)=>{
            return obj.nickname == session.data?.user.nickname
        })
        if (filteredUsers.length > 0) {
            const userInfo = filteredUsers[0]
            setUserInfo(userInfo)
        }
    }

    async function dataFun(type, obj) {
        let trans;
        if (type == 'get') {
            await axios.get('/api').then(res => trans = res.data)
        } else if (type == 'post') {
            await axios.post('/api', obj)
            return dataFun('get');
     
        }else if (type == 'put') {
            await axios.put(`/api/${obj.id}`, obj).then((res) => {
                // console.log(res);
            })
            return dataFun('get');
        } else if (type === 'delete') {
            await axios.delete(`/api/${obj}`)
            return dataFun('get');
        }
        setData(trans);
    }



    async function likeFun(type, obj) {
        let trans;
        if (type == 'get') {
          await axios.get('/api/bbu').then(res => trans = res.data)
        } 
        else if (type == 'post') {
            console.log(obj)
          await axios.post('/api/bbu', obj)
          return likeFun('get');
        }
        else if (type === 'delete') {
            console.log(obj)
            await axios.delete('/api/bbu', obj)
            return likeFun('get');
        }
      
        setLike(trans);
      }


    async function todoDataFun(type, obj) {
        let trans;
        if (type == 'get') {
            await axios.get('/api/todo').then(res => trans = res.data);
        } else if (type == 'post') {
            await axios.post('/api/todo', obj)
            return todoDataFun('get');
        } else if (type == 'put') {
            await axios.put(`/api/todo/${obj.id}`, obj).then((res) => {
                console.log(res);
            })
            return dataFun('get');
        } else if (type === 'delete') {
            await axios.delete(`/api/todo/${obj}`)
            return todoDataFun('get');
        }
        // console.log(trans)
        todoSetData(trans);
    }

    async function quizDataFun(type, obj) {
        let trans;
        if (type == 'get') {
            await axios.get('/api/quiz').then(res => trans = res.data);
        } else if (type == 'post') {
            // console.log(obj)
            await axios.post('/api/quiz', obj)
            return quizDataFun('get');
        } else if (type == 'put') {
            await axios.put(`/api/quiz/${obj.id}`, obj).then((res) => {
                // console.log(res);
            })
            return dataFun('get');
        } else if (type === 'delete') {
            await axios.delete(`/api/quiz/${obj}`)
            return quizDataFun('get');
        }
        console.log(trans)
        setQuizData(trans);
    }

    useEffect(() => {
        dataFun('get');
        todoDataFun("get");
        userData('get');
        likeFun("get")
        quizDataFun('get');
    }, [])

    useEffect(() => {
        userFun();
    }, [users, session])






    return (

        <DbContext.Provider value={{ data, dataFun, todoData, todoDataFun, users,userInfo, quizDataFun, quizData , like, likeFun}}>

            {children}
        </DbContext.Provider>
    )


}

export default MyContext