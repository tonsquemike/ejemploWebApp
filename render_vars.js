var http = require("http"),
	fs = require("fs");

http.createServer(function(req,res){
	fs.readFile("./index.html",function(err,html){
		var html_string = html.toString();//convertir index.html a cadena
		
		//buscar una cadena a reemplazar
		var variables= html_string.match(/[^\{\}]+(?=\})/g);//areglo variables
		var nombre = "García";//valor que se va a imprimir

		//buscar la variable nombre de html
		//variable arreglo de cadenas
		for (var i = variables.length - 1; i >= 0; i--) {
			var value = eval(variables[i]);
			//reemplazar nombre por value
			html_string = html_string.replace("{"+variables[i]+"}", value);
		}

		res.writeHead(200,{"Content-Type": "text/html"})
		res.write(html_string);////////nueva cadena html
		res.end();
	})
}).listen(8080);