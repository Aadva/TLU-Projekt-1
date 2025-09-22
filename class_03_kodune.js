const http = require("http");
const fs = require("fs");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Andrus Rinde, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Andrus Rinde, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna أœlikoolis</a> ning ei sislda tأµsiseltvأµetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	fs.readFile(textRef, "utf8", (err, data)=>{
		if(err){
			res.write(pageHead);
			res.write(pageBody);
			res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p><p>Kahjuks tأ¤naseks أ¼htki vanasأµna vأ¤lja pakkuda pole!</p>");
			res.write(pageFoot);
			return res.end();
		} else {
			let folkWisdom = data.split(";");
			let folkWisdomOutput = "\n\t<ol>";
			for (let i = 0; i < folkWisdom.length; i ++){
				folkWisdomOutput += "\n\t\t<li>" + folkWisdom[i] + "</li>";
			}
			folkWisdomOutput += "\n\t</ol>";
			res.write(pageHead);
			res.write(pageBody);
			res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>");
			res.write("\n\t<h2>Valik Eesti vanasأµnu</h2>")
			res.write(folkWisdomOutput);
			res.write(pageFoot);
			return res.end();
		}
	});
}).listen(5100);