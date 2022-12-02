const {MongoClient}=require('mongodb')
const state={
    db:null
}


module.exports.connect=function(done){
    const url='mongodb://localhost:27017'
    const dbname='shoping'
    MongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        else
        state.db=data.db(dbname)

   done()

    })
 

}
 module.exports.get=function(){
    console.log("getting")
    return state.db
 }
