import { NextFunction, Request, Response } from "express";
import envConfig from "../config/config";
import noteModel from '../note/noteModel'
import createHttpError from "http-errors";

const createNote =  async (req:Request,res:Response,next:NextFunction) =>{
   try{
    const file = req.file ? `${envConfig.backendUrl}/${req.file.filename}` : 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
    const {title,subtitle,description} = req.body;
    if(!title || !subtitle || !description){
        res.status(400).json({
            message: 'please enter title,subtitle and description'
        })
        return
    }
    await noteModel.create({
        title,
        subtitle,
        description,
        file,
    })
    res.status(200).json({
        message:'Note created'
    })

   }catch(err){
    console.log(err);
    return next(createHttpError('500','Error while creating'))
   }
}