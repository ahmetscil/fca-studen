/* eslint-disable no-case-declarations */
/* eslint-disable no-debugger */
/* eslint no-undef: "error" */
/* eslint-env browser */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import AWS from 'aws-sdk'
import uuidv4 from 'uuid/v4'
import fs from 'fs'
// var AWS = require('aws-sdk')
// const uuidv4 = require('uuid/v4')
// const fs = require('fs')
upload_2_AWS (filepath, userID) {
  AWS.config.update({
    'accessKeyId': 'AKIAUP63VO4PYVRSEQUO', // gizli config dosyasında olmalı
    'secretAccessKey': 'Oq/cmOqQFcSzthSC3rTS7Dn2ydgZIE4nOPXg5M6m' // gizli config dosyasında olmalı
  })
  // --------- BU BOZULMASIN KESINLIKLE ------------------
  var file_key = String(userID) + '/' + (new Date()).toISOString().slice(0, 12) + '*' + uuidv4().slice(0, 10) + '/' + filepath.split('/').slice(-1)[0]
  // --------- BU BOZULMASIN KESINLIKLE ------------------
  // var file = new File(filepath); // bu satir javascripte calisiyor node.jsde calismiyor
  const data = fs.readFileSync(filepath) // bu satır node ile calıstırırken
  var s3 = new AWS.S3()
  var params = {
    Bucket: 'flp-img', // gizli config dosyasında olmalı
    Key: file_key,
    ACL: 'public-read', // bunu exceli yüklerken kalır ama imagelarda kalsın.
    Body: data // file
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
}
// -  filepath,specialName,userID
upload_2_AWS('./test.png', 14)
// export default store
