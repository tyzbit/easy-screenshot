

function saveScreen(){
	chrome.tabs.captureVisibleTab(null, {}, function (image){
		chrome.tabs.getSelected(null,function(tab) { // null defaults to current window
			url = tab.url;
			function printDate() {
			var temp = new Date();
			var dateStr = padStr(temp.getFullYear()) + "-" + 
					padStr(1 + temp.getMonth()) + "-" +
					padStr(temp.getDate()) + " at " +
					padStr(temp.getHours()) + "." +
					padStr(temp.getMinutes()) + "." +
					padStr(temp.getSeconds());
			return dateStr;
			}
		
			function padStr(i) {
				return (i < 10) ? "0" + i : "" + i;
			}
		
			function extractDomain(url) {
			var domain;
			//find & remove protocol (http, ftp, etc.) and get domain
			if (url.indexOf("://") > -1) {
				domain = url.split('/')[2];
			}
			else {
				domain = url.split('/')[0];
			}
		
			//find & remove port number
			domain = domain.split(':')[0];
		
			return domain;
		}
		var domain = extractDomain(url);
		var date = printDate();
		chrome.downloads.download({url:image, filename:domain + "/Screenshot " + date + ".jpg"});
		});
	});
}

chrome.browserAction.onClicked.addListener(saveScreen);
chrome.commands.onCommand.addListener(function(command) {
	if (command == "save") {
		saveScreen();
	}
})