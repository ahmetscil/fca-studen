<template>
  <div>
    <button type="button" @click="upload_2_AWS('./logo.png', 14)">test</button>
    <vue-dropzone
      id="dropzone"
      :awss3="awss3"
      :options="dropzoneOptions"
      @vdropzone-s3-upload-error="s3UploadError"
      @vdropzone-s3-upload-success="s3UploadSuccess"
      @vdropzone-success="dropzoneSuccess"
    ></vue-dropzone>
  </div>
</template>
<script>
  import vue2Dropzone from 'vue2-dropzone'
  import AWS from 'aws-sdk'
  import uuidv4 from 'uuid/v4'
  const fs = require('fs');
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'
  export default {
    components: {
      vueDropzone: vue2Dropzone
    },
    data: function () {
      return {
        images: {},
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 4,
          headers: { "My-Awesome-Header": "header value" }
        },
        awss3: {
          signingURL: (f) => {
            const key = `http://localhost:8080/upload?filename=${f.name}`
            this.images[f.name] = f
            return key
          },
          headers: {},
          params: {},
          // We'll take care of pusting the image details to our server on our own
          sendFileToServer: false,
        }
      }
    },
    methods: {
      // Fired AFTER a file is successfully uploaded to S3
      dropzoneSuccess (file, res) {
        const { type: contentType, size, height, width, s3Signature: { key: path } } = file
        // Here you would POST/GraphQL to your own server the details
        const input = {
          id: this.unitId,
          image: {
            path,
            size,
            height,
            width,
            contentType,
          },
        }
      },
      upload_2_AWS (filepath, userID) {
        AWS.config.update({
          'accessKeyId': 'AKIAUP63VO4PYVRSEQUO', // gizli config dosyasında olmalı
          'secretAccessKey': 'Oq/cmOqQFcSzthSC3rTS7Dn2ydgZIE4nOPXg5M6m' // gizli config dosyasında olmalı
        })
        // --------- BU BOZULMASIN KESINLIKLE ------------------
        var file_key = String(userID) + '/' + (new Date()).toISOString().slice(0, 12) + '*' + uuidv4().slice(0, 10) + '/' + filepath.split('/').slice(-1)[0]
        // --------- BU BOZULMASIN KESINLIKLE ------------------
        
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if(!allowedExtensions.exec(filepath)){
          alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
          return false;
        } else {
        }
        var file = new File([""], filepath, {type: "image/png"})
        // var file = new File(filepath); // bu satir javascripte calisiyor node.jsde calismiyor
        // const data = fs.readFileSync(filepath) // bu satır node ile calıstırırken
        var s3 = new AWS.S3()
        var params = {
          Bucket: 'flp-img', // gizli config dosyasında olmalı
          Key: file_key,
          ACL: 'public-read', // bunu exceli yüklerken kalır ama imagelarda kalsın.
          Body: file // data
        }
        s3.putObject(params, function (err, res) {
          if (err) {
            console.log('Error uploading data: ', err)
          } else {
            console.log('Successfully uploaded data')
            var params = {Bucket: 'flp-img', Key: file_key}
            s3.getSignedUrl('putObject', params, function (_err, url) {
              url = url.split('?')[0]
              console.log('The URL is', url)
              // url'i return olarak kendine alırsın ve picture olarak APıa onu gönderirsin.
              // aynı url sana ileride listelenecek public olarak yükleiğin için image ı almakta zorlanmayacaksın.
            })
          }
        })
      },
      s3UploadError (errorMessage) {
        // Show an error message on failure
        console.log(errorMessage)
      },
      s3UploadSuccess (s3ObjectLocation) {
        // Show a message after uploaded to S3?
        console.log(s3ObjectLocation)
      },
    }
  }  
</script>