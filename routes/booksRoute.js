import express from 'express';
import {Book} from '../models/bookModel.js';
const router=express.Router();
//Route for save a book
router.post('/',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear)
        {
            return res.status(400).send({message:'Send all required fiels:title,author,publishYear'});
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        };
        const book=await Book.create(newBook);
        return res.status(201).send(book);

    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});


//Route for get all books from database
router.get('/',async(req,res)=>{
    try{
        const books=await Book.find({});
       // return res.status(200).json(books);
       return res.status(200).json({
              totalBooks:books.length,
              data:books,
       })
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

//Route for get one book from database by id
router.get('/:id',async(req,res)=>{
    try{

        const  {id} =req.params;
        const book=await Book.findById(id);
       // return res.status(200).json(books);
       return res.status(200).json(book);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

//Route for update a book 
router.put('/:id',async(req,res)=>{
    try{    

        
        if(!req.body.title || !req.body.author || !req.body.publishYear)
        {
            return res.status(400).send({message:'Send all required fiels:title,author,publishYear'});
        }
        const {id}=req.params;
        const result=await Book.findByIdAndUpdate(id,req.body,{ new: true });
        if(!result){
            return res.status(404).send({message:'Book not found'});

        }
        return res.status(200).send(
            {message:'Book updated successfully'});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

//Route for delete a book
router.delete('/:id',async(req,res)=>
{
    try{
        const {id}=req.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:'Book not found'});
        }
        return res.status(200).json({message:'Book deleted successfully'});

    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

export default router;