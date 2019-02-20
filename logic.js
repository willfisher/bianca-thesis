var yellow = "#F2CD19";
var red = "#C1272D";
var blue = "#2E3191";
var black = 'black';
var white = 'white';

var bgcolors = [yellow, red, blue, red, black, yellow, black];
var qcolors = [black, black, white, white, yellow, red, yellow];
var acolors = [red, white, yellow, black, white, black, red];

var random_anims = false;
var possible_anims = ['slideInDown','slideInRight','slideInLeft','slideInUp'];

//opportunity, good fortune, luck
var data = [0, 0, 0];

function opp() {
	data[0]++;
}
function gf() {
	data[1]++;
}
function lck() {
	data[2]++;
}

function show(shown) {
	document.getElementById("Question"+shown).style.display='block';
	if(shown >= 2) document.body.style.backgroundColor=bgcolors[shown - 2];
	/*
	var i;
	for(i = 1; i <= 7; i++) {
		if(i != shown) document.getElementById("Question"+i).style.display='none';
	}
	*/
	return false;
}
function random_anim() {
	return possible_anims[Math.floor(Math.random() * possible_anims.length)];
}
function start() {
	//document.getElementById("start").style.display='none';
	
	var i;
	for(i = 1; i <= 7; i++) {
		document.getElementById("Question"+i).style.backgroundColor = bgcolors[i - 1];
		document.getElementById("q"+i).style.color=qcolors[i - 1];
		document.getElementById("a"+i).style.color=acolors[i - 1];
		document.getElementById("a"+i).style.border="3px dotted "+acolors[i - 1];
		if(random_anims) document.getElementById("Question"+i).className = document.getElementById("Question"+i).className.replace('slideInDown', random_anim());
	}
	if(random_anims) {
		document.getElementById("thanks").className = document.getElementById("thanks").className.replace('slideInDown', random_anim());
		document.getElementById("results").className = document.getElementById("results").className.replace('slideInDown', random_anim());
	}
	
	show(1);
	return false;
}
function thanks() {
	document.body.style.backgroundColor=bgcolors[6];
	//document.getElementById("Question7").style.display='none';
	document.getElementById("thanks").style.display='block';
	return false;
}

function index_to_trait(index) {
	switch(index) {
		case 0: return "Opportunity";
		case 1: return "Good Fortune";
		case 2: return "Luck";
	}
	return "";
}
function last_trait(trait1, trait2) {
	return "OpportunityGood FortuneLuck".replace(trait1, "").replace(trait2, "");
}

var order = ["DOpportunity", "DGood Fortune", "DLuck", "DSSOpportunity", "DSSGood Fortune", "DSSLuck", "DSLOpportunityGood FortuneLuck", "DSLOpportunityLuckGood Fortune", "DSLGood FortuneLuckOpportunity", "DSLGood FortuneOpportunityLuck", "DSLLuckOpportunityGood Fortune", "DSLLuckGood FortuneOpportunity", "DSLuckOpportunity", "DSLuckGood Fortune", "DSOpportunityLuck", "DSOpportunityGood Fortune", "DSGood FortuneLuck", "DSGood FortuneOpportunity", "DDSLuck", "DDSOpportunity", "DDSGood Fortune"];

function init_finalscreen() {
	var only_dominant = Math.max(data[0], data[1], data[2]) == 7 ? true : false;
	var two_dom = ((data[0] == 3) + (data[1] == 3) + (data[2] == 3)) == 2;
	var exists_latent = new Set(data).size == 3 && Math.min(data[0], data[1], data[2]) != 0 ? true : false;
	var dominant_trait = index_to_trait(data.indexOf(Math.max(data[0], data[1], data[2])));
	var latent_trait = index_to_trait(data.indexOf(Math.min(data[0], data[1], data[2])));
	var shadow_trait = last_trait(dominant_trait, latent_trait);
	
	var searchText = "";
	if(two_dom) {
		searchText = "DDS" + latent_trait;
	} else if(only_dominant) {
		searchText = "D" + dominant_trait;
	} else if(!exists_latent && Math.min(data[0], data[1], data[2]) != 0) {
		searchText = "DSS" + dominant_trait;
	} else if(!exists_latent) {
		searchText = "DS" + dominant_trait + shadow_trait;
	} else {
		searchText = "DSL" + dominant_trait + shadow_trait + latent_trait;
	}
	
	document.getElementById("result_number").textContent = "" + (order.indexOf(searchText) + 1);
}

function results() {
	init_finalscreen();
	document.body.style.backgroundColor="red";
	//document.getElementById("thanks").style.display='none';
	document.getElementById("results").style.display='block';
	return false;
}

function restart() {
	data = [0, 0, 0];
	location.reload();
}

window.ondragstart = function() { return false; } 