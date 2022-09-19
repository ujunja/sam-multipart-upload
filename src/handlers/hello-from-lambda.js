const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const upload = async () => {

    const fileName = 'dummy.json';

    // contentTpyeの一覧
    // https://qiita.com/AkihiroTakamura/items/b93fbe511465f52bffaa
    const params = {
        Body: await fs.readFileSync(`./${fileName}`),
        ContentType: 'text/html',
        Bucket: 'lswn-multipart-upload-bucket',
        Key: fileName
    }

    return await new Promise((resolve, reject) => {
        s3.putObject(params, (err, results) => {
            err ? reject(err) : resolve(results);
        })
    })
} 

exports.multipartUploadHandler = async (event) => {
    console.log('S3 MultiUpload Event : ' + event);
    return upload();
}
