const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

const controllers = require("./controllers")
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH']
  })
);
app.use(cookieParser());
app.get('/', (req, res) => {
  res.status(201).send('Hello World');
});

// user API
app.post('/signup', controllers.signup)
app.post('/login', controllers.login)
app.patch('/users/edit', controllers.edit)
app.get('/signout', controllers.signout)
app.delete('/resign', controllers.resign)
app.get('/users/info', controllers.info)  // GET으로 변경
app.get('/users/rank', controllers.rank)
app.delete('/users/deletequiz', controllers.userDeleteQuiz)
// email auth API
app.get('/confirmemail', controllers.emailAuth)

// oauth API
app.get('/auth/google', controllers.google)
app.get('/auth/git', controllers.gitOauth)

// quiz API
app.get('/mynote', controllers.mynote)
app.get('/mypublish', controllers.myPublish)  // GET으로 변경
app.post('/mynote/add', controllers.addMyNote)
app.post('/mynote/delete', controllers.deleteMyNote)

app.get('/quizzes', controllers.quizzesAll)  // GET으로 변경
app.get('/quizzes/selectquiz/', controllers.quizId)
app.post('/quizzes/newquiz', controllers.newQuiz)
app.post('/quizzes/submit', controllers.submit)
app.post('/quizzes/recommend', controllers.recommend)

// item API
app.post('/items/add', controllers.addItem)
app.get('/items/all', controllers.itemsAll)
app.post('/buy', controllers.buyItem)
app.get('/myitems', controllers.myItem)  // GET으로 변경

// admin API
app.post('/admin/signup', controllers.adminSignup)
app.post('/admin/login', controllers.adminLogin)
app.get('/admin/signout', controllers.adminSignout)
app.get('/approvalpage', controllers.approvalPage)  // GET으로 변경
app.post('/approve', controllers.approve)
app.delete('/admin/deletequiz', controllers.deleteQuiz)

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
