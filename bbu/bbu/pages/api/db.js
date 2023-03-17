const { createPool } = require("mysql");

const pool = createPool({
    host: "svc.sel3.cloudtype.app",
    user: "root",
    password: "0422",

    port: "30108",
    database: "bbubbu"
})

pool.getConnection(()=>{
    console.log("success")
});

const executeQuery = async (query, arraParms) => {
    return await new Promise((resolve)=>{
        pool.query(query, arraParms, (err, data)=>{
            resolve(data)
        });
    })
}

module.exports = {executeQuery}