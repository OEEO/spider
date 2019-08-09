// const axios = require('axios')
const circularJson = require('circular-json')
const fs = require('fs')
const phantom = require('phantomjs')

let baseUrl = 'https://www.douban.com/group/gz020/discussion'

!async function() {
  const instance = await phantom.create()
  const page = await instance.createPage()
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url)
  });

  const status = await page.open(baseUrl)
  const content = await page.property('content')
  console.log(content);
  try {
    fs.unlinkSync('./test.json')
    console.log('json文件已经删除')
  } catch (e) {
    console.log('json文件已经删除')
  }
  fs.appendFile('./test.html', content, (err) => {
    if(err) {
      throw err
    } else {
      console.log('写入json')
    }
  })
  await instance.exit()
}()
