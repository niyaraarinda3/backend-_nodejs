const db = require("../config/db");

 async function getProduct(selectedArea,dateFrom,dateTo){
    where = "";
    if(selectedArea != "" && selectedArea != undefined){
        where += `WHERE store_area.area_name = "${selectedArea}"`;
    }
    if(dateFrom != "" && dateFrom != undefined){
        if(where != ""){
            where += ` AND report_product.tanggal >= "${dateFrom}"`;
        }else{
            where += `WHERE report_product.tanggal >= "${dateFrom}"`;
        }
    }
    if(dateTo != "" && dateTo != undefined){
        if(where != ""){
            where += ` AND report_product.tanggal <= "${dateTo}"`;
        }else{
            where += `WHERE report_product.tanggal <= "${dateTo}"`;
        }
    }
    const sql = `SELECT product_brand.brand_name,store_area.area_name, (AVG(report_product.compliance)*100) AS report from report_product 
    RIGHT JOIN product ON report_product.product_id = product.product_id
    RIGHT JOIN product_brand ON product.brand_id = product_brand.brand_id
    RIGHT JOIN store ON  report_product.store_id = store.store_id
    RIGHT JOIN store_area ON store.area_id = store_area.area_id
    ${where}
    GROUP BY product_brand.brand_name,store_area.area_name;`;
    let results = await new Promise((resolve,reject) => db.query(sql, (err, result) => {
        let products = [];
        console.log(sql);
        if(err) reject(products);
        result.forEach((data)=>{
            temp = {
                brand_name: data.brand_name,
                area_name: data.area_name,
                report: data.report,
            }
            products.push(temp);
        })
        resolve(products);
    })
    );
    return await results
}
module.exports = getProduct;