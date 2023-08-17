const mongoose = require('mongoose')

const empDetailsSchema =new  mongoose.Schema(
    {
    Company_Name: String,
    Employee_id: String,
    Employee_Name: String,
    Gender: String,
    Date_of_Joining: String,
    Location: String,
    Mobile_Number :{ 
        type: String,
        unique : true
    }
});

const empDetailsModel = mongoose.model("empdetails", empDetailsSchema);

const saveempdetails = async(data)=>
{
    if(data.length!==0){
        const existingemp = await empDetailsModel.findOne({Mobile_Number:data.Mobile_Number})
        if(existingemp)
        {
            return false
        }
        else
        {
            const newemp = new empDetailsModel(data)
            const saveemp = await newemp.save()
            return saveemp;
        }
    }
    else
    {
        return false
    }

}

const payrollDetailsSchema =  new mongoose.Schema({
    Employee_id: String,
    Salary: String,
    Basic: String,
    HRA: String,
    Conveyance: String,
    Other_allowance: String,
    Total_Detuctions : String,
    LOP: String,
    Month: String,
    Year: String,
    Designation: String,
    PAN: String,
    Bank_AC_Number: String
});

const payrollDetailsModel = mongoose.model('payrolldetails',payrollDetailsSchema);

const savepayrolldetails = async(data)=>
{
    const newpayroll = new payrollDetailsModel(data)
    const savepayroll = await newpayroll.save()
    return savepayroll;
}


//fetching data

//getby employee_id and get empdetails
const getdatabyempid = async(data)=>
{
    const getdata = await empDetailsModel.findOne({Employee_id:data.Employee_id})
    return getdata;
}
//getby employee_id and get payroll details
const getpayrolldatabyempid = async(data)=>
{
    const getdata = await payrollDetailsModel.findOne({Employee_id:data.Employee_id})
    return getdata;
}

//combine 2 collections and get some datas
const fetchdata = async(data)=>
{
    const combinecollection = await payrollDetailsModel.aggregate([
        {
            $match:
             
            {Employee_id:data.Employee_id,Month:data.Month,Year:data.Year}
            
        },
        {
            $lookup:
            {
                    from: 'empDetailsModel', // Name of the second collection
                    localField: 'Employee_id',
                    foreignField: 'Employee_id',
                    as: 'payroll'
            }
        },
        {
            $unwind: '$payroll'
        },
        {
            $project: {
                
                    "Employee_id":"$Employee_id",
                    "Employee_Name": "$payroll.Employee_Name",
                    
            }
        }
    ])
    return combinecollection;
    
}



const retrivePayslip=async(data)=>{
    console.log(data);
    let getInfo
    
        getInfo=await payrollDetailsModel.aggregate([
            {$match:{Employee_id:data.emp_id,Month:data.month,Year:data.year}},
            {
                $lookup: {
                    from: 'empdetails',
                    localField: 'Employee_id',
                    foreignField: 'Employee_id',
                    as: 'payroll'
                }
            },
            { $unwind: "$payroll" },
            {
                $project: {
                    "Company_Name":"$payroll.Company_Name",
                    "Employee_id":"$Employee_id",
                    "Employee_Name": "$payroll.Employee_Name",
                    
                    "Gender": "$payroll.Gender",
                    "Location":"$payroll.Location",
                    "Mobile_Number": "$payroll.Mobile_Number",
                    "Date_of_Joining": "$payroll.Date_of_Joining",
                    "Designation": "$Designation",
                    "Bank_AC_Number": "$Bank_AC_Number",
                    
                    "Basic": "$Basic",
                    "HRA": "$HRA",
                    "PAN": "$PAN",
                    "LOP":"$LOP",
                    "Conveyance": "$Conveyance",
                    "Other_allowance": "$Other_allowance",
                    "Salary": "$Salary",
                    "Total_Detuctions":"$Total_Detuctions",
                    "Month":"$Month",
                    "Year":"$Year"
                }
            }
           ])
    
    
     
   return getInfo
}

//update mobile number by emp_id in emp_details
const updatedata = async(data)=>
{
    const update = await empDetailsModel.updateOne({Employee_id:data.Employee_id},{Mobile_Number:data.Mobile_Number})
    return update
}

//ordinary method
const updatemany = async(data)=>
{
    const update = await payrollDetailsModel.findOneAndUpdate({Employee_id:data.Employee_id,Month:data.Month,Year:data.Year},
        {$set:
            {
                Salary:data.Salary,
                Basic:data.Basic,
                HRA:data.HRA,
                Conveyance:data.Conveyance
            }},{multi:true}
            )
    return update
}


//update many data by many data
const updateMany = async (data) => 
{
    const filter = {
        Employee_id: data.Employee_id,
        Month: data.Month,
        Year: data.Year
      };
    
      const update = {
        $set: {
          Salary: data.Salary,
          Basic: data.Basic,
          HRA:data.HRA,
          Conveyance: data.Conveyance
        }
      }; 

      const result = await payrollDetailsModel.updateMany(filter, update);
      return result;
}

    
module.exports=
{
    saveempdetails,
    savepayrolldetails,
    getdatabyempid,
    getpayrolldatabyempid,

    fetchdata,
    retrivePayslip,

    updatedata,

    
    updatemany,
    updateMany,
    
}