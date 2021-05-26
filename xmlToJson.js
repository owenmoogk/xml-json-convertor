function convertXmlToJson() {
	text = document.getElementById('xml').value

	// if the xml is empty then the json is empty
	if (text == ""){
		document.getElementById('json').value = ""
		return
	}

	// parsing into xml object
	parser = new DOMParser()
	xml = parser.parseFromString(text, "text/xml")

	// get the json
	json = xmlToJson(xml)
	// undefined and 2 makes it prettier with a tab spacing of 2
	jsonText = JSON.stringify(json, undefined, parseInt(document.getElementById("spaceSelect").value))

	document.getElementById('json').value = jsonText
}

// recursive function to convert xml elements to json, returns obj at the end
function xmlToJson(xml) {

	// try it out
	try {
		var obj = {};
		// if the xml has children, recursive
		if (xml.children.length > 0) {

			// loop thru each child
			for (var i = 0; i < xml.children.length; i++) {
				var item = xml.children.item(i);
				var nodeName = item.nodeName;

				if (typeof (obj[nodeName]) == "undefined") {
					obj[nodeName] = xmlToJson(item);
				} 
				else {
					if (typeof (obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];

						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item));
				}
			}
		}

		// if the element doesnt have kids just use the textcontent
		else {
			obj = xml.textContent;
		}
		return obj;
	}

	// just console.log all the errors
	catch (e) {
		console.log(e.message);
	}
}
