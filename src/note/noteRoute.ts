import express from 'express'
import {createNote, deleteNote, editNote, listNote, listNotes} from './noteController'
import multer from 'multer'
import { storage } from '../middleware/multerMiddlerware'

const noteRoute = express.Router()

const upload = multer({
    storage : storage
})

noteRoute.route('/')
.post(upload.single('file'),createNote)
.get(listNotes)

noteRoute.route('/:id')
.get(listNote)
.delete(deleteNote)
.patch(upload.single('file'),editNote)
export default noteRoute