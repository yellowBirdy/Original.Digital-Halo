var DigitalHalo =  {
    onLoad: function()  {
        this.initialized = true;
    },

    onMenuItemCommand: function()  {
        window.open("chrome://helloworld/content/hello.xul", "", "chrome");		      
    }
};

window.addEventListener("load", function(e) { DigitalHalo.onLoad(e);  }, false);
