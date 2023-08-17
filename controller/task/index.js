const service  = require('./service')
const xlsx = require('xlsx')

const savedata = async(req,res)=>
{
    try
    {
        if(!req.file)
        {
            res.send({code:404,message:'please upload xlsx file'})
            return console.log('kindly select and upload xlsx file')
        }

        let path='./files/'+req.file.filename
        const details = xlsx.readFile(path)
        const sheetName = details.SheetNames[0];
        const sheet=details.Sheets[sheetName]
        const data = xlsx.utils.sheet_to_json(sheet)

        for(const item of data)
        {
             await service.saveempdetails(item)
             await service.savepayrolldetails(item)
        }
        res.send({code:200,success:true,message:'upload succesfully'})

    }catch(error)
    {
        res.send({status:error,message:'not uploaded'})
    }
}

const getbyempid = async(req,res)=>
{
    const fetch = await service.getdatabyempid(req.body)
    res.send(fetch)
}

const payrollbyempid = async(req,res)=>
{
    const fetch = await service.getpayrolldatabyempid(req.body)
    res.send(fetch)
}

/*const fetchpayrolldetail = async(req,res)=>
{
    const fetch = await service.fetchpayroll(req.body)
    res.send(fetch)
}*/

const fetch = async(req,res)=>
{
    const fetch = await service.retrivePayslip(req.body)
    res.send(fetch)
}


const getData=async(req,res)=>{
    var emp_id=req.body.Employee_id
    var month=req.body.Month
    var year=req.body.Year
    console.log(month);

    const data=await service.retrivePayslip({emp_id,month,year})
    res.send(data)
}

const updatemob = async(req,res)=>
{
    const update = await service.updatedata(req.body)
    res.send(update)
}

const updatepay = async(req,res)=>
{
    const display = await service.updatemany(req.body)
    res.send(display)
}

const updatet = async(req,res)=>
{
    const display  = await service.updateMany(req.body)
    res.send(display)
}


module.exports=
{
    savedata,
    getbyempid,
    payrollbyempid,
    //fetchpayrolldetail

    fetch,
    getData,
    updatemob,
    updatepay,
    updatet
}


