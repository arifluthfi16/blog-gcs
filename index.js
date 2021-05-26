const express = require('express')
const multer = require('multer')
const { uploadImage } = require('./helpers/helpers')

const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

app.use(multerMid.single('file'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/uploads', async (req, res, next) => {
  try{
    const myFile = req.file
    const imageUrl = await uploadImage(myFile)
    res.status(200).json({
        message : "Upload succeed",
        data : imageUrl
    })
  }catch(err){
    next(err)
  }
})

app.use((err, req, res, next) => {
    res.status(500).json({
      error: err,
      message: 'Internal server error!',
    })
    next()
  })

app.listen(3030, () => {
  console.log(`Listening at port ${3030}`)
})