const cheerio = require('cheerio')
const phantom = require('phantom')

let targetUrl = 'https://www.douban.com/event/32103381/'
// spa页面
!async function () {
  const instance = await phantom.create()
  const page = await instance.createPage()
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url)
  });
  const status = await page.open(targetUrl)
  let content = await page.property('content')
  let $ = cheerio.load(content)
  setTimeout(() => {

  }, 1000)
  console.log($)
  return await instance.exit()
}()

