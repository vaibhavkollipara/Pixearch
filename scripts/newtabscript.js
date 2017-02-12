var imagedesc="";
var offsetValue=0;

$(document).ready(function(){
	
	$('#nextButton').click(function(){
			getData();
		});
	
	var location = window.location.href;
	imagedesc = decodeURI(location.substr(location.indexOf("=")+1));
	getData();
});

function getData(){
	
	offsetValue+=18;
	var imagesHtml="";
	$.ajax({
		url : 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
		beforeSend : function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{Your Key}");
            },
		type : 'get',
		dataType : 'json',
		data :{
			q : imagedesc,
			count : 18,
			offset : offsetValue
		}
	})
	.done(function(data){
		console.log(data);
		for(var i=0;i<data.value.length;i++){
		imagesHtml=imagesHtml+"<a href='"+data.value[i].webSearchUrl+"'><img src='"+data.value[i].thumbnailUrl+"'></a>";
		}
		$('.box').html(imagesHtml);
	})
	.fail(function(){
		console.log("error");
	});	
}