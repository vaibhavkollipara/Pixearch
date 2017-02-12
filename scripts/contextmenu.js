var contextMenuItem = {
	"id" : "pixearch",	
	"title" : "Search similar images with pixearch",
	"contexts" : ["image"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
	
	if(clickData.menuItemId=="pixearch"){		
		var ip = {'url':clickData.srcUrl};
		$.ajax({
		url : "https://westus.api.cognitive.microsoft.com/vision/v1.0/describe?maxCandidates=1",
		beforeSend : function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{Your Key}");
            },
		type : 'post',
		dataType : 'json',
		data:JSON.stringify(ip)
	})
	.done(function(data){
		//console.log(data.description.captions[0].text);
		imagedesc = data.description.captions[0].text;
		chrome.tabs.create({ url: 'pixearch.html?query='+encodeURI(imagedesc) });
	})
	.fail(function(){
		console.log("Error!");
	});
	}
});