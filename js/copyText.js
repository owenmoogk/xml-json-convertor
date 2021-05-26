function copyXml() {
	var copyText = document.getElementById("xml");
	copyText.select();
	document.execCommand("copy");
	document.getElementById('xmlCopyButton').innerText = "Copied"
	setTimeout(function () { 
		document.getElementById('xmlCopyButton').innerText = "Copy"
	}, 1500);

}

function copyJson() {
	var copyText = document.getElementById("json");
	copyText.select();
	document.execCommand("copy");
	document.getElementById('jsonCopyButton').innerText = "Copied"
	setTimeout(function () { 
		document.getElementById('jsonCopyButton').innerText = "Copy"
	}, 1500);
}