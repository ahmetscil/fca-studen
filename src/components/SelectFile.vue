<template>
  <label class="file-select">
    <div class="select-button">
      <span id="btnText"></span>
    </div>
    <input type="file" @change="handleFileChange"/>
    <input type="hidden" id="uploadedFile">
  </label>
</template>

<script>
  import AWS from 'aws-sdk'
  import uuidv4 from 'uuid/v4'
  const fs = require('fs');
  export default {
    data() {
      return {
      }
    },
    props: {
      value: File
    },
    mounted() {
      $('#btnText').html('<i class="fas fa-images"></i> Select File')
    },
    methods: {
      handleFileChange(e) {
        this.$emit('input', e.target.files[0])
        $('#btnText').html('<i class="fas fa-hourglass-half"></i> Please Wait')
        this.upload_2_AWS(e.target.files[0], localStorage.getItem('userEmail'), e.target.files[0].type)
      },
      upload_2_AWS (filepath, userID, filetype) {
        AWS.config.update({
          'accessKeyId': 'AKIAUP63VO4PYVRSEQUO',
          'secretAccessKey': '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'
        })
        var file_key = String(userID) + '/' + (new Date()).toISOString().slice(0, 12) + '*' + uuidv4().slice(0, 10) + '/' + filepath.name.split('/').slice(-1)[0]
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if(!allowedExtensions.exec(filepath.name)){
          alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
          return false;
        } else {
        }
        var file = new File([filepath], filepath.name, {type: filetype})
        var s3 = new AWS.S3()
        var params = {
          Bucket: 'flp-img',
          Key: file_key,
          ACL: 'public-read', // bunu exceli yüklerken kalır ama imagelarda kalsın.
          Body: file, // data
          ContentType: filetype
        }
        s3.putObject(params, function (err, res) {
          if (err) {
            console.log('Error uploading data: ', err)
          } else {
            var params = {Bucket: 'flp-img', Key: file_key}
            s3.getSignedUrl('putObject', params, function (_err, url) {
              url = url.split('?')[0]
              $('#uploadedFile').val(url)
              $('#btnText').html('<i class="far fa-check-square"></i> File Uploaded')

            })
          }
        })

      },

    }
  }
</script>

<style scoped>
.file-select > .select-button {
  padding: 1rem;
  cursor: pointer;
  color: white;
  background-color: #2EA169;

  border-radius: .3rem;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}
</style>