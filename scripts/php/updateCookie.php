<?php

if(isset($_POST['url'])){
	
	// validate url	
	$url = $_POST['url'];
	
	// convert array to json
	$url = json_encode($url);
	// check to see if url is already in the user's cookie
	if(!isset($_COOKIE['urlHistory'])){
		setcookie('urlHistory',$url,time()+60*60*24*7);
	} else {
		// check to see if urllong is already in cookie
		
		// combine history and new url arrays
		//$_COOKIE['urlHistory'] = $_COOKIE['urlHistory'].'[['.$url[0].']['.$url[1].']]';
	}
	echo 'Url here: '.$url;
	echo 'cookie here: '.$_COOKIE['urlHistory'];
	//unset($_COOKIE['urlHistory']);
	//setcookie('urlHistory', '', time() - 3600, '/');
}

?>