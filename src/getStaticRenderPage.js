const superagent = require('superagent')
const cheerio = require('cheerio')

let targetUrl = 'https://www.douban.com/event/32103381/'

superagent.get(targetUrl).end((err, res) => {
  let content = res.text
  let $ = cheerio.load(content)
  console.log(content)
})
