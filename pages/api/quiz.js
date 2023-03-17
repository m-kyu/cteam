
import { executeQuery } from './db';

const handler = async (req, res) => {
  // DESC(내림차순), ASC(오름차순)
  const { method, body } = req;

  const seletData = async () => {
    try {
      let data = await executeQuery('select * from quiz', []);
      res.json(data);
     
    } catch (err) {
      res.send(err);
    }
  }

  const insertData = async () => {
    console.log("마지막요청")
    let {nick,gen,collect} = body;
    console.log(nick,gen,collect[0],collect[1],collect[2],collect[3],collect[4],collect[5],collect[6],collect[7],collect[8],collect[9],collect[10],collect[11],collect[12],'gffgfgffgffgf')
    let data = await executeQuery(
      'insert into quiz (nickname, gender, q01, q02, q03, q04, q05, q06, q07, q08, q09, q010, q011, q012, q013) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [nick,gen,collect[0],collect[1],collect[2],collect[3],collect[4],collect[5],collect[6],collect[7],collect[8],collect[9],collect[10],collect[11],collect[12]]
    );
    res.json(data)
  }

  switch (method) {
    case "GET": seletData(); break;
    case "POST": insertData(); break;
  }
}

export default handler;
