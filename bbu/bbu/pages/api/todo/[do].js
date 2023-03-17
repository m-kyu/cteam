import { executeQuery } from '../db';

const handler = async (req, res) => {

  const { method, body, query } = req;

  //insert
  const seletDataDo = async () => {
    try{
        let data = await executeQuery(
          'select * from todo where id=?', [query.do]
        )
        res.json(data)
    }catch(err){
        res.send(err)
    }
  }

  //업데이트
  const updateDataDo = async () => {
    try{
        let { todo } = body;
        let data = await executeQuery(
          'update todo set todo=? where id=?',
          [todo, Number(query.do)]
        )
        res.json(data)
    }catch(err){
        res.send(err);
    }
  }

  //삭제
  const deleteDataDo = async () => {
    console.log("삭제함수")
    let data = await executeQuery(
      'delete from todo where id=?', [query.do]
    )
    res.json(data);
  }

  switch (method) {
    case "GET": seletDataDo(); break;
    case "PUT": updateDataDo(); break;
    case "DELETE": deleteDataDo(); break;
  }
}

export default handler;