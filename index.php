<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="apple-touch-icon-precomposed" sizes="57x57" href="images/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="images/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="images/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="images/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="images/apple-touch-icon-152x152.png" />
<link rel="icon" type="image/png" href="images/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="images/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="images/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="images/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="images/favicon-128.png" sizes="128x128" />
<meta name="application-name" content="simple.link"/>
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="images/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="images/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="images/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="images/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="images/mstile-310x310.png" />

<!--[if IE]>
	<link type="text/css" href="style/css/IE.css" rel="stylesheet" />
<![endif]-->
<!--[if !IE]>
	<link type="text/css" href="style/css/mostBrowsers.css" rel="stylesheet" />
<![endif]-->
<title>Short.link</title>

<style type="text/css">
  	@font-face {
	  font-family: 'Acme';
	  src: url('style/fonts/Acme/Acme-Regular.eot');
	  src: url('style/fonts/Acme/Acme-Regular?#iefix') format('embedded-opentype'),
		   url('style/fonts/Acme/Acme-Regular.woff') format('woff'),
		   url('style/fonts/Acme/Acme-Regular.ttf') format('truetype'),
		   url('style/fonts/Acme/Acme-Regular.svg#Acme') format('svg');
	  font-weight: normal;
	  font-style: normal;
	}
  
  	html { 
	  background: url(images/footer_lodyas.png) repeat;
	}
	#contentWrapper{
		margin:auto;
		width:80vw;
		font-family:'Acme';
	}
	#contentWrapper h1{
		width:80vw;
		margin-top:-3.5vmax;
		margin-bottom:0px;
		padding-bottom:0px;
		color:#FFF;
		font-size:10vw;
		padding-top:0px;
		-webkit-text-stroke: 1px black;
	   	text-shadow:
			3px 3px 0 #9CF,
			-1px -1px 0 #9CF,  
			1px -1px 0 #9CF,
			-1px 1px 0 #9CF,
			1px 1px 0 #9CF;
		text-align:center;
	}

	.centered {
	  position: fixed;
	  top: 50%;
	  left: 50%;
	  -webkit-transform: translate(-50%, -25%); /* Ch <36, Saf 5.1+, iOS < 9.2, An =<4.4.4 */
      -ms-transform: translate(-50%, -25%); /* IE 9 */
      transform: translate(-50%, -25%); /* IE 10, Fx 16+, Op 12.1+ */
	}
	.noselect {
  		-webkit-touch-callout: none; /* iOS Safari */
    	-webkit-user-select: none; /* Chrome/Safari/Opera */
     	-khtml-user-select: none; /* Konqueror */
       	-moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  not supported by any browser */
	}
	.wordgap{
		word-spacing:1.5vw;
	}
	
	/*Right pointing*/
	.triangle{
		position:absolute; z-index:10; top:0; left:80px; background-color:#093;
		/*width: 30px;
		height: 0px;
		padding-top: 0;
		padding-bottom: 0;
		overflow: hidden;*/
	}
	.triangle:after{
		content: "";
		width: 0;
		height: 0;
		border-top: 15px solid transparent;
		border-bottom: 15px solid transparent;
		border-left: 30px solid #0F0;
	}
	
	/* Copy from search.php */
	#search h2 button{
		font-family:'Acme';
		cursor:pointer;
	}
	.newRow{
		display:table;
		width:100%;
	}
	.newRow .cell{
		display:table-cell;
	}
	/* End copy */
	.whiteGlow{
		position:absolute;
		left:0;
		top:0;
		background-color:transparent !important;
		width:calc(100% - 45px);
		height:40px;
		z-index:0;
		pointer-events:none;
	}
	.col{
		height:40px;
	}
	.col-snip, .col-shortUrl { 
		background-color: #ddf; 
		float: left;
		padding: 0 5px;
		font-size:30px;
		text-align:center;
	}
	.col-URL, .websiteInfo, #newURL { 
		float: none;
		margin-right:20px;
	}
	input {
		color:#999;
		height:100%;
		width:100%;
		outline:none;
		border:none;
		padding-left:20px;
		padding-right:5px;
		vertical-align:middle;
		font-size:20px;
		-webkit-transition: color .2s ease-out;
		-moz-transition: color .2s ease-out;
		-o-transition: color .2s ease-out;
		transition: color .2s ease-out;
		font-family:Verdana, Geneva, sans-serif;
	}
	input:focus{
		color:#111;
	}
	#historyPanel{
		width:100%;
		outline:none;
		border:none;
		padding-left:20px;
		padding-right:5px;
		overflow:scroll;
		height:40vmin;
		background-color:#fefefe;
	}
	.whiteGlow:hover{
		-webkit-box-shadow: 0px 3px 25px 0px rgba(153,204,255, 0.85);
		-moz-box-shadow:    0px 3px 25px 0px rgba(153,204,255, 0.85);
		box-shadow:         0px 3px 25px 0px rgba(153,204,255, 0.85);
	}
	#col-URL-defaultText{
		position:absolute;
		z-index:2;
		padding-left:20px;
		color:#CCC;
		width:100%;
		font-size:20px;
		height:40px;
		pointer-events:none;
		padding-top:10px;
		font-family:Verdana, Geneva, sans-serif;
	}
	.col-submit { 
		float: right;
		width:50px;
	}
	.acme{
		font-family: 'Acme';
	}
	.curve-border-right{
		-webkit-border-radius: 0 20px 20px 0;
		-moz-border-radius: 0 20px 20px 0;
		border-radius: 0 20px 20px 0;
	}
	
	#webFrame{
		display:none;
	}
	
	iframe{
		width:40vmin; height:40vmin; float:left;opacity: 0;
  transition: opacity 300ms ease-in-out; overflow:hidden;
  pointer-events:none;
	}
	section{
		margin-top:2.5vh;
	}
	.historyFeature, .inactive{
		display:none;
	}
	.active{
		display:block;
	}
	#footer{
		text-align:center;
		position:absolute;
		bottom:1vh;
		left:1vw;
		width:98vw;
		min-height:2vh;
		max-height:30px;
		font-size:12px;
		padding-top:2px;
		padding-bottom:2px;
	}
		
	#footer span.copyright{
		color:#FF4;
		text-shadow:
			.5px .5px 0 #000,
			-.5px -.5px 0 #000,  
			.5px -.5px 0 #000,
			-.5px .5px 0 #000,
			.5px .5px 0 #000;
	}
	button[type=submit] {
		background:url("images/scissors.png");
		background-size: 100% 100%;
    	background-repeat: no-repeat;
		width:100%; height:100%;
		background-color:#09F;
	}
	
</style>

</head>

<body>
	<div id="contentWrapper" class="centered noselect">
        
        <h1>Simple . link</h1>
		
        <div class="newRow" class="col" style="position:relative;">
            <form method="get" action="">
                <div class="col-snip col acme">SNIP</div>
                <div class="col-submit col curve-border-right">
                    <button type="submit" class="curve-border-right"></button>
                </div>
                <div class="col-URL col" style="position:relative;">
                	<!--<div class="whiteGlow curve-border-right"></div>-->
                	<!--<div class="triangle"></div>-->
                    <span style="overflow: hidden;display: block; padding-right:40px; height:100%; position:relative;">
                    	<div id="col-URL-defaultText">http://www.example.com</div>
                    	<input type="text" value="" class="curve-border-right" name="URLInput" type="url" pattern="https?://.+" required autocomplete="off" autocorrect="off" autocapitalize="off" onClick="this.setSelectionRange(0, this.value.length)" />
                    </span>
                </div>
            </form>
        </div>
    	<div id="webFrame" class="newRow">
        	<section>
                <div id="newURL" class="newRow col-URL">
                <span style="overflow: hidden;display: block; padding-right:40px; height:100%; position:relative;">
                    <div class="col-shortUrl col acme">Short URL</div>
                    <div class="col-shortUrl col acme historyFeature">History</div>
                    	<div id="historyPanel" class="historyFeature">
                        	<table>
                            	<tr><td width="40%" style="overflow:hidden;">Long Url</td><td>Short Url</td></tr>
                            </table>
                        </div>
                        <input id="shortUrl" onClick="this.setSelectionRange(0, this.value.length)" value="New Url will appear here when you press enter" autocomplete="off" autocorrect="off" autocapitalize="off" style="height:40px;" />
                        <div id="loadingContainer" style="top:45px; right:25px; position:absolute; height:40px; vertical-align:middle;white-space: nowrap;text-align: center; color:#0CF; font-size:18px; pointer-events:none; display:none;">
                        	<span style="display:inline-block; vertical-align:middle;">Testing</span>
                            <img style="vertical-align:middle;" src="images/loading_25x25.gif" />
                        </div>
                    </span>
                </div>
            </section>
            <section class="inactive" id="websiteInfoContainer">
                <iframe src="" frameborder="0" onload="this.style.opacity = 1" scrolling="no">
                Preview not supported in your browser
                </iframe>
                
                <div class="websiteInfo inactive"  style="height:40vmin; background-color:#fefefe; overflow-y:scroll;">
                    <h4>Example Website Info</h4>
                    <p>Example Meta tag information</p>
                </div>
            </section>
        </div>
    </div>
        
    <div id="footer">
        <span class="copyright noselect">&copy; Jonathan Hill 2016</span>
    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="scripts/js/input.js"></script>
    <!-- scissors image by Flat Icons in miscellaneous at flaticon.com -->
</body>
</html>