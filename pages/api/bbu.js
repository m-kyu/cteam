
import { executeQuery } from './db';

const handler = async (req, res) => {
  // DESC(내림차순), ASC(오름차순)
  const { method, body, query } = req;

  const seletData = async () => {
    try {
      let data = await executeQuery('select * from bbu', []);
      res.json(data);
    } catch (err) {
      res.send(err);
    }
  }
  
  const insertData = async () => {
    let {communityId, user, likeB} = body;
    let data = await executeQuery(
      'insert into bbu (communityId, user, likeB) values (?, ?, ?)',
      [communityId.toString(), user, Number(likeB)]
    );
    res.send('success')
    return data;
  };
  
  const deleteData = async () => {
    let {communityId, user} = query;

    console.log("삭제")
    let data = await executeQuery(
      'delete from bbu where communityId=? and user=?', [communityId.toString(),user]
    )
    res.json(data);
  }
  
                                                                  
  switch (method) {
    case "GET": await seletData(); break;
    case "POST": await insertData(); break;
    case "DELETE": await deleteData(); break;
  }
}

export default handler;




