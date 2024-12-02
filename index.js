require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fsPromises = require('fs').promises;
const fs = require('fs');
const mongoose = require('mongoose')
const ejs = require('ejs')
const flash = require('connect-flash')
const expressSession = require('express-session');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
require('console-stamp')(console, { 
    format: ':date(yyyy/mm/dd HH:MM:ss.l)' 
} );
// SETTING APP PULIC AND VIEWS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs')
app.set('views', __dirname + '/views');
app.use(flash())
app.use(cors());
const dbURI = process.env.MONGOURL
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
app.use(expressSession({
    resave: false, 
    saveUninitialized: false,
    secret:"Usdc@&!sdj233"
}))
app.use("*",(req,res,next) =>{
    loggedIn = req.session.userId
    next()
  })


// IMPORT PAGE & API
const IndexPage = require("./routes/IndexPage");
const LoginPage = require("./routes/LoginPage");
const VotePage = require("./routes/VotePage");
//IMPORT MIDDLEWARE
const RedirectAUTH = require("./middleware/redirectAuth")
const RedirectNOTAUTH = require("./middleware/redirectNotAuth")
const logoutAPI = require('./api/LogoutAPI')
const LogoutAPI = require("./api/LogoutAPI")
const LoginAPI = require("./api/LoginAPI")
const StudentAPI = require("./api/CheckStudent")
const VoteAPI = require("./api/voteAPI")
const FetchDataAPI = require("./api/FetchData")
// API PART
app.post('/api/login',RedirectAUTH,LoginAPI)
app.get('/api/vote',VoteAPI)
app.get('/api/fetch/status',FetchDataAPI)
app.get('/logout',LogoutAPI)
app.post('/api/student',RedirectNOTAUTH ,StudentAPI)
//PAGE PART
app.get('/',IndexPage)
app.get('/login',RedirectAUTH,LoginPage)
app.get('/vote',RedirectNOTAUTH,VotePage)
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
