$(document).ready(function(e) {
	
	/////	Objects		/////
	//---------------------//

	/* Object:	Cookie object is used for a partially developed 'URL History'
				site feature. If 'cookie.flag = true' then the history panel
				will be visible and a 'urlHistory' cookie is created.
	*/
	var cookie = {
		flag : false, // MUST default to false (Cookie Act), negate on 'allow cookies'
		name : "urlHistory",
		data : '',
		expire : 7, //days
		isAdded : false
	};
	cookie.data = getCookie();
	setCookie();
	
	/* Object:	GoogleAPI object contains all data needed for the Goo.gl API.
				'attempts' and 'attemptsLimit' hold the number and limit of
				unsuccessful server requests. (Optional, add fallback url-shortener API).
	*/
	var googleAPI = {
			key : 'AIzaSyBNkn6HVlq0AAy_rK1WnL2uJ4Upbqs0Yxw',
			host : 'https://www.googleapis.com/urlshortener/v1/url?key=',
			contentType : 'application.json',
			attempts : 0,
			attemptsLimit : 2
	}
	/* Object:	URLInput object contains all data needed for the Goo.gl API.
				'attempts' and 'attemptsLimit' hold the number and limit of
				unsuccessful server requests. (Optional, add fallback url-shortener API).
	*/
	var URLInput = { 
			val : '',
			searchVal : '',
			isEmpty : true,
			hasChanged : false
		};
	/* Object:	Wrapper object controls '#contentWrapper' animation logic
	*/
	var wrapper = {
			state : URLInput.isEmpty // default: True , means wrapper has css {top:'50%'}
	}
	/* Object:	MetaInfo object holds meta information about the submitted, validated
				URL. If 'active=true' then '#websiteInfoContainer' will be visible.
				
				Note:	Could not find a reliable CORS proxy and attempts of using PHP
						scripts to extract this information were unreliable. Could use
						PHP 'CUrl' in the future for better results.
	*/
	var metaInfo = {
		active : false,
		corProxy : 'https://crossorigin.me/',
		title : '',
		description : '',
		author : '',
		copyright : '',
		keywords : '',
	}
	
	
	
	
	
	/////	Core Functionality	/////
	//-----------------------------//
	
	/* Input Handler:	fired when the user changes the value of the input field
	*/
	$('input').on("change paste input", function(e){
		var val = $(this).val();
		URLInput.isEmpty = $('#col-URL-defaultText').css('display', ((val!==null && val!=="") ? 'none' : 'block')).css('display')=='block';
		setURLInput();
		if(URLInput.hasChanged){
			if(wrapper.state === URLInput.isEmpty){ // has changed
				wrapper.state = !wrapper.state;
				moveWrapper(URLInput.isEmpty);
			}
		}
	});
	/* Form Handler:	fired when the user clicks submit
	*/
	$('form').submit(function(e){
		e.preventDefault();
		// only do something if a URL is definitely given 
		if(!URLInput.isEmpty){
			// prevent multiple submissions of the same URL
			if(URLInput.val !== URLInput.searchVal){ // value has changed since last search
				// update searchVal
				URLInput.searchVal = URLInput.val;
				// iFrame: stop current action and update
				$('iframe').stop().attr('src',URLInput.searchVal)
				
				/* Goo.gl XMLHttpRequest:	get new goo.gl short URL
				*/
				function getGooglUrl(){
					// new AJAX request
					var xmlHttp = new XMLHttpRequest();
					xmlHttp.open("POST", googleAPI.host + googleAPI.key, true);
					xmlHttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
					xmlHttp.timeout = 5000;
					
					// create JSON to send as parameters to Goo.gl API
					var payload = {
							'key' : googleAPI.key ,
							'longUrl' : URLInput.searchVal
					};
					// ensure it is JSON format
					var jsonStr = JSON.stringify(payload);
					
					// update the user on server responses
					xmlHttp.onreadystatechange = function(){
						if (xmlHttp.readyState == XMLHttpRequest.DONE){
							// remove loading text & image
							setLoading(URLInput.searchVal,false);
							// show new short URL
							var response = JSON.parse(xmlHttp.responseText);
							$('#shortUrl').val(response.id);
							// show website info box (including iFrame)
							$('#websiteInfoContainer').removeClass('inactive');
							// update Meta information (if metaInfo allowed)
							if(metaInfo.active) retrieveMetaData(URLInput.searchVal);
							// add to cookie (if cookies allowed)
							if(cookie.flag) updateCookie([URLInput.searchVal,response.id]);
						}
						else if(xmlHttp.readyState == XMLHttpRequest.OPENED){
							// loading text = 'Working'
							setLoading('Working',true);
						}
						else if(xmlHttp.readyState == XMLHttpRequest.LOADING){
							// show loading icon & change text
							setLoading('Almost done',true);
						}
					}
					
					xmlHttp.ontimeout = function (e) {
						xmlHttp.abort();
						if(googleAPI.attempts<= googleAPI.attemptsLimit){
							getGooglUrl();
						} else {
							// show unsucessful icon and text
							
							// Attempting bit.ly shortener	
							getBitlyUrl();
						}
					};
					
					xmlHttp.send(jsonStr);
					googleAPI.attempts+=1;
					/* End goo.gl shortening */
				}
				function getBitlyUrl(){
					
				}
				function setLoading(text,image){
					if(text !== undefined) $('#loadingContainer span').html(text);
					
					var img = $('#loadingContainer img');
					// if param image is true
					if(image !== undefined){
						if(image === true){
							// show image if not already showing
							img.css('display','block');
						} else {
							// hide image if not already hidden
							img.css('display','none');
						}
					}
					// hide whole container if both params are false
					if(!text && !image){
						console.log('fade out image');
						$('#loadingContainer').fadeOut(200);
					} else {
						console.log('fade in image');
						$('#loadingContainer').css('display','block');
					}
				}
				// send off first Request to Goo.gl
				getGooglUrl();
			}
		}
	});
	
	function setURLInput(){
		if(URLInput.hasChanged = URLInput.val !== $('input').val()){
			URLInput.val = $('input').val();
		}
	}
	


	function moveWrapper(empty){
		var newRate = (empty)? "50" : "25";
		$('#contentWrapper').stop().animate({top : newRate + "%"},400,"linear",displayWebFrame(empty));
	}
	function displayWebFrame(val){
		$('#webFrame').css('display',(val)? 'none' : 'block');
	}
	
	
	
	
	/////	EXTRA:	Cookie Functionality	/////
	//-----------------------------------------//
	
	function setCookie(){
		if(typeof cookie.data !== "undefined"){
			if(cookie.data.length>0 && cookie.isAdded===false){
				//updateHistoryPanel(cookie.data);
				cookie.isAdded=true;
			}
		}
		var expire = new Date();
		expire.setDate(expire.getDate() + cookie.expire);
		document.cookie = cookie.name+'='+cookie.data.toString()+'; expires = ' + expire + '; path = /;';
	}
	function getCookie(){
		if(document.cookie.indexOf(cookie.name) >= 0){
			var history = decodeURIComponent(document.cookie);
			//for(var i=0;i<history.length;i++){
			var valStartPos = history.indexOf(cookie.name)+cookie.name.length+1; //also the '=' sign
			// cut down history to start of value
			var history = history.substr(valStartPos);
			// check to see if there is another cookie after, change end position
			if(history.indexOf(";")>=0){ // there is another cookie present
				var valEndPos = history.indexOf(";");
				history = history.substr(0,valEndPos); // cut out the remainder characters
			}
				//history = history.substr(history[i].indexOf(cookie.name),history[i].length);
			console.log('getCookie:\t'+history);
				// need to traverse every pair and put hem into a deeper array
			historyArray = history.split(';');
			newCookieArray = Array();
			console.log(historyArray.length);
			/*
			for(var i=0;i<=historyArray.length;i+2){
				newCookieArray.push([historyArray[i],historyArray[i+1]]);
			}
			console.log('cArray:\t'+newCookieArray);
			*/
			
			return (new Array(history));
			
			//}
			//}
			//return [history[1].substr(history[1].indexOf('=')+1)]; // return value
		} else {
			return [];	
		}
	}
	function updateCookie(url){
		console.log('upadte cookie:\t'+url);
		if(Object.prototype.toString.call(cookie.data) === '[object String]'){
			cookie.data = cookie.data.split(',');
		};
		cookie.data.push(url);
		console.log('pushed:\t'+cookie.data);
		setCookie();
		//updateHistoryPanel([url]);
	}
	function updateHistoryPanel(urls){
		console.log(cookie.data);
		$.each(urls,function(key,value){
			value = value.split(',');
			$('#historyPanel table').append('<tr><td>'+value[0]+'</td><td><input value="'+value[1]+'"  disabled="disabled" onClick="this.setSelectionRange(0, this.value.length)" /></td></tr>');
		});
	}
	
	
	
	/////	EXTRA:	Website Meta Data	/////
	//-------------------------------------//
	
	function retrieveMetaData(url){
		$.post('scripts/php/getMeta.php', {'url':url} , function(data){
   			console.log(data);
		});
	}
	
	
	
}); // end of document.ready();