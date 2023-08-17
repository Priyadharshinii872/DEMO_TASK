const mongoose = require('mongoose')

//single file upload - schema
const userschema = new mongoose.Schema(
    {
        Name:{
            type:String,
            required:true
        },
        Age:{
            type:Number
        },
        Gender:{
            type:String
        },
        City:{
            type:String
        }
    }
)

const collect = mongoose.model('user',userschema)

const savedata = async(data)=>
{
    const newuser = new collect(data)
    const saveuser = newuser.save()
    return saveuser
}




module.exports=
{
    savedata
}
