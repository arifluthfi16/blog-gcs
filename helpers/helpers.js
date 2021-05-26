const util = require('util')
const gc = require('../config')
const bucket = gc.bucket('freebies-bucket-1')

exports.uploadImage = (file) => new Promise((resolve, reject)=>{
    const {originalname, buffer} = file

    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
        resumable: false
    })

    blobStream.on('finish', ()=> {
        const publicUrl = util.format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        )

        resolve(publicUrl)
    }).on('error', (err)=> {
        console.log(err)
        reject(`Unable to upload iamge, something went wrong`)
    })
    .end(buffer)
})