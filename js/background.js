function Background()
{
    this.meanings = true;
    var $this = this;
    chrome.extension.onRequest.addListener(function(request, sender, callback){
        console.log(request);
        if(request.query)
            $this.query(request.query, callback);
        if (request.options) {
            $this.meanings = (localStorage['meanings'] !== "false");
            callback(localStorage);
        }

        if (request.selection) {
            if (request.selection === "")
                return;

            var req = new XMLHttpRequest();
            if($this.meanings)
                req.open('GET', 'https://chrome.duckduckgo.com?q=' + encodeURIComponent(request.selection) + '&format=json', true);
            else
                req.open('GET', 'https://chrome.duckduckgo.com?q=' + encodeURIComponent(request.selection) + '&format=json&d=1', true);

            req.onreadystatechange = function(data) {
                if (req.readyState != 4)  { return; } 
                var res = JSON.parse(req.responseText);

                console.log(res);
                var out = 'Ask the duck';

                if (res['AnswerType'] !== "" ||                                          
                      (res['Type'] === 'A' && res['Abstract']  === '') ||                
                      res['Type'] === 'E') {                                             
                    out = res['Answer'];                                               
                } else if (res['Type'] === 'A' && res['Abstract'] !== '') {              
                    out = res['Heading'] + ": " + res['AbstractText'];                 
                } else if (res['Type'] === 'D' && res['Definition'] !== '') {
                    out = res['Definition'];
                }

                console.log("updating", out);

                chrome.contextMenus.update($this.menuID, {
                    title: out
                });
            }
            req.send(null);
 
       }
    });

    this.menuID = chrome.contextMenus.create({
         "title" : "Ask the duck",
         "type" : "normal",
         "contexts" : ["selection"],
         "onclick" : function() {
            console.log('clicked!!!'); 
         }
    });
}

Background.prototype.query = function(query, callback) 
{
    var req = new XMLHttpRequest();
    if(this.meanings)
        req.open('GET', 'https://chrome.duckduckgo.com?q=' + encodeURIComponent(query) + '&format=json', true);
    else
        req.open('GET', 'https://chrome.duckduckgo.com?q=' + encodeURIComponent(query) + '&format=json&d=1', true);

    req.onreadystatechange = function(data) {
        if (req.readyState != 4)  { return; } 
        var res = JSON.parse(req.responseText);
        callback(res);
    }
    req.send(null);
}
