var express = require('express');
var router = express.Router();
const uuid = require("uuid").v4



let localDb = [{
  id:'1234-5647-8644',
  title:"no",
  dec:"means no",
  date: new Date().toLocaleDateString("en-US",{
    year:"numeric",
    month:"long",
    day:"numeric",
    minute:"2-digit"
  })

}
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{tasks:localDb});
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/add', function(req, res, next) {
  const {title,dec} = req.body;
  if(title.length <4 || dec.length <15){
    return res.send
    ("<h1> bdnvfmbs;ldkjfnhs.bkjfhvdbhmj,skmv;lkjsnhbkhvdcbsdklv</h1> <a href='/create'>Back</a> ");
    }
    let date  = new Date().toLocaleDateString("en-US",{
    year:"numeric",
    month:"long",
    day:"numeric",
    minute:"2-digit"
  })
  let newTAsk = {
    id:uuid(),
    date,
    title,
    dec,
  }
  localDb.push(newTAsk);
  res.redirect('/');
});

router.get('/edit/:id', function(req, res, next) {
  const id = req.params.id;
  const filterdata = localDb.filter(function(task){
   return task.id === id;
  });
  res.render('edit',{task:filterdata[0]});
});

router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  const filterdata = localDb.filter(function(task){
   return task.id !== id;
  })
  localDb= filterdata;
  res.redirect("/");
});

router.post("/update/:id", function (req, res, next) {
  const id= req.params.id;
  const {title,dec} = req.body;
  
  const taskindex = localDb.findIndex(function(task){
   return task.id === id;
  });
  const activetask = {...localDb[taskindex],title,dec};
  localDb[taskindex] = activetask;
      // res.json({taskindex});
  res.redirect('/');
});



module.exports = router;
