const fs = require('fs')
const phantom = require('phantom')
const cheerio = require('cheerio')

let makeProxyHttp = async (url) => {
  let proxyIp = '212.129.143.89:80'
  const instance = await phantom.create([`--proxy=${proxyIp}`])
  const page = await instance.createPage()
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url)
  });
  const status = await page.open(url)
  const content = await page.property('content')
  let $ = cheerio.load(content)
  console.log(content)
  return await instance.exit()
}

let fakeTimesHttpData = (url, count) => {
  console.log('fakeTimesHttpData')
  let i = 1
  let _fakeTimesHttpData = (url) => {
    makeProxyHttp(url)
      .then(() => {
        if (++i > count) return
        _fakeTimesHttpData(url)
      })
  }
  _fakeTimesHttpData(url)

  // let timer = setInterval(() => {
  //   makeProxyHttp(url)
  //   if (i++ > count) clearInterval(timer)
  // }, 1000)
}

// let targetUrl = 'https://www.kuaidaili.com/free/'
let targetUrl = 'https://movie.douban.com/'
// let targetUrl = 'https://activity.9kacha.com/Grenache/?source=d812proxy'
fakeTimesHttpData(targetUrl, 1)
