
window.onmouseup = function() {
    chrome.extension.sendRequest({selection: window.getSelection().toString()}, function(){
        return;
    });  
};
