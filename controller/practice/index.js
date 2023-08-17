const { it } = require('node:test')
const service = require('./service')
const csv = require('csvtojson')
const xlsx = require('xlsx')

//csv file upload

const csvuser = async(req,res)=>
{
    try
    {
        if((req.file==0)||(req.file==null))
        {
            res.send({code:404,message:'please upload csv file only'})
            return console.log('kindly upload cvs file only')
        }

    let path = "./files/"+req.file.filename
    const details =  await csv().fromFile(path)

    for(const item of details)
    {
        const save = await service.savedata(item)
    }
    res.send({status:200,success:true,message:'uploaded successfully'})

}catch(error)
    {
        res.send({message:error,status:'not uploaded'})
    }
}

//excel file
const xlsxuser = async(req,res)=>
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
            const save = await service.savedata(item)
        }
        res.send({code:200,success:true,message:'upload succesfully'})


    }catch(error)
    {
        res.send({status:error,message:'not uploaded'})
    }
}


module.exports=
{
    csvuser,
    xlsxuser
}