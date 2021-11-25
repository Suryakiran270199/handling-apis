const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());


const movies =[
     {id:1,name:"jai bhim",year:"2021"},
     {id:2,name:"singam2",year:"2013"},
     {id:3,name:"singam3",year:"2017"},
     {id:4,name:"singam4",year:"202."},
]

// get method : used to retrive the data from the url:
app.get('/tfm/surya/movies/:id' , (req,res) =>{
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) res.status(404).send('the give movie id is not found')

    res.send(movie)
})       

// post method: used to create new data to url:
app.post('/tfm/surya/movies',(req,res) =>{
  /*
    //manual validation:
    if(!req.body.name  || req.body.name.length <5 ){
        res.status(400).send('name is required and should be minimum 3 charas')
        return;
    }
   */

    const movie = {
        id: movies.length +1 ,
        name: req.body.name,
        year: req.body.year
    }
    movies.push(movie);
    res.send(movies);
})
// put :used to update the data in url:
app.put('/tfm/surya/movies/:id', (req,res) =>{
  const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) res.status(400).send('the given movie id is not found')

    movie.name = req.body.name;
    res.send(movie)
})

//delete:used to delete data in url :

app.delete('/tfm/surya/movies/:id',(req,res)=>{
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie)res.status(400).send('the given movie id is not found')

    const index = movies.indexOf(movie);
    movies.splice(index,1)

    res.send(movies)
})


const PORT = process.env.PORT || 4000 ; 
app.listen(PORT , () =>{
    console.log(`listening port ${PORT}`)
})
