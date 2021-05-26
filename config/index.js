const Cloud = require("@google-cloud/storage")
const path = require('path')
const serviceKey = path.join(__dirname, './freebies-313015-ae59e0001212.json')

const {Storage} = Cloud

const storage = new Storage({
    keyFilename : serviceKey,
    projectId : 'freebies-313015'
})

module.exports = storage