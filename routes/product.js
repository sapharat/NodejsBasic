var express = require('express');/* สำคัญมากบนนทัด1 และ 2 ประกาศไว้เพื่อให้นำไฟล์ Product มาเพิ่มเป็นไฟล์ Part*/
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("Product_Stock"); /*นำหน้าproject.ejs มาแสดง*/
  });
  
router.get('/add', function(req, res, next) {
    res.send('add Product User');/* แสดงข้อความ ในpart add*/
});

router.get('/edit', function(req, res, next) {
    res.send('edit Product User');/* แสดงข้อความ ในpart edit*/
});

router.get('/delete', function(req, res, next) {
    res.send('delete Product User');/* แสดงข้อความ ในpart delete*/
});//

  module.exports = router; /* นำมา export ในrouter*/