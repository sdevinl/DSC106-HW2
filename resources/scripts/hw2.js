// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Global store (What else would you need here?)
let store = {
  orderHistory: []
};

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity]

	return [
	  [1, '01/01/2020', 1, 1], 
	  [2, '01/02/2020', 2, 2]
	]
}

document.getElementById("dingusQuantity").value = "0";
document.getElementById("dingusCost").placeholder = DINGUS_PRICE;
document.getElementById("dingusTotal").placeholder = ZERO_FORMAT;

document.getElementById("dingusQuantity").value = "0";
document.getElementById("widgetCost").placeholder = WIDGET_PRICE;
document.getElementById("widgetTotal").placeholder = ZERO_FORMAT;

document.getElementById("Total").placeholder = ZERO_FORMAT;


const idEntry = 0;
const dateEntry = 1;
const dingusEntry = 2;
const widgetEntry = 3;


if (localStorage.getItem("history") === null) {

	// for generateEntrries
	entries = generateEntries();
	var idCount = entries.length;
	for (var i = 0; i < entries.length; i++) {
			addOrder(entries[i]);
		}
	

}
else {
	var stored = JSON.parse(localStorage.getItem("history"));
	var idCount = Number(localStorage.getItem("idCount"));
	// for localStorage
	for (var i = 0; i < stored.length; i++) {
		addOrder(stored[i]);
	}

}


console.log(stored);

//var idCount = Number(localStorage.getItem("idCount"));

// for generateEntries
//for (var i = 0; i < entries.length; i++) {
//	addOrder(entries[i]);
//}


//localStorage.clear();

function order() {
	
	dQuantity = document.getElementById("dingusQuantity").value; //dingus
	wQuantity = document.getElementById("widgetQuantity").value; //widget
	dTotal = dQuantity * DINGUS_PRICE;
	wTotal = wQuantity * WIDGET_PRICE;

	Total = dTotal + wTotal; //total

	idCount++; //id

	localStorage.setItem("idCount", idCount);

	let d = new Date();
	let day = String("0" + (d.getMonth()+1)).slice(-2)
	let month = d.getDate();
	let year = d.getFullYear();

	date =  day + "/" +  month + "/" + year; //date

	if (!dQuantity) {
		dQuantity = 0;
	}

	if (!wQuantity) {
		wQuantity = 0;
	}

	return [idCount, date, dQuantity, wQuantity]
}

function calculateTotals() {
	dQuantity = document.getElementById("dingusQuantity").value;
	dTotal = dQuantity * DINGUS_PRICE
	document.getElementById("dingusTotal").placeholder = dTotal;

	wQuantity = document.getElementById("widgetQuantity").value;
	wTotal = wQuantity * WIDGET_PRICE;
	document.getElementById("widgetTotal").placeholder = wTotal;

	document.getElementById("Total").placeholder = wTotal + dTotal;

	document.getElementById("button-success").disabled = false;

	if ((dQuantity == 0 && wQuantity == 0) || (!dQuantity && !wQuantity) ) {
		clearForm();
	}
}

function removeValue() {
	dQuantity = document.getElementById("dingusQuantity").value;
	wQuantity = document.getElementById("widgetQuantity").value;

	if (dQuantity == 0) {
		document.getElementById("dingusQuantity").value = "";
	}

	if (wQuantity == 0) {
		document.getElementById("widgetQuantity").value = "";
	}
}

function addOrder([id, date, dingus, widget]) {
	total = (dingus * DINGUS_PRICE + widget * WIDGET_PRICE).toFixed(2)
	let orderHistory = document.getElementById("OrderHistory");

	orderHistory.deleteRow(-1); //Delete copyright row
	let lastRow = orderHistory.insertRow(-1); //Last row

	lastRow.className = "orderRow";

	let idCell = lastRow.insertCell(0); 
	let dateCell = lastRow.insertCell(1);
	let dingusQuantityCell = lastRow.insertCell(2);
	let widgetQuantityCell = lastRow.insertCell(3);
	let totalCell = lastRow.insertCell(4);

	idCell.innerHTML = id;
	idCell.className = "ID";
	dateCell.innerHTML = date;
	dingusQuantityCell.innerHTML = dingus;
	widgetQuantityCell.innerHTML = widget;
	totalCell.innerHTML = "$" + total;

	let data = [id,date,dingus,widget]
	store["orderHistory"].push(data);
	localStorage.orderHistory = store[orderHistory];

	addCopyright();


	orderHistory = store["orderHistory"];
	localStorage.setItem("history", JSON.stringify(store["orderHistory"]));

	let dCount = 0;
	let wCount = 0;
	let tSales = 0;

	for (var i = 0; i<orderHistory.length; i++) {
		dCount += Number(orderHistory[i][dingusEntry]);
		wCount += Number(orderHistory[i][widgetEntry]);
		tSales += Number(dCount) * DINGUS_PRICE + Number(wCount) * WIDGET_PRICE;
	}

	tSales = tSales.toFixed(2);

	document.getElementById("dCount").innerHTML = dCount;
	document.getElementById("wCount").innerHTML = wCount;

	document.getElementById("tSales").innerHTML = "$".fontcolor("green")+ Number(tSales);






	clearForm();
}

function clearForm() {
	document.getElementById("dingusQuantity").placeholder = ZERO_FORMAT;
	document.getElementById("dingusQuantity").value = "0";
	document.getElementById("dingusTotal").placeholder = ZERO_FORMAT;
	document.getElementById("widgetQuantity").placeholder = ZERO_FORMAT;
	document.getElementById("widgetQuantity").value = "0";
	document.getElementById("widgetTotal").placeholder = ZERO_FORMAT;
	document.getElementById("Total").placeholder = ZERO_FORMAT;
	document.getElementById("button-success").disabled=true;

	console.log("Run>");
}

function addCopyright() {
	var orderHistory = document.getElementById("OrderHistory");
	var lastRow = orderHistory.insertRow(-1); //Last row
	var idCell = lastRow.insertCell(0); 

	idCell.className = "ID";
	idCell.colSpan = "5";
	idCell.style.textAlign = "center";
	idCell.innerHTML = "\u00A9 2020 D&W Worldwide.";
}
