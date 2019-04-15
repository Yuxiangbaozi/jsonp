var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if(path === '/'){
    response.statusCode = 200
    var string = fs.readFileSync('./index.html','utf8')
    var db = fs.readFileSync('./db','utf8')
    string = string.replace('&&&money&&&', db)
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/jquery-3.3.1.js'){
    response.statusCode = 200
    var string = fs.readFileSync('./jquery-3.3.1.js','utf8')
    response.setHeader('Content-Type', 'application/Javascript')
    response.write(string)
    response.end()
  }else if(path === '/style.css'){
    response.statusCode = 200
    var string = fs.readFileSync('./style.css','utf8')
    response.setHeader('Content-Type', 'text/css')
    response.write(string)
    response.end()
  }else if(path === '/main.js'){
    response.statusCode = 200
    var string = fs.readFileSync('./main.js','utf8')
    response.setHeader('Content-Type', 'application/Javascript')
    response.write(string)
    response.end()
  }else if(path === '/pay'){
    var db = fs.readFileSync('./db','utf8')
    var newdb = db - 1
    if( db > 0 ){
      response.statusCode = 200
      fs.writeFileSync('./db',newdb)
      response.setHeader('Content-Type', 'application/Javascript')
      response.write(`
        ${query.callback}.call(undefined,'success')
        `)
    }else{
      response.statusCode = 400
    }
    response.end()
  }else if(path === '/add'){
    var db = fs.readFileSync('./db','utf8')
    var newdb = +db + 1
    response.statusCode = 200
    fs.writeFileSync('./db',newdb)
    response.setHeader('Content-Type', 'application/Javascript')
    response.write(`
      ${query.callback}.call(undefined,'success')
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


