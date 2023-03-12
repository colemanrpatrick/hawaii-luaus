console.log("precheckout.js");
//console.log(cartConfig);

let page1 = document.getElementById("page-1");
let page2 = document.getElementById("page-2");
let page3 = document.getElementById("page-3");

/*===========================================================*/
/*==================| local/current date |==================*/
/*=========================================================*/

const getHawaiiTime = function() {
	let hawaii_datetime_str = new Date().toLocaleString( "en-GB", {
		timeZone: "Pacific/Honolulu"
	}, {
		hour12: false
	} );
	dateArr = hawaii_datetime_str.split( ",", 2 );
	dateArr.shift();
	hawaii_datetime_str = dateArr[ 0 ].slice( 1 );
	hawaii_datetime_str = parseInt( hawaii_datetime_str );
	return hawaii_datetime_str;
};
const getTodaysDate = function() {
	let currentDate = new Date().toLocaleDateString( 'en-US', {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	} );
	return currentDate;
};
/*========================================================*/
/*=================|   numberIncremet  |=================*/
/*======================================================*/

function numIncrement( numberInput, increase ) { 

	var myInputObject = document.getElementById( numberInput ); 
	if ( increase ) { 
		myInputObject.value++;
		localStorage.setItem( "" + myInputObject.getAttribute( "name" ) + "", myInputObject.value );
		 
	} else { 
		myInputObject.value--;
		localStorage.setItem( "" + myInputObject.getAttribute( "name" ) + "", myInputObject.value );
		 
	}; 
	if ( myInputObject.value > 999 ) {
		myInputObject.value = 999;
	};
	if ( myInputObject.value <= 0 ) {
		myInputObject.value = 0;
	};

}; 

/*========================================================*/
/*==================|   Date Picker   |==================*/
/*======================================================*/

let createDatePicker = function(landing){

    let dateInput = document.createElement("input");
    let datePicker = document.createElement("div");
    
    dateInput.setAttribute("type","text");
    dateInput.setAttribute("id","dateInput");
    datePicker.setAttribute('id','datepicker');

    landing.appendChild(dateInput);
    landing.appendChild(datePicker);

/*========== jQuery UI datepicker functions ==========*/

    var dateToday = new Date();
    
    // list of specific disabled dates //
    let disabledDates = cartConfig.Availabilities[0].ClosedDates;
    disabledDates = JSON.parse(disabledDates);

    for (var i = 0; i < disabledDates.length; i++) {
        disabledDates[i] = disabledDates[i].replace(/\//g, '-');
    };

    $(datePicker).datepicker({
        minDate: dateToday,// dates before current day disabled //
        beforeShowDay: function (date) { // disables dates based on disabledDates
            var disabledDatesString = jQuery.datepicker.formatDate('mm-dd-yy', date);
            return [disabledDates.indexOf(disabledDatesString) == -1]
        }
    });

	let collectorName = cartConfig.Collectors[0].ControlName;

    $("#dateInput").attr("name", "" + collectorName + "");

	/*====== set datepicker / date input value ======*/

    if (localStorage.getItem("" + $('#dateInput').attr('name') + "")) {

        $("#dateInput").prop('value', localStorage.getItem($('#dateInput').attr('name'))).trigger('change');
        $("#datepicker").datepicker('setDate', $("#dateInput").val());

    } else {

        $('.ui-datepicker-current-day').removeClass('ui-datepicker-current-day');
        $('#dateInput').val('');
        $('#datepicker').val('');
    };

    /*====== set datepicker and input events ======*/

    $("#dateInput").change(function () {
        $("#datepicker").datepicker('setDate', $(this).val()).trigger('change');
    });

    $("#datepicker").change(function () {
        if ($("#dateInput").val() !== disabledDates) {
            $("#dateInput").prop('value', $(this).val());
            localStorage.setItem("" + $('#dateInput').attr('name') + "", "" + $('#dateInput').val() + "");
        };
    });

};
/*========================================================*/
/*==================|  number spinner |==================*/
/*======================================================*/

let createSpinners = function(landing,$name,index){

        let numberSpinner = document.createElement("DIV");
		numberSpinner.setAttribute("class","numberSpinner");

        let spinnerSection = document.createElement("SECTION");

		let spinnerInput = document.createElement('INPUT');
		spinnerInput.setAttribute("type","number");
		spinnerInput.setAttribute("name",$name);
		spinnerInput.setAttribute("id",$name);
		spinnerInput.setAttribute('class','price');
		spinnerInput.setAttribute('min',0);

        let spinnerPlus = document.createElement("BUTTON");
        let spinnerMinus = document.createElement("BUTTON");
        spinnerPlus.setAttribute("type","button");
        spinnerMinus.setAttribute("type","button");
        spinnerPlus.setAttribute("class","numberPlus");
        spinnerMinus.setAttribute("class","numberMinus");
        spinnerPlus.innerHTML = " + ";
        spinnerMinus.innerHTML = " - ";

		numberSpinner.appendChild(spinnerMinus);
		spinnerSection.appendChild(spinnerInput);
		numberSpinner.appendChild(spinnerSection);
		numberSpinner.appendChild(spinnerPlus);
        
		landing.appendChild(numberSpinner);

};

/*========================================================*/
/*==================|     Prices      |==================*/
/*======================================================*/

let createPrices = function(landing){

	let cartPrices = cartConfig.Prices;

	Array.prototype.forEach.call(cartPrices, function(item, index) {
		let description = item.Description;
		let grouping = item.Grouping;

		let priceOption = document.createElement('UL');
		priceOption.setAttribute("class","price-option");
		priceOption.setAttribute('data-group',grouping.replace(/\s/g, ''));

		let priceSpinnerCont = document.createElement("LI");
		priceSpinnerCont.setAttribute("class","price-spinner-cont");
		createSpinners(priceSpinnerCont,item.ControlName,index);

		let priceDescription = document.createElement("LI");
		priceDescription.setAttribute('class','price-description');
		priceDescription.innerHTML = "<p>" + description + "</p>";

		let PricePrices = document.createElement("li");
		PricePrices.setAttribute('class','price-prices');
		PricePrices.innerHTML = "<p>from<span class='linethru'>$" + 
								item.ListPrice + "</span></p><p>now<span>$" + 
								item.Saleprice + "</span></p>";

		priceOption.appendChild(priceSpinnerCont);
		priceOption.appendChild(priceDescription);
		priceOption.appendChild(PricePrices);

		landing.appendChild(priceOption);
	});

};

/*========================================================*/
/*==============| create groups template  |==============*/
/*======================================================*/

let createGroupTemplate = function(landing){

	let groupTemplate = document.createElement("DIV");
	groupTemplate.setAttribute("id","groups");

	let groups = cartConfig.Groupings;
	console.log(groups);

	Array.prototype.forEach.call(groups, function(item, index) {

		let group = document.createElement("DIV");
		group.setAttribute("class","group");

		let groupHeader = document.createElement("BUTTON");
		groupHeader.setAttribute("type","button");
		groupHeader.setAttribute("class","group-header");

		let groupSection = document.createElement("div");
		groupSection.setAttribute("class","group-section");

		let groupH2 = document.createElement("H2");
		groupH2.setAttribute("class","group-title");

		if(item.Active === true){
			groupH2.innerHTML = item.Name;
			group.setAttribute("id",item.Name.replace(/\s/g, ''));
			groupHeader.appendChild(groupH2);
			group.appendChild(groupHeader);
			group.appendChild(groupSection);
			groupTemplate.appendChild(group);
		};
	});

	landing.appendChild(groupTemplate);

};

/*========================================================*/
/*==============|  Additional Collectors  |==============*/
/*======================================================*/

let createAdditionalCollectors = function(landing){

	let collectors = cartConfig.Collectors;
	collectors = collectors.slice(1,collectors.length);

	Array.prototype.forEach.call(collectors, function(item, index) {

		let collector = document.createElement("DIV");
		collector.setAttribute("class","collector");

		let collectorInput;

		if(item.ApplicationDataType === 7){

			collectorInput = document.createElement("SELECT");
			let dropDown = item.ListMember.ListMembers;
		
			dropDown.push("" + item.Name + "");

			Array.prototype.forEach.call(dropDown, function(element,elementIndex){
				let _option = document.createElement("option");
				_option.innerHTML = element;
				collectorInput.appendChild(_option);
			});

		}else if(item.ApplicationDataType === 1){
			
			collectorInput = document.createElement("INPUT");
			collectorInput.setAttribute("type","checkbox");

		}else{

			collectorInput = document.createElement("INPUT");
			collectorInput.setAttribute("type","text");
			collectorInput.setAttribute("placeholder",item.Name);

		};

		collectorInput.setAttribute("name",item.ControlName);

		let collectorLabel = document.createElement("LABEL");
		collectorLabel.innerHTML = item.Name;
		collectorLabel.setAttribute("for",item.ControlName);

		collector.appendChild(collectorLabel);
		collector.appendChild(collectorInput); 

		landing.appendChild(collector);
	});

};

/*========================================================*/
/*==================|  Create Header  |==================*/
/*======================================================*/

let createCheckoutHeader = function(){
	let checkOutHeader = document.getElementById("checkout-header");
	checkOutHeader.innerHTML = cartConfig.ProductTitle;
}

/*========================================================*/
/*==================|  Create page 1  |==================*/
/*======================================================*/

let createPage1 = function(){
	createDatePicker(page1.firstElementChild);
};

/*========================================================*/
/*==================|  Create page 2  |==================*/
/*======================================================*/

let createPage2 = function(){

	createPrices(page2.firstElementChild);

	let numberSpinnerPlus = document.getElementsByClassName("numberPlus");
	let numberSpinnerMinus = document.getElementsByClassName("numberMinus");

	for (var i = 0; i <  numberSpinnerPlus.length; i++) {
    	numberSpinnerPlus[i].addEventListener( "click" ,function(){
        	numIncrement("" + this.previousElementSibling.firstChild.id + "",true)
    	});
	};

	for (var i = 0; i < numberSpinnerMinus.length; i++) {
    	numberSpinnerMinus[i].addEventListener( "click" ,function(){
        	numIncrement("" + this.nextElementSibling.firstChild.id + "",false)
    	});
	};

	let $price = document.getElementsByClassName("price");

	Array.prototype.forEach.call($price, function(item,index) {
		if(item.value.length < 1){
			item.value = 0;
		};
	});

};

/*========================================================*/
/*==================|  Create page 3  |==================*/
/*======================================================*/

let createPage3 = function(){

	createAdditionalCollectors(page3.firstElementChild);

};

/*========================================================*/
/*==================|  misc re-style  |==================*/
/*======================================================*/

let luauGallery = document.getElementById("luau-gallery");
let additionalInfo = document.createElement("DIV");

additionalInfo.setAttribute("id", "additional-info");

[].forEach.call(document.querySelectorAll(".bulletpointstyles"),function(item,index){

	additionalInfo.append(item.previousElementSibling);
	additionalInfo.append(item);

});

luauGallery.parentNode.insertBefore(additionalInfo, luauGallery.nextElementSibling);

/*========================================================*/
/*==================|     events!     |==================*/
/*======================================================*/

createCheckoutHeader();
createPage1();
createPage2();
createPage3();

let pageIndex;
pageIndex = 1;

let showPage1 = function(){
	page1.className = "addToCartPage active";
	page2.className = "addToCartPage";
	page3.className = "addToCartPage";
	pageIndex = 1;
};

let showPage2 = function(){
	
	let datePicker = document.getElementById("datepicker");
	_dateError = document.getElementById("date-error");

	if (datePicker.value.trim().length === 0 || datePicker.value === null || datePicker.value === undefined) {
		
		_dateError.className = "date-error active";
	
	} else {
		_dateError.className = "date-error";
		page1.className = "addToCartPage";
		page2.className = "addToCartPage active";
		page3.className = "addToCartPage";
		pageIndex = 2;
	};	
};

let showPage3 = function(){

	let priceOptions = document.getElementsByClassName("price");

	for (let i = 0; i < priceOptions.length; i++) {
		if(priceOptions[i].value == 0){
			console.log("no item selected");
		}else{
			page1.className = "addToCartPage";
			page2.className = "addToCartPage";
			page3.className = "addToCartPage active";
			pageIndex = 3;
		};
	}
};

let openCheckout = function(){
    document.getElementById("checkout-window").className = "active";
    showPage1();
};
let closeCheckout = function(){
    document.getElementById("checkout-window").className = "";
};

document.addEventListener("click", function(event){
    let checkoutWindow = document.getElementById("checkout-window");
    if(checkoutWindow.className === 'active' && event.target.id === "checkout-window" && event.target.id !== "checkout"){
        closeCheckout();
    };
})