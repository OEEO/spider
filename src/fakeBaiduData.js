const phantomProxy = require('phantom-proxy');
const fs = require('fs')

let makeProxyHttp = (url) => {
  console.log('makeProxyHttp')
  let page = require('webpage').create();
  page.onResourceRequested = function(request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
  };
  page.onResourceReceived = function(response) {
    console.log('Receive ' + JSON.stringify(response, undefined, 4));
  };
  page.open(url);
}

let fakeTimesHttpData = (url, count) => {
  console.log('fakeTimesHttpData')
  let i = 1
  let timer = setInterval(() => {
    makeProxyHttp(url)
    if (i++ > count) clearInterval(timer)
  }, 1000)
}

let targetUrl = 'https://activity.9kacha.com/Grenache/?source=p1'
fakeTimesHttpData(targetUrl, 1)
