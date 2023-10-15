const db = require("../config/db");

 async function getArea(){

    const sql = `SELECT DISTINCT area_name from store_area;`;
    let results = await new Promise((resolve,reject) => db.query(sql, (err, result) => {
        let areas = [];
        console.log(sql);
        if(err) reject(areas);
        result.forEach((data)=>{
            areas.push(data.area_name);
        })
        resolve(areas);
    })
    );
    return await results
}
module.exports = getArea;