const mongoose = require('mongoose')
module.exports = () => {
const connectionParams = {

    useNewUrlParser:true,
    useUnifiedTopology: true
}
try{
mongoose.connect('mongodb+srv://hamza:pAKISTAN123@mernapp.ddt9q01.mongodb.net/?retryWrites=true&w=majority' ,connectionParams)
console.log('connected to db')

}catch(e){
console.log('error',e)
}



}
