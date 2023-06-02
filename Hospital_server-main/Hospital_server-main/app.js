const express = require("express");
const app= new express()
const fs = require("fs")

app.use(express.json())//interpreting the json file

const hospitalData = require("./hospitalData.json")





//GET

app.get("/hospital",(req,res)=>{
    res.send(hospitalData)
})


//POST 

app.post("/hospital/create",(req,res)=>{
    hospitalData.push(req.body)
    fs.writeFile("hospitalData.json",JSON.stringify(hospitalData),(err)=>{
        if(err){
            res.send("data can'nt be written")
        }
        else{
            res.send("data written successfully")
        }
    })
})

//PUT

app.put("/hospital/:hospitalName",(req,res)=>{
    let hospitalName=req.params.hospitalName
    hospitalData.forEach((data)=>{
        if(data.hospitalName==hospitalName){
            data.hospitalLocation=req.body.hospitalLocation;
            data.patientCount=req.body.patientCount;
        }
    })
    fs.writeFile("hospitalData.json",JSON.stringify(hospitalData),(err)=>{
        if(err){
            res.send("data can'nt be updated")
        }
        else{
            res.send("data updated successfully")
        }
    })
})


//Delete method

app.delete("/hospital/:hospitalName",(req,res)=>{
    let hospitalName=req.params.hospitalName
   let val=hospitalData.filter(item=>item.hospitalName!==hospitalName)
    fs.writeFile("hospitalData.json",JSON.stringify(val),(err)=>{
        if(err){
            res.send("data can'nt be deleted")
        }
        else{
            res.send("data deleted successfully")
        }
    })
})




app.listen(4000,()=>{
    console.log("server started successfully.");
})