const mongoose=require("mongoose")
const initData=require("./data.js")
const Listing=require("../models/listing.js")
// const sampleListings = require("./data.js");

main()
.then(()=>{console.log("connected to DB!")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'6678e77f34c6b67eeb1796e0'}));
    await Listing.insertMany(initData.data)
    console.log("Data was initilized")
}
initDB();