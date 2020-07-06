const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../Models/Product.model');
const createError = require('http-errors');

//******** Homework: Make a search like newegg for products i.e maybe a dynamic templete */

router.get('/', async (req, res, next) =>
{
    try
    {
        //Takes two parameters .find(query, projection).
        //Two ways to provide the projection. Provide the fields
        //or provide the fields that you don't want.
        //const result = await Product.find({}, {__v: 0});
        //const result = await Product.find({}, {name: 1, _id: 0, price: 1});
        //const result = await Product.find({price: 699}, {});
        const result = await Product.find({}, {__v: 0});
        res.send(result);
    }
    catch(error)
    {
        console.log(error.message);
    }

   //next(err = new Error('I am coming from route.get /'));
   //res.send('getting a list of all products'); //pritns on browser
});

//Type of errors: Type one, invalid json, app.use handle this error. Type two is
//                  missing json input.
router.post('/', async (req, res, next) =>
{
   //Note You have two options either promises  or asych

    //Asych await saving method
    //req.body is the same as the bottom array.
   try
   {
    console.log('I am inside product post function');
    const product = new Product(req.body);
    console.log('I am inside product post function');
    const result = await product.save();
    res.send(result);
   }
   catch(error)
   {
        console.log(error.message);
        if(error.name === 'ValidationError');
        {
            next(createError(422, error.message));
            return;
        }
        next(error);
   };

 
    /*
   console.log(req.body);
   //I believe the object product carrires the savving address.
   const  product = new Product
   ({
        name: req.body.name,
        price: req.body.price
   });

   //Using product method
   product.save()
   .then(result =>
    {
        console.log(result);
        res.send(result);
    })
    .catch(err =>
        {
            console.log(err);
        });
   //NOTE: can only run one res.send
   //res.send(req.body);
   //res.send('product created'); */
});
router.get('/:id', async (req, res, next) =>
{
    //If passing findbyID best get req.params
    //else try using findOne
    const id = req.params.id;
    try
    {
        //Best to use this method: wrapper and provide by mongoose
        console.log('Inside get by id');
        //If valid id but does not exist then product is null and move to next line
        //If invalid id this jumps to catch statement. Also i.e. not a mongoose object id
        const product = await Product.findById(id);
        console.log(product);
        console.log(product);
        console.log(product);
        //If product value is null run this.
        if (!product)
        {
            console.log('Inside if(!product) get id');
            throw createError(404, 'Product does not exist.');
        }
        //Need to pass in the query
        //const product = await Product.findOne({_id: id });
        res.send(product);
    }
    catch(error)
    {
        console.log(error.message); //Prints 'undefined'
        console.log('Catch error in route.get');
        if (error instanceof mongoose.CastError)
        {
            next(createError(400, 'Invalid Product id'));
            return;
        }
        next(error);
    }

    //console.log(id);
    //res.send(id);
});
router.patch('/:id', async (req, res, next) =>
{
   try
   {
    //Note: When passsing req.body, the function
    //      takes care of knowing how many parameters
    //      are going to change.
    const id = req.params.id;
    const update = req.body;
    const option = {new: true};
    //3 parameters, id, update, option.
    //This also returns the old document not the updated
    const result = await Product.findByIdAndUpdate(id, update, option);
    res.send(result);
   }
   catch(error)
   {
       console.log(error.message);
   }

   // res.send('updating a single product.');
});

//Note: So you need check errors. Type one, invalid id object type
//      Type two, a valid id object but does not exist.
router.delete('/:id', async (req, res, next) =>
{
    const id = req.params.id;
    try
    {
        //If id not found result value is null.
        //Note: Product id is saved somewhere for it to throw
        //      Cast to ObjectId failed for value "" at console
        const result = await Product.findByIdAndDelete(id);
        //res.send(result);
       
        //Best to use this method: wrapper and provide by mongoose
        console.log('Inside delete by iddd');
        //If valid id but does not exist then product is null and move to next line
        //If invalid id this jumps to catch statement. Also i.e. not a mongoose object id
        console.log(result);
        console.log(result);
        //console.log(product); Will cause catch.
        //If product value is null run this.
        if (!result)
        {
            console.log('Inside if(!product) of delete');
            throw createError(404, 'Product does not exist.');
        }
    }
    catch(error)
    {
        console.log(error.message); //Prints 'undefined'
        console.log('Catch error in route.delete');
        if (error instanceof mongoose.CastError)
        {
            next(createError(400, 'Invalid Product id'));
            return;
        }
        next(error);
    }
    //res.send('deleting a single product.');
});

module.exports = router;