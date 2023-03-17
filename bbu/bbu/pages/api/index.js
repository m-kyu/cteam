
import { executeQuery } from './db';

const handler = async (req, res) => {
  // DESC(내림차순), ASC(오름차순)
  const { method, body } = req;

  const seletData = async () => {
    try {
      let data = await executeQuery('select * from community order by id DESC', []);
      res.json(data);
    } catch (err) {
      res.send(err);
    }
  }

  const insertData = async () => {
    let {profile, nickname,name, title, text, date} = body;
    let data = await executeQuery(
      'insert into community (profile, nickname,name, title, text, date) value (?, ?, ? ,?, ?, ?)',
      [profile, nickname, name, title, text, date]
    );
    // console.log(id)
    res.json(data)
  }




  // // Community 테이블에 INSERT 문 실행
  // const communityInsertResult = await executeQuery(
  //   'INSERT INTO community (profile, nickname, title, text, date) VALUES (?, ?, ?, ?, ?)',
  //   [profile, nickname, title, text, date]
  // );

  // // 자동으로 생성된 ID 값을 변수에 할당
  // const communityId = communityInsertResult.insertId;

  // // Like 테이블에 INSERT 문 실행
  // const likeInsertResult = await executeQuery(
  //   'INSERT INTO like (community_id, user_id, date) VALUES (?, ?, ?)',
  //   [communityId, userId, date]
  // );





                                                                  
  switch (method) {
    case "GET": seletData(); break;
    case "POST": insertData(); break;
  }
}

export default handler;


// 테이블 연결시키기
// const seletData = async () => {
//   try {
//     let data = await executeQuery('SELECT * FROM community LEFT JOIN todo ON community.id = todo.community_id ORDER BY community.id DESC', []);
//     res.json(data);
//   } catch (err) {
//     res.send(err);
//   }
// }
