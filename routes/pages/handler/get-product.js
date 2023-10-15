const repository = require('../../../repository');

async function getProduct (req, res) {
    let selectedArea = req.query.selectedArea;
    let dateFrom = req.query.dateFrom;
    let dateTo = req.query.dateTo;
    const product = await repository.getProduct(selectedArea,dateFrom,dateTo);
    const area = await repository.getArea();
    if(product.length == 0){
        console.log("Data not found");
        res.status(422).send({
            message: 'Data not found',
            data: {}
        })
        return;
    }
    let dataProduct = {};
    let dataChart = {};
    let flag = "";
    let listArea = []
    product.forEach((data)=>{
        if(!listArea.includes(data.area_name)){
            listArea.push(data.area_name);
        }       
    })
    product.forEach((data)=>{
        console.log(dataProduct);
        if(flag == data.brand_name){
            dataProduct[flag][data.area_name] = parseFloat(data.report.toFixed(2));
        }else{
            flag = data.brand_name;
            if(!dataProduct[flag]){
                dataProduct[flag] = {};
            }
            dataProduct[flag][data.area_name] = {};
            dataProduct[flag][data.area_name] = parseFloat(data.report.toFixed(2));
        } 
        if(dataChart[data.area_name]){
            dataChart[data.area_name] += parseFloat(data.report.toFixed(2));
        }else{
            dataChart[data.area_name] = parseFloat(data.report.toFixed(2));
        }
    })
    console.log(dataProduct);
    res.status(200).send({
        message: 'OK',
        data: {
            dataProduct,
            dataChart,
            listArea,
            allArea: area
        }
    })
}

module.exports = getProduct;