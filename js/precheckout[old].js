console.log("precheckout.js");
console.log(cartConfig);

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
	console.log( currentDate );
	return currentDate;
};

/*========================================================*/
/*==================|  number spinner |==================*/
/*======================================================*/

var numberPlus = document.getElementsByClassName( "numberPlus" ),
	numberMinus = document.getElementsByClassName( "numberMinus" ),
	numberInput; 

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
/*==================|Create DatePicker|==================*/
/*======================================================*/

let createDatePicker = function(page){

	let page;

	let dateInput = document.createElement("input");
	let datePicker = document.createElement("div");
	
	dateInput.setAttribute("type","text");
	dateInput.setAttribute("id","dateInput");
	datePicker.setAttribute('id','datepicker');

	page.appendChild(dateInput);
	page.appendchild(datePicker);

/*========== jQuery UI datepicker functions ==========*/

    $(datePicker).datepicker({
        minDate: dateToday,// dates before current day disabled //
        beforeShowDay: function (date) { // disables dates based on disabledDates
            var disabledDatesString = jQuery.datepicker.formatDate('mm-dd-yy', date);
            return [disabledDates.indexOf(disabledDatesString) == -1]
        }
    });

/*========== ---------------------- ==========*/

};

/*========================================================*/
/*==================| Create Template |==================*/
/*======================================================*/

let createTemplate = function(){

    let checkoutWindow;
    let checkout;

    let checkoutHeader;
    let checkoutTitle;

    let checkoutGroup;

    let checkoutFooter;
    let closeCheckout;

    checkoutWindow = document.createElement("DIV");
    checkout = document.createElement("DIV");

    checkoutWindow.setAttribute("id","checkout-window");
    checkout.setAttribute("id","checkout");
    checkoutWindow.appendChild(checkout);

    checkoutHeader = document.createElement("header");
    closeCheckout = document.createElement("button");
    checkoutTitle = document.createElement("h2");

    checkoutHeader.setAttribute("id","checkout-header");

    closeCheckout.setAttribute('type','button');
    closeCheckout.setAttribute('id','close-checkout');
    closeCheckout.innerHTML = "<span class='material-symbols-outlined'>close</span>close";

    checkoutTitle.setAttribute('id','checkout-title');
    checkoutTitle.innerHTML = cartConfig.ProductTitle;

    checkoutHeader.appendChild(checkoutTitle);
    checkoutHeader.appendChild(closeCheckout);

    checkoutGroup = document.createElement("DIV");
    checkoutGroup.setAttribute("id","checkout-group");

    checkoutFooter = document.createElement("DIV")
    checkoutFooter.setAttribute("id","checkout-footer");

    checkout.appendChild(checkoutHeader);
    checkout.appendChild(checkoutGroup);
    checkout.appendChild(checkoutFooter);

    document.body.appendChild(checkoutWindow);
};
/*========================================================*/
/*==================|  footerButtons  |==================*/
/*======================================================*/

let createFooterButtons = function(buttonFunction1,buttonFunction2){

	let $footer = documnent.getElementById("checkout-footer");
	$footer.innerHTML = " ";

	let nextButton = document.createElement("button");
	nextButton.setAttribute("type","button");
	nextButton.addEventListener("click",function(){
		buttonFunction1;
	},false);

	let prevButton = document.createElement("button");
	nextButton.setAttribute("type","button");
	nextButton.addEventListener("click",function(){
		buttonFunction2;
	},false);

	$footer.appendChild(prevButton);
	$footer.appendChild(nextButton);

}; 

/*========================================================*/
/*==================|  Create page 1  |==================*/
/*======================================================*/

let createPage1 = function(landing){
	let landing;

    let page1 = document.createElement("div");
	page1.setAttribute("class","addToCartPage");
	page1.setAttribute("id","addToCartPage1");

	createDatePicker(page1);

	landing.appendChild("Page1");
};

/*========================================================*/
/*==================|  Create page 2  |==================*/
/*======================================================*/

let createPage2 = function(landing){
	let landing;

    let page2 = document.createElement("div");
	page2.setAttribute("class","addToCartPage");
	page2.setAttribute("id","addToCartPage2");

	landing.appendChild("Page2");
};

/*========================================================*/
/*==================|  Create page 3  |==================*/
/*======================================================*/

let createPage3 = function(landing){
	let landing;

    let page3 = document.createElement("div");
	page3.setAttribute("class","addToCartPage");
	page3.setAttribute("id","addToCartPage3");

	landing.appendChild("Page3");
};

/*========================================================*/
/*==================|     events!     |==================*/
/*======================================================*/



// let openCheckout = function(){
//     document.getElementById("checkout-window").className = "active";
//     showPage1();
// };

// let closeCheckout = function(){
//     document.getElementById("checkout-window").className = " ";
// };

// let showPage1 = function(){

// };

// let showPage2 = function(){
//   if(arg){

//   }else{
//     showPage3();
//   }
// };

// let showPage3 = function(){

// };
