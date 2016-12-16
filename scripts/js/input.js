$(document).ready(function(e) {
	
	/////	Objects		/////
	//---------------------//

	/* Object:	Cookie object is used for a partially developed 'URL History'
				site feature. If 'cookie.flag = true' then the history panel
				will be visible and a 'urlHistory' cookie is created.
	*/
	var cookie = {
		flag : true, // MUST default to false (Cookie Act), negate on 'allow cookies'
		elements : $('.historyFeature'),
		name : "urlHistory",
		data : '',
		expire : 7, //days
		isAdded : false
	};
	if(cookie.flag) activateCookie(); // <----- make this into an event handler for 'accept cookies'
	
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
		elements : $('.websiteInfo'),
		corProxy : 'https://crossorigin.me/',
		title : '',
		description : '',
		author : '',
		copyright : '',
		keywords : '',
	}
	if(metaInfo.active) metaInfo.elements.removeClass('inactive');
	
	
	
	
	
	/////	Core Functionality	/////
	//-----------------------------//
	
	/* Input Handler:	fired when the user changes the value of the input field
	*/
	$(document).on("click",'input', function(){
		this.setSelectionRange(0, this.value.length);
	});
	$('input').on("change paste input", function(e){
		var val = $(this).val();
		URLInput.isEmpty = $('#col-URL-defaultText').css('display', ((val!==null && val!=="") ? 'none' : 'block')).css('display')=='block';
		setURLInput();
		if(URLInput.hasChanged){
			if(wrapper.state !== URLInput.isEmpty){ // has changed
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
							// remove loading text & image, add green background
							setLoading('('+URLInput.searchVal+')',false);
							$('#col-shortUrl').addClass('greenBg, greenBGFlash');
							// show new short URL
							var response = JSON.parse(xmlHttp.responseText);
							if(typeof response.id==='undefined') response.id = URLInput.searchVal;
							$('#shortUrl').val(response.id);
							// show website info box (including iFrame)
							$('#websiteInfoContainer').removeClass('inactive');
							// update Meta information (if metaInfo allowed)
							if(metaInfo.active) retrieveMetaData(URLInput.searchVal);
							// add to cookie (if cookies allowed)
							if(cookie.flag){
								updateCookie([URLInput.searchVal,response.id]);
							}
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
					$('#shortUrl').val('Could not shorten URL, please try again');
				}
				function setLoading(text,image){
					if(text !== undefined) $('#loadingContainer span').html(text);
					
					var img = $('#loadingContainer img');
					// if param image is true
					if(image !== undefined){
						// show/ hide image if not already showing
						img.css('display',(image===true)? 'block' : 'none');
					}
					// hide whole container if both params are false
					if(!text && !image){
						$('#loadingContainer').fadeOut(200);
					} else {
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
		var newRate = (empty)? "50" : "30";
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
				formatCookieData();
				console.log(cookie.data);
				console.log(Object.prototype.toString.call(cookie.data));
				updateHistoryPanel(cookie.data);
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
			console.log(history);
			historyArray = history.split(';');
			newCookieArray = Array();
			return (new Array(history));
		} else {
			return [];	
		}
	}
	function formatCookieData(urls){
		if(Object.prototype.toString.call(cookie.data) === '[object String]'){
			cookie.data = cookie.data.split(',');
		}
		else if(Object.prototype.toString.call(cookie.data) === '[object Array]'){
			// check to see if there's a string layer inside of the array
			if(typeof cookie.data[0] !== 'undefined'){
				// the cookie.data array with newly inputted 
				
				console.log(cookie.data);
				console.log(Object.prototype.toString.call(cookie.data[0]));
				var splitCookie = cookie.data[0];
				var splitCookie = splitCookie.split(',');
				var newCookieArray = new Array();
				for(var i=0;i<splitCookie.length;i+2){
					newCookieArray.push(splitCookie.splice(i,2));
				}
				cookie.data = newCookieArray;
				console.log(newCookieArray);
			}
		}
		//if(urls){ cookie.data.push(urls); }
	}
	function updateCookie(url){
		console.log(url);
		formatCookieData(url);
		console.log(url);
		setCookie();
		console.log(cookie.data);
		updateHistoryPanel(url);
	}
	function updateHistoryPanel(url){
		// add all cookie data to the history table
		if(cookie.isAdded===false){
			$.each(cookie.data,function(key,value){
				$('#historyPanel table').append('<tr><td>'+value[0]+'</td><td><input value="'+value[1]+'" /></td></tr>');
			});
			// ensure to make cookies.added=true to remove duplications
			cookie.isAdded=true;
		}
		// prepend the latest searched url
		$('#historyPanel table').append('<tr><td>'+url[0]+'</td><td><input value="'+url[1]+'" /></td></tr>');
	}
	
	function activateCookie(){
		cookie.elements.each(function(){
			$(this).removeClass('inactive');
		});
		
		// Delete Previous Cookie
		document.cookie = cookie.name+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path = /;';
		
		cookie.data = getCookie();
		console.log(cookie.data);
		setCookie();
	}
	
	/* 	The following function is in the cookies section because it will ONLY be used if
		cookies is enabled.
	 */
	$(document).on('click','.panelOption',function(){
		// switch panelTabs
		$('.panelOption').each(function(){
			$(this).toggleClass('active');
		});
		// Switch content
		$('.panel').each(function(){
            $(this).toggleClass('hidden');
        });
	});
	
	
	/////	EXTRA:	Website Meta Data	/////
	//-------------------------------------//
	
	function retrieveMetaData(url){
		$.post('scripts/php/getMeta.php', {'url':url} , function(data){
   			console.log(data);
		});
	}
	
	
	
}); // end of document.ready();