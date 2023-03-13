var express = require("express"); /* สำคัญมากบนนทัด1 และ 2 ประกาศไว้เพื่อให้นำไฟล์ Product มาเพิ่มเป็นไฟล์ Part*/
var router = express.Router();
const { check, validationResult } = require("express-validator"); /*export express validator มาใช้งานในการเช็คค่า*/
//const db = require('monk')
//const url = 'localhost:27017/TutorialDB'; /* เชื่อมต่อกับurl*/
const db = require('monk')("localhost:27017/TutorialDB") //วิธีเขียนอีกแบบนึง

router.get("/", function (req, res, next) {
  res.render("blog"); /*นำหน้าproject.ejs มาแสดง*/
});

router.get("/add", function (req, res, next) {
  res.render("addblog"); /*นำหน้าaddblog.ejs มาแสดง*/
});

router.post("/add",[/*ส่วนแบบฟอร์ม (เช็ค)*/
    check("name", "กรุณาป้อนชื่อบทความ").not().isEmpty(), /*เช็คชื่อบทความว่าถ้าเป็นค่าว่าง(ชื่อตัวแปร,ข้อความที่จะแสดง) isEmptyใช้ในการหาค่าใดๆของตัวแปรถ้าใส่notจะเป็นตรงข้ามคือถ้าไม่มีค่าในตัวแปร*/
    check("description", "กรุณาป้อนรายละเอียด").not().isEmpty(),/*เช็ครายละเอียด*/
    check("author", "กรุณาป้อนผู้แต่ง").not().isEmpty() /*เช็คชื่อผู้แต่ง*/
  ], function (req, res, next) {
    const result = validationResult(req);/*เก็บข้อความและนำรีเควรจากแบบฟอร์มมา*/
    var errors=result.errors;
    if(!result.isEmpty()) {/*ถ้าobject errorไม่เป็นค่าว่างจะทำงาน*/
      res.render('addblog',{errors:errors});/*ส่งค่า errorsไปที่addblog.ejs*/
    }else{
      //insert to db
      var ct=db.get('blogs');
      ct.insert({
        name:req.body.name, //คอมลัมname จับคู่กับค่าที่ส่งมากจากแบบฟอร์มname
        description:req.body.description,
        author:req.body.author
      },function(err,blog){
        if(err){
          res.send(err);
        }else{
          res.location('/');
          res.redirect('/blog/add');
        }
      });
    }
  });

module.exports = router; /* นำมา export ในrouter*/
