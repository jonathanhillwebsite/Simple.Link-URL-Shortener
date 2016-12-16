<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<!-- Icons -->
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
<!-- CSS -->
<link href="style/css/main_neat.css" rel="stylesheet" type="text/css" />
<!-- Meta -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="application-name" content="simple.link"/>
<meta name="author" content="Jonathan Hill">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="images/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="images/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="images/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="images/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="images/mstile-310x310.png" />
<title>Short.link</title>
</head>

<body>
	<div id="contentWrapper" class="centered noselect">
        
        <h1>Simple . link</h1>
		
        <div class="newRow" class="col">
            <form method="get" action="">
                <div id="col-snip" class="col acme shadow">SNIP</div>
                <div class="col-submit col curve-border-right shadow">
                    <button type="submit" class="curve-border-right" title="Submit"></button>
                </div>
                <div class="col-URL col">
                    <span class="shadow">
                    	<div id="col-URL-defaultText">http://www.example.com</div>
                    	<input type="text" value="" title="Enter your URL here" class="curve-border-right shadow" name="URLInput" type="url" pattern="https?://.+" required autocomplete="off" autocorrect="off" autocapitalize="off"/>
                    </span>
                </div>
            </form>
        </div>
        
        
    	<div id="webFrame" class="newRow">
        
        	<section>
                <div id="newURL" class="newRow col-URL">
                <span id="resultPanelContainer">
                    <div id="col-shortUrl" class="col acme panelOption active">Short URL</div>
                    <div class="col acme historyFeature inactive panelOption">History</div>
                        <div class="panel">
                        
                            <input id="shortUrl" value="New Url will appear here when you press enter" autocomplete="off" autocorrect="off" autocapitalize="off" style="height:40px;" />
                            <div id="loadingContainer">
                                <span>Loading</span>
                                <img src="images/loading_25x25.gif" />
                            </div>
                            
                            <section class="inactive" id="websiteInfoContainer">
                				<div class="shadow">
                    				<iframe src="" frameborder="0" onload="this.style.opacity = 1" scrolling="no" class="blue-black-border">
                        				Preview not supported in your browser
                    				</iframe>
                				</div>
                
                				<div class="websiteInfo inactive blue-black-border">
                    				<div>
                        				<h2>Website Information</h2>
                        				<p>This feature is in development and will be available soon.</p>
                    				</div>
                				</div>
            				</section>
                            
                        </div>
                        
                        <div id="historyPanel" class="historyFeature inactive hidden panel">
                        	<table>
                            	<tr>
                                	<td width="40%">Long Url</td>
                                    <td>Short Url</td>
                                </tr>
                            </table>
                        </div>
                        
                    </span>
                </div>
            </section>

        </div>
        
    </div>
        
    <div id="footer">
        <span class="copyright noselect">&copy; Jonathan Hill 2016</span>
    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="scripts/js/input.min.js"></script>
    <!-- scissors image by Flat Icons in miscellaneous at flaticon.com -->
</body>
</html>