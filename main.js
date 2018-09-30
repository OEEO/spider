const superagent = require('superagent')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const fs = require('fs')
const Json2csvParser = require('json2csv').Parser

// 目标首页
// let targetUrl = 'https://www.kaishiba.com/project/more'
// let targetUrl = 'https://gz.lianjia.com/zufang/'

// TODO 豆瓣租房防爬了
for(let i = 0; i < 3 ; i++) {
  let targetUrl = 'https://www.douban.com/group/haizhuzufang/discussion?start=0' + i * 25
  console.log(targetUrl)
  superagent.get(targetUrl).end((err, res) => {
    let content = res.text
    let $ = cheerio.load(content)
    let result = []
    $('#content .title').each((index, item) => {
      let title = $(item).text().replace(/\n|\r|\s/g, '')
      console.log(title)
      let re = /海珠/
      if (re.test(title)) {
        result.push(title)
      }
    })
    fs.appendFile('./data.json', JSON.stringify(result), (err) => {
      if(err) {
        throw err
      } else {
        console.log('写入json')
      }
    })
    // $('#house-lst>li').each((index, item) => {
    //     let $li = $(item)
    //     let title = $li.find('h2').text()
    //     let price = $li.find('.price').text()
    //     let location = $li.find('.con').text()
    //     let updateTime = $li.find('.price-pre').text()
    //     let img = $li.find('.pic-panel img').attr('src')
    //     let obj = {
    //         title: title,
    //         price: price,
    //         location: location,
    //         updateTime: updateTime,
    //         img: img
    //     }
    //     result.push(obj)
    //
    // // 写入json
    // fs.appendFile('./data.json', JSON.stringify(result), (err) => {
    //     if(err) {
    //         throw err
    //     } else {
    //         console.log('写入json')
    //     }
    // })
    //
    // // 写入csv
    // let fields = ['title', 'price', 'location', 'updateTime', 'img']
    // let json2csvParser = new Json2csvParser({fields})
    // let csv = json2csvParser.parse(result)
    // fs.appendFile('./data.csv', csv, (err) => {
    //     if(err) {
    //         throw err
    //     } else {
    //         console.log('写入csv')
    //     }
    // })
    //
    // })
  })
}
