    var getParams = function(url){
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for(var i in vars){
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    }
    //Usage:
    var urlParams = getParams(window.location.href);
    
    //----
    var getHost = function(){ 
        return window.location.hostname;
    }
    var urlHost = getHost(); 
    
    //----
    var getProtocol = function(){ 
        return window.location.protocol;
    }
    var urlProtocol = getProtocol(); 
    
    
    
    
    

