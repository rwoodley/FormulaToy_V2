<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="App.aspx.cs" Inherits="Formula3DApp.App" %>
<!DOCTYPE html>
<html lang="en"><head runat="server">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Formula Toy</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				font-family: Monospace;
				background-color: #000;
				margin: 0px;
				overflow: hidden;
			}
            /* We are using dat.gui for the gui controls. They didn't have support for multi-line text input, e.g. textarea.
                So I edited dat.gui.js to add a textarea for string input. These extra styles are needed to support
                OpenControls/CloseControls. */
            .closed li { display: none; }
            .closed div span { display: none; }
            .closed textarea { display: none; }
		</style>

<script>
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-41066114-2', 'formulatoy.net');
    ga('send', 'pageview');

</script>
        <script type="text/javascript" async src="//assets.pinterest.com/js/pinit.js"></script>
        <script src="lib/three.js"></script>
        <script src="lib/OrbitControls.js"></script>
        <script src="lib/stats.js"></script>
        <script src="Detector.js"></script>
		<script type="text/javascript" src="lib/dat.gui.min.js"></script>
		<script src="utilities.js"></script>
		<script src="guiStuff.js"></script>
		<script src="FormulaValidation.js"></script>
		<script src="params.js"></script>
        <script>
            function doneSharing() { document.getElementById('ShareDiv').style.display = 'none'; document.getElementById('modalBackground').style.display = 'none'; }
        </script>

	</head>
	<body>
        <div id="modalBackground"></div>
        <div id='ShareDiv' style='z-index: 100; background-color: white; border: 1px; border-style: solid; border-color: black; display: none;'>
        <table >
        <tr><th colspan='2' align="left" style="font-family: calibri;">Share your formula:</th><th align=right><button id='doneSharingButton' class='styled-button-blue' onclick='doneSharing()'>Done</button></th></tr>
        <tr><td colspan='3'>
            <asp:Image ID="SnapPng" runat="server" width="200" height="100"/>
            </td>
        <tr><td colspan='4'>URL: <input id='MatrixURL' style='font-size: 10px; width: 300px;' /></td></tr>
        <tr>
        <td><a id="shareEmail" href="blah"><img id="MailPng" width=100px; src="images/mail2.png" /></a></td>
        <td><a id="shareFB" href="blah" target="_blank" ><img id="FBPng" width=100px; src="images/FacebookFlatLarge.png" /></a></td>
        <td><a id="shareTW" href="blah" target="_blank" ><img id="TwitterPng" width=100px; src="images/TwitterFlatLarge.png" ></a></td>
        <td><a id="sharePI" href="blah" target="_blank" data-pin-do="buttonBookmark">
            <img id="PIPNG" width=100px; src="images/Pinterest.jpg" ></a></td>
        </tr>
        </table>
        </div>


        <div style="position: fixed; bottom: 0; width:95%; ">
            <div style="float: right; ">
                 <span style="display:block;height:30px;color:white;"><nobr>Use mouse to rotate/pan/zoom.</nobr></span>
                 <span style="display:block;height:30px;color:white;"><nobr><a href="http://rwoodley.org/" style="color:#0000ff;" target="_blank">Robert Woodley</a> 2014</nobr></span>
            </div>
        </div>
		<script src="Main.js"></script>
	</body>
</html>