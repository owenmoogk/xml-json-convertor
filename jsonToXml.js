function convertJsonToXml() {
	text = document.getElementById('json').value

	// if the xml is empty then the json is empty
	if (text == "") {
		document.getElementById('xml').value = ""
		return
	}

	// parsing into json object
	json = JSON.parse(text)

	// get the xml
	xmlText = jsonToXml(json)

	// format the text xml, the second param is the indentation value
	xmlText = formatXml(xmlText, " ".repeat(parseInt(document.getElementById("spaceSelect").value)))

	document.getElementById('xml').value = xmlText
}

// recursive function to convert xml elements to json, returns obj at the end
function jsonToXml(obj) {

	// xml is going to be just a string
	var xml = '';
	
	// loop thru json
	for (var prop in obj) {
		xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";

		// if its an array
		if (obj[prop] instanceof Array) {
			for (var array in obj[prop]) {
				xml += "<" + prop + ">";
				xml += jsonToXml(new Object(obj[prop][array]));
				xml += "</" + prop + ">";
			}
		} 
		
		// if its a dict
		else if (typeof obj[prop] == "object") {
			xml += jsonToXml(new Object(obj[prop]));
		} 
		
		// any other datatype
		else {
			xml += obj[prop];
		}

		// adding tags if its not an array (otherwise we dont need anything)
		xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
	}

	return xml
}


function formatXml(xml, tab) {

	// formatted xml string, indent fluxuates as we format
	var formatted = '', indent = '';

	// stack overflow lol https://stackoverflow.com/a/49458964
	xml.split(/>\s*</).forEach(function (node) {
		// decrease indent by one 'tab'
		if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
		formatted += indent + '<' + node + '>\r\n';
		// increase indent
		if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab;
	});
	return formatted.substring(1, formatted.length - 3);
}
