self.port.on('loadHalo', function (halo) {
    document.getElementsByTagName('h1')[0].innerHTML = halo
    //unsafeWindow.halo = cloneInto(halo, unsafeWindow)
    //unsafeWindow.halo = halo
    window.postMessage(halo, '*')
})
