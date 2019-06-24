const functions = require('firebase-functions');
const cors = require('cors')({origin: true})
const fs = require('fs')
const uuid = require('uuid-v4')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
    projectId: 'cloneinsta-b29e7',
    keyFilename: 'cloneinsta.json'
})

exports.uploadImage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        try {
            fs.writeFileSync('/tmp/imageToSave.jpg', 
                req.body.image, 'base64')


            const bucket = storage.bucket('cloneinsta-b29e7.appspot.com')
            const id = uuid()
            bucket.upload('/tmp/imageToSave.jpg', {
                upload: 'media',
                destination: `/posts/${id}.jpg`,
                metadata: {
                    metadata: {
                        contentType: 'image/jpeg',
                        firebaseStorageDownloadTokens: id
                    }
                }
            }, (err, file) => {
                if ( err ) {
                    console.log(err)
                    res.status(500).json({error: err})
                } else {
                    const fileName = encodeURIComponent(file.name)
                    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'
                        + bucket.name + '/o/' + fileName + '?alt=media&token=' + id
                        return res.status(201).json({ imageUrl: imageUrl })
                }
            })
        } catch(err) {
            console.log(err)
            return res.status(500).json({error: err})
        }
    })
});
