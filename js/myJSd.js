

function GetXMLData(strURL)
{

    var xmlhttp, xmlDoc;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", strURL, false);
    xmlhttp.send();


	if (xmlhttp.responseText==""){
		return "none";
		}else{
    	return convert_string_to_xml(xmlhttp.responseText);
		}
}




function convert_string_to_xml(strXML)
{
	if (window.ActiveXObject) {
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(strXML);
		return xmlDoc;
	} else {
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(strXML,"text/xml");
		return xmlDoc;
	}
}

function loadXMLDoc(dname)
{
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;
}
//var giraffeschDoc = GetsXMLDsta("http://www.giraffe.com.tw/demoteaching/getxmlrows.aspx?s=schooldistrict");
//var girshisch=GetsXMLDsta("http://www.giraffe.com.tw/DemoTeaching/GetXMLRows.aspx?s=schooldemodata^"+girenshsno);
