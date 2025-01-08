import { NextFunction, Request, Response } from "express";
import envConfig from "../config/config";
import noteModel from "../note/noteModel";
import createHttpError from "http-errors";
import fs from "fs";

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file
      ? `${envConfig.backendUrl}/${req.file.filename}`
      : "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg";
    const { title, subtitle, description } = req.body;
    console.log(req.file)
    if (!title || !subtitle || !description) {
      res.status(400).json({
        message: "please enter title,subtitle and description",
      });
      return;
    }
    await noteModel.create({
      title,
      subtitle,
      description,
      file,
    });
    res.status(200).json({
      message: "Note created",
    });
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while creating"));
  }
};

const listNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({
      message: "Notes fetched",
      data: notes,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while fetching data..."));
  }
};

const listNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);
    if (!note) {
      return next(createHttpError(404, "Note not found with given id"));
    }
    res.status(200).json({
      message: "Note fetched",
      data: note,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while fetching data..."));
  }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);
    if (!note) {
      return next(createHttpError(404, "could not find note"));
    }
    const filename = note.file.replace(`${envConfig.backendUrl}/`, "");
    if (filename) {
      fs.unlink(`src/uploads/${filename}`, (err) => {
        if (err) {
          next(createHttpError(500, "could not delete file"));
        } else {
          console.log("file successfully deleted");
        }
      });
    }

    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Note deleted",
    });
  } catch (err) {
    return next(createHttpError(500, "Error while deleting data..."));
  }
};

const editNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const note = await noteModel.findById(id)
        if(!note){
          return  next(createHttpError(404,'Note not found'))
        }
      let filename = note.file
      if(req.file){
        filename = `${envConfig.backendUrl}/${req.file.filename}`
        const oldFileName = note.file.replace(`${envConfig.backendUrl}/`, "")
        fs.unlink(`src/uploads/${oldFileName}`,(err)=>{
            if(err){
                next(createHttpError(500,'Could not replace file'))
            }else{
                console.log('file successfully replaced')
            }
        })
      }
      console.log(req.body)
      console.log(req.file)
      const { title, subtitle, description } = req.body;
      await noteModel.findByIdAndUpdate(id,{
        title,
        subtitle,
        description,
        file: filename,
      });
      res.status(200).json({
        message: "Note edited",
      });
    } catch (err) {
      console.log(err);
      return next(createHttpError(500, "Error while editing"));
    }
  };

export { createNote, listNotes, listNote, deleteNote, editNote };
