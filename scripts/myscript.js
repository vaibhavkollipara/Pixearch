var offsetValue=0;
var imagedesc ="";

$(document).ready(function(){
		$('#content').hide();
		
		$('#submitButton').click(function(){
			submitFunction();
		});
		
		$('#nextButton').click(function(){
			getData();
		});
		
		$('#resetButton').click(function(){
			resetData();
		});
		
});

function submitFunction(){
	
	$('#ipform').hide();
	$('#content').show();
	
	var ip = {'url':$('#imgdesc').val()};
	
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
		getData();
	})
	.fail(function(){
		console.log("Error!");
	});
	
}

function getData(){
	
	offsetValue++;
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
			count : 1,
			offset : offsetValue
		}
	})
	.done(function(data){
		//console.log(data);
		imagesHtml=imagesHtml+"<a href='"+data.value[0].webSearchUrl+"'><img src='"+data.value[0].thumbnailUrl+"'></a>";
		$('.box').html(imagesHtml);
	})
	.fail(function(){
		console.log("error");
	});	
}

function resetData(){
	offsetValue=0;
	$('#content').hide();
	$('#ipform').show();
	$('#imgdesc').val("");
	imagedesc="";
}