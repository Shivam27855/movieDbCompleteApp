const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
//const API_KEY ="k_mx0sw95w";
const API_KEY = "k_gz5j5ynf";
app.set('views', path.join(__dirname, 'WebContent/app/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"WebContent/app/public")));
app.use(express.urlencoded({extended:true}))
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/search', (req, res) => {
    let movieData=[];
    axios.get("https://imdb-api.com/en/API/SearchMovie/"+API_KEY+"/"+req.query.movieName).then(resp => {
        //console.log(resp)
        if(resp.data.results==null)
        {
            res.render("limitExceeding");
        }
        else{
    movieData=resp.data.results;
   // console.log(movieData);
    res.render('movieLibrary',{filterMoviedata:movieData});
        }
});

   
})


app.get("/popupMovie",(req,res)=>{
    //let movieData={};
    axios.get("https://imdb-api.com/en/API/Title/"+API_KEY+"/"+req.query.id).then(resp=>{
        // movieData.title=req.query.id;
        // movieData.img="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_Ratio0.6791_AL_.jpg"
        // movieData.plot=req.query.id;
        res.send('<div class="modal-header modal-movieLibrary-header"><a data-toggle="tooltip" data-placement="top" href="/movieShow?movieId='+req.query.id+'" class="modal-title" id="movieLibrary-modal-movieTitle" title="'+resp.data.title+'">'+resp.data.title+'</a></div><div class="modal-body"><div class="row"><div class="col-sm-4"><img id="movieLibrary-modal-movieImage" src="'+resp.data.image+'" alt="" srcset="" style="width: 15rem;height: 25rem;"></div><div class="col-sm-8 modal-plot" style="max-width: 60rem; max-height:25rem"><p id="movieLibrary-modal-moviePlot" style="color:white;font-size: 1.5rem;">"'+resp.data.plot+'"</p></div></div></div><div class="modal-footer movieLibrary-modal-footer"><button type="button" class="btn btn-secondary modal-close-btn" data-dismiss="modal">Close</button></div>');
        // res.sendFile(path.join(__dirname, '../views','/modalPopup.ejs'));
        // console.log(path.join(__dirname,"/WebContent/app/views/modalPopup"))
        res.end();
    })
    
}) 

app.get('/movieLibrary', (req, res) => {
    let mo=[];
    res.render('movieLibrary',{filterMoviedata:mo})
});
app.get('/movieShow', (req, res) => {
    let id=req.query.movieId;
    console.log(id);
    if(id==undefined)
    {
        res.render("notFound")
    }
    let movieData={};
    axios.get("https://imdb-api.com/en/API/Title/"+API_KEY+"/"+req.query.movieId).then(resp => {
        //console.log(resp)
        movieData=resp.data;
        //console.log(movieData.length)
        if(movieData.id==null)
        {
            res.render("limitExceeding");
        }
        else{
    
    res.render('movieShow',{showMoviedata:movieData});
       }
});
})

// app.get('/searchMovie', (req, res) => {
//     res.render('main')
// })

// app.get("/movie",(req,res)=>{
//     //  res.render('moviePage', {
//     //     tagline: req.query.id});
//     res.render('moviePage');
// })


app.listen(PORT, () => {
    console.log(__dirname)
})