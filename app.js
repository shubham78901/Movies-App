const express = require('express');
const app = express();
const path = require('path');
const request = require('request');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));



app.get('/results', (req, res)=> {

    let query = req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=40e2f3c4ff03e73e75bd042797b3f1b7&query='+query, (error, response, body) => {
        if(error) {
            console.log(error);
        }
           console.log(body);
        let data = JSON.parse(body);
      //  console.log(data);
        res.render('movies', {data:data, searchQuery:query});

    });

});

app.get('/', (req,res)=> {
    res.render('search');
});

app.listen(3000, ()=>{
    console.log('Server started at port 3000.');
});