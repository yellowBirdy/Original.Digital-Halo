var DigitalHalo =  {
    init: function()  {
        gBrowser.addEventListener("DOMContentLoaded", this.getData, false);    
    },

    onMenuItemCommand: function()  {
        window.open("chrome://digital-halo/content/hello.xul", "", "chrome");		      
    },

    getData: function(anEvent)   {
        var doc = anEvent.originalTarget; 
	var adr = doc.location.href;
        var tit = doc.getElementsByTagName("title")[0].innerHTML;
	alert(adr+ "\n"+ tit);
    }
};

window.addEventListener("load", function load(event) { 
    window.removeEventListener("load", load, false);    
    DigitalHalo.init(event);  
}, false);
// window.addEventListener("load", function(e)  { alert("a");  }, false)
// window.onload = alert{"a");
// window.onload = DigitalHalo.getTitle;
