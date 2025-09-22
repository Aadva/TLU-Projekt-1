const http = require("http");
const fs = require("fs");
//laeme mooduli pأ¤ringu parsimiseks
const url = require("url");
//failitee haldamiseks mooduli
const path = require("path");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Mirko Aadva, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '<img src="vp_banner_2025_TA.jpg" alt="kursuse bأ¤nner">';
const pageBody = '\t<h1>Mirko Aadva, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna أœlikoolis</a> ning ei sislda tأµsiseltvأµetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageLink = '\n\t<p>Vaata <a href="/vanasonad">vanasأµnasid</a>.</p>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	//parsin URL-i
	console.log("Pأ¤ring: " + req.url);
	let currentUrl = url.parse(req.url, true);
	console.log("Parsituna: " + currentUrl.pathname);
	
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>");
		res.write(pageLink);
		res.write(pageFoot);
		return res.end();
	}
	
	else if(currentUrl.pathname === "/vanasonad"){
		res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageHead);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>\n\t<p>Kahjuks tأ¤naseks أ¼htki vanasأµna vأ¤lja pakkuda pole!</p>");
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
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>");
				res.write("\n\t<h2>Valik Eesti vanasأµnu</h2>")
				res.write(folkWisdomOutput);
				res.write(pageFoot);
				return res.end();
			}
		});	
	}
	
	else if(currentUrl.pathname === "/vp_banner_2025_TA.jpg"){
		//liidame muidu kأ¤ttesaamatu piltide kausta meiue veebi failiteega
		let bannerPath = path.join(__dirname, "images");
		fs.readFile(bannerPath + currentUrl.pathname, (err, data)=>{
			if(err){
				throw(err);
			} else {
				res.writeHead(200, {"Content-type": "image/jpeg"});
				res.end(data);
			}
		});
	}
	
	else {
		res.end("Viga 404, ei leia sellist lehte!");
	}
}).listen(5132);