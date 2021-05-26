function convertJsonToXml() {
	text = document.getElementById('json').value

	// if the xml is empty then the json is empty
	if (text == ""){
		document.getElementById('xml').value = ""
		return
	}

	// parsing into json object
	json = JSON.parse(text)

	// get the xml
	xmlText = jsonToXml(json)
	xmlText = formatXml(xmlText, " ".repeat(parseInt(document.getElementById("spaceSelect").value)))

	document.getElementById('xml').value = xmlText
}

// recursive function to convert xml elements to json, returns obj at the end
function jsonToXml(obj) {
	var xml = '';
	for (var prop in obj) {
	  xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
	  if (obj[prop] instanceof Array) {
		for (var array in obj[prop]) {
		  xml += "<" + prop + ">";
		  xml += jsonToXml(new Object(obj[prop][array]));
		  xml += "</" + prop + ">";
		}
	  } else if (typeof obj[prop] == "object") {
		xml += jsonToXml(new Object(obj[prop]));
	  } else {
		xml += obj[prop];
	  }
	  xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
	}
	var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
	console.log(xml)
	return xml
}


function formatXml(xml, tab) { // tab = optional indent value, default is tab (\t)
    var formatted = '', indent= '';
    tab = tab || '\t';
    xml.split(/>\s*</).forEach(function(node) {
        if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); // decrease indent by one 'tab'
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              // increase indent
    });
    return formatted.substring(1, formatted.length-3);
}
