console.log("precheckout.js");

let page1 = document.getElementById("page-1");
let page2 = document.getElementById("page-2");
let page3 = document.getElementById("page-3");

/*===========================================================*/
/*==================| local/current date |==================*/
/*=========================================================*/

const getTime = function(_timezone) {
	let datetime_str = new Date().toLocaleString( "en-GB", {
		timeZone: _timezone
	}, {
		hour12: false
	} );
	dateArr = datetime_str.split( ",", 2 );
	dateArr.shift();
	datetime_str = dateArr[ 0 ].slice( 1 );
	datetime_str = parseInt( datetime_str );
	return datetime_str;
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
	myInputObject.focus();

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
		defaultDate: "",
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
		$('.ui-datepicker-current-day .ui-state-active').removeClass('ui-state-active').removeClass('ui-state-hover');
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
			
			let dateError = document.getElementById("date-error");
			if(dateError.className === "date-error active"){
				dateError.className = "date-error";
			};
		};
    });

};

/*========================================================*/
/*==================|  dateValidation |==================*/
/*======================================================*/

let availabilityValidate = function(){
	let availability = cartConfig.Availabilities[0].Cutoff;
	let pickupDate = document.getElementById("dateInput");
	let dateError = document.getElementById("date-error");
	if ( pickupDate.value  == getTodaysDate() ) {
		if ( parseFloat(getTime("Pacific/Honolulu")) > parseFloat(availability)) {
			dateError.className === "date-error active";
			return false;
		} else {
			dateError.className === "date-error";
			return true;
		};
	}else{
		return true;
	}; 
};

/*========================================================*/
/*==================|  number spinner |==================*/
/*======================================================*/

let createSpinners = function(landing,$name,index){

        let numberSpinner = document.createElement("DIV");
		numberSpinner.setAttribute("class","numberSpinner");

        let spinnerSection = document.createElement("SECTION");

		let spinnerInput = document.createElement('INPUT');
		spinnerInput.setAttribute("type","text");
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
        spinnerPlus.innerHTML = '<span class="material-symbols-outlined">chevron_right</span>';
        spinnerMinus.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>';

		numberSpinner.appendChild(spinnerMinus);
		spinnerSection.appendChild(spinnerInput);
		numberSpinner.appendChild(spinnerSection);
		numberSpinner.appendChild(spinnerPlus);
        
		landing.appendChild(numberSpinner);

};

/*========================================================*/
/*==================|     Prices      |==================*/
/*======================================================*/

let createPrices = (landing) => {

	// create group template

	let groupTemplate = document.createElement("DIV");
	groupTemplate.setAttribute("id","groups");
		
	let groups = cartConfig.Groupings;
	let group;

	Array.prototype.forEach.call(groups, function(item, index) {
		
		group = document.createElement("DIV");
		group.setAttribute("class","group");
		
		let groupHeader = document.createElement("BUTTON");
		groupHeader.setAttribute("type","button");
		groupHeader.setAttribute("class","group-header");
		
		let groupHeaderBtn = document.createElement('SPAN');
		groupHeaderBtn.setAttribute("class","group-header-btn");
		groupHeaderBtn.innerHTML = '<span class="material-symbols-outlined">add_circle</span> view';

		let groupH2 = document.createElement("H2");
		groupH2.setAttribute("class","group-title");

		let groupSection = document.createElement("div");
		groupSection.setAttribute("class","group-section");
		
		if(item.Active === true){
			groupH2.innerHTML = item.Name;
			group.setAttribute("id",item.Name.replace(/\s/g, ''));
			groupHeader.appendChild(groupHeaderBtn);
			groupHeader.appendChild(groupH2);
			group.appendChild(groupHeader);
			group.appendChild(groupSection);
			groupTemplate.appendChild(group);
		};

		landing.appendChild(groupTemplate);

	});

	// create prices

	let cartPrices = cartConfig.Prices;
	let priceOption;

	Array.prototype.forEach.call(cartPrices, function(item, index) {

		let description = item.Description;
		let grouping = item.Grouping;

		priceOption = document.createElement('UL');
		priceOption.setAttribute("class", "price-option");
		priceOption.setAttribute('data-group', grouping.replace(/\s/g, ''));

		let priceSpinnerCont = document.createElement("LI");
		priceSpinnerCont.setAttribute("class", "price-spinner-cont");
		createSpinners(priceSpinnerCont, item.ControlName, index);

		let priceDescription = document.createElement("LI");
		priceDescription.setAttribute('class', 'price-description');
		priceDescription.innerHTML = "<p>" + description + "</p>";

		let PricePrices = document.createElement("li");
		PricePrices.setAttribute('class', 'price-prices');
		PricePrices.innerHTML = "<p>was<span class='linethru'>$" +
			item.ListPrice + "</span></p><p>now<span>$" +
			item.Saleprice + "</span></p>";

		priceOption.appendChild(priceSpinnerCont);
		priceOption.appendChild(priceDescription);
		priceOption.appendChild(PricePrices);
		landing.appendChild(priceOption);

	});

	//assign prices to respective groups

	priceOption = document.getElementsByClassName("price-option");

	Array.prototype.forEach.call(priceOption, function(item, index){

		itemGrouping = item.getAttribute('data-group');

		let groupId = document.getElementById(itemGrouping);
		let groupCollection = groupId.firstElementChild.nextElementSibling;
		if( groupId.getAttribute("id") === itemGrouping ){
			groupCollection.appendChild(item);
		};

	});

	// remove empty groups and groups with single items
	group = document.getElementsByClassName("group");

	Array.prototype.forEach.call(group, function(item,index){

		let groupChildren = item.firstElementChild.nextElementSibling;

		if(groupChildren.childElementCount == 0){
			item.style.display = 'none';
		}else if(groupChildren.childElementCount < 2){
			landing.appendChild(groupChildren.firstElementChild);
		};

		if(groupChildren.childElementCount == 0){
			item.style.display = 'none';
		}
	});

};

/*========================================================*/
/*==============|  Additional Collectors  |==============*/
/*======================================================*/

let createAdditionalCollectors = function (landing){

	let collector;
	let collectors = cartConfig.Collectors;
	collectors = collectors.slice(1,collectors.length);

	// create single collectors
	Array.prototype.forEach.call(collectors, function(item, index) {

		collector = document.createElement("DIV");
		collector.setAttribute("class","collector");
		let collectorInput;

		if(item.ApplicationDataType === 7){

			// create collectors Select
			collectorInput = document.createElement("SELECT");
			let dropDownItems = item.ListMember.ListMembers;

			Array.prototype.forEach.call(dropDownItems, function(element,elementIndex){
				let _option = document.createElement("option");
				_option.innerHTML = element.Shortcode;
				collectorInput.appendChild(_option);
			});
		
		}else if(item.ApplicationDataType === 1){

			// create collectors checkbox

			collectorInput = document.createElement("INPUT");
			collectorInput.setAttribute("type","checkbox");
			collectorInput.setAttribute("class","checkbox");

		}else{

			// create collectors text

			collectorInput = document.createElement("INPUT");
			collectorInput.setAttribute("type","text");
			collectorInput.setAttribute("placeholder",item.Name);

		};

		// add identifiers to collectors
	
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

let createCheckoutHeader = () => {
	let checkOutHeader = document.getElementById("checkout-header");
	checkOutHeader.innerHTML = cartConfig.ProductTitle;
}

/*========================================================*/
/*==================|  Create page 1  |==================*/
/*======================================================*/

let createPage1 = () => {
	createDatePicker(page1.firstElementChild);
};

/*========================================================*/
/*==================|  Create page 2  |==================*/
/*======================================================*/

let createPage2 = () => {

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

let createPage3 = () => {

	createAdditionalCollectors(page3.firstElementChild);

};

/*========================================================*/
/*==================|  misc re-style  |==================*/
/*======================================================*/

let luauGallery = document.getElementById("luau-gallery");
let additionalInfo = document.createElement("DIV");

additionalInfo.setAttribute("id", "additional-info");

[].forEach.call(document.querySelectorAll(".bulletpointstyles"),(item,index) => {

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

/*======================================================*/

let showPage1 = function(){
	page1.className = "addToCartPage active";
	page2.className = "addToCartPage";
	page3.className = "addToCartPage";
	pageIndex = 1;
};

/*======================================================*/

let showPage2 = function(){

	let datePicker = document.getElementById("datepicker");
	_dateError = document.getElementById("date-error");

	if (datePicker.value.trim().length === 0 || datePicker.value === null || datePicker.value === undefined) {
		
		_dateError.className = "date-error active";
	
	} else {

		if(availabilityValidate() === true){

			_dateError.className = "date-error";
			page1.className = "addToCartPage";
			page2.className = "addToCartPage active";
			page3.className = "addToCartPage";
			pageIndex = 2;

		}else{

			_dateError.className = "date-error active";

		};

	};	

};	

/*======================================================*/

let showPage3 = function(){

	let priceOptions = document.getElementsByClassName("price");
	let priceValuesTotal = [];

	for (let i = 0; i < priceOptions.length; i++) {
		priceValuesTotal.push(priceOptions[i].value);
	}

	let  priceValuesCombine = priceValuesTotal.reduce((accumulator,currentValue) => {
		return accumulator + currentValue;
	},0);

	if( priceValuesCombine > 0){
		document.getElementById("price-error").className = "price-error";
		page1.className = "addToCartPage";
		page2.className = "addToCartPage";
		page3.className = "addToCartPage active";
		 pageIndex = 3;
	}else{
		document.getElementById("price-error").className = "price-error active";
	};

};

/*======================================================*/

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

let groupHeader = document.getElementsByClassName('group-header');

Array.prototype.forEach.call(groupHeader, function(item, index) {
	
	item.addEventListener("click",function(){
		
		if(item.parentElement.className === 'group'){
			item.parentElement.className = 'group active';
			item.firstElementChild.innerHTML = '<span class="material-symbols-outlined">cancel</span> close';
		}else{
			item.parentElement.className = 'group';
			item.firstElementChild.innerHTML = '<span class="material-symbols-outlined">add_circle</span> view';
		}

	},false);

});

let lastCheckbox = document.querySelectorAll(".checkbox")
let $checkout = document.getElementById("addToCartSubmit");

lastCheckbox[lastCheckbox.length -1].addEventListener("change", function () {
	if (this.checked) {
		$checkout.disabled = false;
	} else {
		$checkout.disabled = true;
	}
})

/*======================================================*/
