<?php
$json = 'Failed to find website Information';
if(isset($_POST['url'])){
	// validate url
	$url = $_POST['url'];
	// get tags array
	if($tags = get_meta_tags($url)){
	
		$lastTagKey = array_pop(array_keys($tags));
		$json = '{';
		foreach($tags as $key=>$value){
			$json .= $key.':'.$value;
			if($key!=$lastTagKey){ $json.=','; }
		}
		$json .= '}';
	}
}
echo $json;
?>