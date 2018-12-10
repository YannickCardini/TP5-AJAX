//////////////////////////     client.js     ////////////////////////// 

function is_a_directory(filename){
	return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : "dir";
}

function displayContent(content){
	var div = document.getElementById("coloneDroite");
	div.innerHTML = "";
	 var cellTexthead = document.createTextNode(content);
	 div.appendChild(cellTexthead);
}

function displayImg(src){
  
  element = document.getElementById("rep");
  src.setAttribute("style","margin-left:100px");
  element.appendChild(src);

}

function displaySong(src){

    var x = document.createElement("AUDIO");
    x.setAttribute("src",src);
    x.setAttribute("controls", "controls");
    document.getElementById("rep").appendChild(x);


}


function tableRep(rep) {

  
  var tbl = document.createElement("table");
  tbl.setAttribute('border',' 1px solid black');


  var tblHead = document.createElement("thead");
  var tblBody = document.createElement("tbody");
  var rowhead = document.createElement("tr");
  var colhead = document.createElement("td");
  var cellTexthead = document.createTextNode( rep[0] + "(.)");

	colhead.appendChild( cellTexthead);
	colhead.style.fontWeight = "bold";
	rowhead.appendChild(colhead);
	tblHead.appendChild(rowhead);

  var rowhead = document.createElement("tr");
  var colhead = document.createElement("td");
  var cellTexthead = document.createTextNode( "..");

	colhead.appendChild( cellTexthead);
	colhead.setAttribute("class","parent");
	colhead.style.color = "blue";
	colhead.onclick=
		function(){ 
	      ask(rep[1]);
		};
	rowhead.appendChild(colhead);
	tblHead.appendChild(rowhead);

  for (let i = 2; i <= rep.length -1; i++){
    var row = document.createElement("tr");
    var col = document.createElement("td");
    var hText = rep[i];
    var cellText = document.createTextNode(hText);

    col.appendChild(cellText);
    switch (is_a_directory(rep[i])){
    	case "dir":
			col.setAttribute("class","dossier");
			col.onclick= function(){ 
				    ask(rep[0] + "/" + rep[i]);
				};
			break;
		case "png":
			col.style.color = "green";
			col.onclick = function(){
				var img = new Image();
				img.src = rep[0] +"/" + rep[i];
				displayImg(img);
			}
			break;
		case "jpg":
			col.style.color = "green";
			col.onclick = function(){
				var img = new Image();
				img.src = rep[0] + "/" + rep[i];
				displayImg(img);
			}
			break;
		case "jpeg":
			col.style.color = "green";
			col.onclick = function(){
				var img = new Image();
				img.src = rep[0] + "/" + rep[i];
				displayImg(img);
			}
			break;
		case "wav":
			col.style.color = "red";
			col.onclick = function(){
				displaySong(rep[0] + "/" + rep[i]);
			}
			break;		
		case "mp3":
			col.style.color = "red";
			col.onclick = function(){
				displaySong(rep[0] + "/" + rep[i]);
			}
			break;
		case "ogg":
			col.style.color = "red";
			col.onclick = function(){
				displaySong(rep[0] + "/" + rep[i]);
			}
			break;								
		default:
			col.onclick = function(){
				askF(rep[0] + "/" + rep[i]);
			}
			break;
	}

	
	row.appendChild(col)
    tblBody.appendChild(row);
  }

  tbl.appendChild(tblHead);
  tbl.appendChild(tblBody);
  pierre1 = document.getElementById("rep");
  pierre1.innerHTML = "";
  pierre1.appendChild(tbl);
  var element = document.getElementById("searchBar");
  if (element != null)
  	element.parentNode.removeChild(element);

}


function ask(str) {

   xmlhttp=new XMLHttpRequest();      
   xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {//4 correspond a succes
        rep = JSON.parse(xmlhttp.responseText);
        document.getElementById("rep").innerHTML=xmlhttp.responseText;
        tableRep(rep);
      }
   }
   xmlhttp.open("GET","serveur.php?q="+str,true);
   xmlhttp.send();
}

function askF(str) {

   xmlhttp=new XMLHttpRequest();      
   xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {//4 correspond a succes
        rep1 = JSON.parse(xmlhttp.responseText);
        displayContent(rep1);
      }
   }
   xmlhttp.open("GET","serveur.php?f="+str,true);
   xmlhttp.send();
	
}

