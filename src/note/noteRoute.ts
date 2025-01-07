import express from 'express'
import createNote from './noteController'
import multer from 'multer'
import { storage } from '../middleware/multerMiddlerware'

const noteRoute = express.Router()

const upload = multer({
    storage : storage
})

noteRoute.route('/').post(upload.single('file'),createNote)

export default noteRoute