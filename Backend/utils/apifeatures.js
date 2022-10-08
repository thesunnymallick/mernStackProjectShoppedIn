const { json } = require("express");

class ApiFeatures{
    constructor(query, queryStr)
    {
        this.query=query;
        this.queryStr=queryStr;
    }
    search()
    {
        const keyword=this.queryStr.keyword
        ?{
          name:{
            $regex:this.queryStr.keyword,
            $options:"i"
          },
        }:{}
        
        this.query=this.query.find({...keyword});
        return this
    }


    filter(){
        const queryCopy={...this.queryStr}
    
        // Removing some Filed For Category:
        // category serach
        const RemvoesFields=["keyword","page","limit"];
        
        RemvoesFields.forEach((key)=>{
          delete queryCopy[key];
        })
       //  fliter for price and ratting Search :
         
         let queryStr=JSON.stringify(queryCopy);
         queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)

        this.query=this.query.find(JSON.parse(queryStr));
       
        return this;
    }

    pagination(resultPerPage){
        
        const currentPage=Number(this.queryStr.page) || 1;
        console.log(currentPage);
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports=ApiFeatures;