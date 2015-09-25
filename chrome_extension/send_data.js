
chrome.runtime.onMessage.addListener(function(message,sender, cb) {
  setTimeout(function () {  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://dev.sensible.dtu.dk:9090/', true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(JSON.stringify({
      'sentUrl':            message.URL,
      'sentTitle':          message.title,
      'accessedAt':         message.accessedAt,
      '3rdPartyTrackers':   BAD_XDOMAIN_REQUESTS[sender.tab.id],
      '1stPartyTrackers':   FISHY_REQUESTS[sender.tab.id]  
    }))

  
    alert(JSON.stringify(BAD_XDOMAIN_REQUESTS[sender.tab.id], null, 4) + '\n' + FISHY_REQUESTS[sender.tab.id])
  }, 2000)

})



/*
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (message,sender) {

//    alert('from background sctipt on message' + message.URL)
  if (sender.name == "Halo_get_data_content_script") {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://dev.sensible.dtu.dk:9090/', true)
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
      xhr.send(JSON.stringify({
        'sentUrl':    message.URL,
        'sentTitle':  message.title,
        'accessedAt': message.accessedAt
      }))
    }
  })
}) 
*/

/*
document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://dev.sensible.dtu.dk:9090/', true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xhr.send(JSON.stringify({
    'sentUrl':    document.URL,
    'sentTitle':  document.title,
    'accessedAt': Date.now()
  }))
}, false) 
*/
/*
chrome.tabs.onUpdated.addListener(function (id, changeInfo, tab) {
  if(changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined){
    alert( tab.title +  tab.url)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://dev.sensible.dtu.dk:9090/', true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(JSON.stringify({
      'sentUrl':    tab.url,
      'sentTitle':  tab.title,
      'accessedAt': Date.now()
    }))
  }
})
 * ST / application/json;char
*/
