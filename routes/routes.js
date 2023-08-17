const exp = require('express')
const router = exp.Router()

const filefunctions = require('../controller/practice/index')

const taskfunctions = require('../controller/task/index')

const multer = require('../middleware/multer')

let routes = (app)=>
{
    //csv file
    router.post('/csvfile',multer.single("upload"),filefunctions.csvuser);
    //xlsx file
    router.post('/excelfile',multer.single("upload"),filefunctions.xlsxuser);


    //demotask
    router.post('/uploadfile',multer.single("upload"),taskfunctions.savedata);
    //getbyempid-->emp.details
    router.post('/getbyempid',taskfunctions.getbyempid)
    //getbyempid-->emp.payroll.details
    router.post('/getpayrolldetails',taskfunctions.payrollbyempid)

    //fetch payrolldeatil by empid,name,year,month
    router.post('/fetch',taskfunctions.fetch)

    //crct 
    router.post('/fetchall',taskfunctions.getData)

    //update mob in empdetails
    router.post('/updatemob',taskfunctions.updatemob)
    //update many in payslip
    router.post('/updatet',taskfunctions.updatet)
    
    router.post('/updatepay',taskfunctions.updatepay)

    app.use('/api',router)
}


module.exports=
routes