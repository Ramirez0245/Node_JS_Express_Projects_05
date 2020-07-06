const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();

//Also middlewares
app.use(express.json()); //Handles json POST
app.use(express.urlencoded({extended: true})); //Handles x-www.form-urlencoded

//NOTE: If the database does exist on atlas it is possible to create
//      the database from this javascript file.
mongoose.connect('mongodb+srv://cluster0-qb9lb.mongodb.net/',
{
    dbName: 'RestApi_youtube',
    user: 'culexz0',
    pass: '789741Xt',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() =>
{
    console.log('MongoDb connected...');
});

//Wild-card for all http verbs that are get, post, patch, delete.
//NOTE: To use POST function you must use a middleware
app.all('/test', (req, res,) =>
{
    //console.log(req.query.name);
    //res.send(req.query);
    console.log(req.body);
    res.send(req.body);
});
//Wild-card for all http verbs that are get, post, patch, delete.
app.all('/test/:id', (req, res,) =>
{
    console.log(req.params);
    res.send(req.params);
});
app.all('/test/:id/:name', (req, res,) =>
{
    console.log(req.params);
    res.send(req.params);
});

const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);


//Middleware? IF route does not exist run this block.
app.use((req, res, next) =>
{
    //const err = new Error('Error oject.');
    //err.status = 404;
    //next(err);
    console('inside app.use');
    next(createError(404, 'Not found'));
});
//Error Handler. Middleware. Can be called from any route.
//Looks like connection is closed once this block finishes.
app.use((err, req, res, next) =>
{
    console.log('app.use function has been hit');
    res.status(err.status || 500);
    res.send
    ({
        error: 
        {
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(3000, () => { console.log('Server started on port 3000')});
 









/*
let i  = 0;
//app.get is http methond. 'next' is an option parameter.
app.get('/', (req, res, next) => 
{
    i++;
    console.log(i);
    console.log(req.url);
    console.log(req.method);
    res.send('I am the home route');
});

app.get('/products', (req, res, next) =>
{

})
//POST to the home route.
app.post('/', (req, res, next)=>
{

});

app.delete('/', (req, res, next) =>
{

});
*/


//NOTE: It is very tedious managing a single route inside the server
//      therefore better to use express.

/*
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/')
    {   
        if(req.method === 'GET') {
            console.log('Its a get method');
        }
        res.write('I am your homepage');
        res.end();
    }
    else if(req.url === '/another')
    {
        res.write('I am another route');
        console.log('Its a another method');
        res.end();
    }
    else
    {
        res.write('I am listening');
        res.end();
    }
});
server.listen(3000, () => 
{
    console.log('Server started on port 3000');
});
 */