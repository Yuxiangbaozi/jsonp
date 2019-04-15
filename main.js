$('.pay').on('click',() => {
    let name = 'baozi' + parseInt(Math.random()*10000,10)
    let script = document.createElement('script')
    script.src = 'http://frank.com:8001/pay?callback=' + name
    window[name] = function(result){
        if(result === 'success')
        money.innerText = money.innerText - 1
    }
    document.body.appendChild(script)
    script.onload = function(cl){
        alert('支付成功')
        cl.currentTarget.remove()
        delete window[name]
    }
    script.onerror = function(cl){
        alert('支付失败，请充值')
        cl.currentTarget.remove()
        delete window[name]
    }
})
$('.add').on('click',() => {
    let name = 'baozi' + parseInt(Math.random()*10000,10)
    let script = document.createElement('script')
    script.src = 'http://jack.com:8002/add?callback=' + name
    window[name] = function(result){
        if(result === 'success')
        money.innerText = +money.innerText + 1
    }
    document.body.appendChild(script)
    script.onload = function(cl){
        alert('充值成功')
        cl.currentTarget.remove()
        delete window[name]
    }
})