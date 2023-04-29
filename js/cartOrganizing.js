var $_anchor = document.getElementsByTagName("A");
for (var i = 0; i < $_anchor.length; i++) {
  $_anchor[i].setAttribute("class","anchor-" + i + "");
}

var $_checkoutSection = document.getElementsByClassName("checkout-section")[0];
$_checkoutSection.setAttribute("id",$_checkoutSection.className);
var $_checkoutSection = document.getElementById("checkout-section");

/* ======================================= */
/* ============= organizing ============= */
/* ===================================== */

let $_checkoutSectionHeader = document.createElement("header");
$_checkoutSectionHeader.innerText = "Personal Details";
$_checkoutSectionHeader.setAttribute("id","checkout-section-header");

$_checkoutSection.parentNode.insertBefore($_checkoutSectionHeader,$_checkoutSection);

let $_checkoutOrderHeader = document.createElement("header");
$_checkoutOrderHeader.innerHTML = "Order Details";
$_checkoutOrderHeader.setAttribute("id","order-details-header");
document.getElementById("accordion").parentNode.insertBefore($_checkoutOrderHeader,document.getElementById("accordion"));

var $_totals = document.getElementsByClassName("cart-edit-bottom")[0];
$_totals.setAttribute("id",$_totals.className);
$_totals = document.getElementById("cart-edit-bottom");

let $_totalsHeader = document.createElement("header");
$_totalsHeader.setAttribute("id","totals-header");
$_totalsHeader.innerHTML = "Order total";
$_totals.parentNode.insertBefore($_totalsHeader,$_totals);

/* ====================================== */
/* ========== organize inputs ========== */
/* ==================================== */

var $_inputs;
var $_labels;
var $_containers = document.getElementsByClassName("container");

for (var i = 0; i < $_containers.length; i++) {
  $_containers[i].setAttribute("id","container-" + i + "");
}

$_inputs = document.getElementsByTagName("INPUT");
$_labels = document.getElementsByTagName("LABEL");

for (var i = 0; i < $_inputs.length; i++) {
  if($_inputs[i].parentNode.getAttribute("id") === "container-1"){
    $_inputs[i].setAttribute("class","detail-input");
  };
};

for (var i = 0; i < $_labels.length; i++) {
  if ($_labels[i].parentNode.getAttribute("id") === "container-1") {
    $_labels[i].setAttribute("class","detail-label");
  };
};

$_inputs = document.getElementsByClassName("detail-input");
$_labels = document.getElementsByClassName("detail-label");

function wrap(elem,wrapper){
  elem.parentNode.insertBefore(wrapper,elem);
  wrapper.appendChild(elem);
};

var $_div;

for (var i = 0; i < $_labels.length; i++) {
  $_div = document.createElement("div");
  $_div.setAttribute("class","customer-fields");

  if ($_labels[i].className === "detail-label") {
    wrap($_labels[i],$_div);
  }
};

for (var i = 0; i < $_inputs.length; i++) {
  $_inputs[i].setAttribute("id","" + $_inputs[i].getAttribute("name"));
  if($_inputs[i].type === "text" || $_inputs[i].type === "email" && $_inputs[i].className === "detail-input"){
    $_inputs[i].setAttribute("placeholder",$_labels[i].innerText);
    wrap($_inputs[i],document.getElementsByClassName("customer-fields")[i]);
  };

};

/*========================================================*/
/*==================|  number spinner |==================*/
/*======================================================*/

// let spinnerInput = document.querySelectorAll("input[type='number']");

// Array.prototype.forEach.call(spinnerInput, function(item, index) {

//   item.setAttribute('ID',item.getAttribute('name'));
//   let numberSpinnerParent = item.parentNode;

//   let spinnerDiv = document.createElement("DIV");
//   spinnerDiv.setAttribute("class","numberSpinner");

//   let spinnerSection = document.createElement("SECTION");

//   let spinnerPlus = document.createElement("BUTTON");
//   let spinnerMinus = document.createElement("BUTTON");
//   spinnerPlus.setAttribute("type","button");
//   spinnerMinus.setAttribute("type","button");
//   spinnerPlus.setAttribute("class","numberPlus");
//   spinnerMinus.setAttribute("class","numberMinus");
//   spinnerPlus.innerHTML = '<span class="material-symbols-outlined">chevron_right</span>';
//   spinnerMinus.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>';

//   numberSpinnerParent.appendChild(spinnerDiv);

//   spinnerDiv.appendChild(spinnerMinus)
//   spinnerDiv.appendChild(spinnerSection);
//   spinnerSection.appendChild(item);
//   spinnerDiv.appendChild(spinnerPlus);

// });

/*========================================================*/
/*=================|   numberIncremet  |=================*/
/*======================================================*/

// function numIncrement(numberInput, increase) {
//   var myInputObject = document.getElementById(numberInput);
//   if (increase) {
//       if (myInputObject.Value == " "){
//           myInputObject.value = 1;
//       }else{
//          myInputObject.value++;
//       }
      
//       localStorage.setItem("" + myInputObject.getAttribute("name") + "", myInputObject.value);
//   } else {
//       myInputObject.value--;
//       localStorage.setItem("" + myInputObject.getAttribute("name") + "", myInputObject.value);
//   };
//   if (myInputObject.value > 999) {
//       myInputObject.value = 999;
//   };
//   if (myInputObject.value < 1) {
//       myInputObject.value = " ";
//   };
// };

/*========================================================*/
/*=================|   number  Events  |=================*/
/*======================================================*/

// let numberSpinnerPlus = document.getElementsByClassName("numberPlus");
// let numberSpinnerMinus = document.getElementsByClassName("numberMinus");

// for (var i = 0; i <  numberSpinnerPlus.length; i++) {
//     numberSpinnerPlus[i].addEventListener( "click" ,function(){
//         numIncrement("" + this.previousElementSibling.firstChild.id + "",true)
//     });
// };

// for (var i = 0; i < numberSpinnerMinus.length; i++) {
//     numberSpinnerMinus[i].addEventListener( "click" ,function(){
//         numIncrement("" + this.nextElementSibling.firstChild.id + "",false)
//     });
// };

/*========================================================*/
/*=================|   cart - bottom   |=================*/
/*======================================================*/

var $_cartBottom = document.getElementsByClassName("row")[1];
$_cartBottom.setAttribute("id","cart-bottom");

/*========================================================*/
/*================|   create CartHero   |================*/
/*======================================================*/

let cartHero = document.createElement("div");
cartHero.setAttribute("id","cart-hero");
cartHero.innerHTML = "<h2><span class='material-symbols-outlined'>shopping_cart</span>Your Shopping Cart</h2>"
let heroContainer = document.getElementById("container-0");
heroContainer.insertBefore(cartHero,heroContainer.firstElementChild);

/*=======================================================*/
/*=============|   make checkout easier   |=============*/
/*=====================================================*/

let organizeCheckout = function(){
  let scrollPoint;
  scrollPoint = document.getElementsByClassName("title");
  for (let i = 0; i < scrollPoint.length; i++) {
    scrollPoint[i].setAttribute("id","title-" + i + "");
  };
  
  let goToCheckout = document.createElement("BUTTON");

  goToCheckout.setAttribute("type","button");
  goToCheckout.setAttribute("id","goToCheckout");
  goToCheckout.innerHTML = "<p>checkout</p><span class='material-symbols-outlined'>expand_circle_down</span>"

  document.getElementById("cart-bottom").appendChild(goToCheckout);

};
organizeCheckout();

const scrollButton = document.getElementById("goToCheckout");
const scrollLocation = document.getElementById("title-1");

scrollButton.addEventListener("click",function(){
   scrollLocation.scrollIntoView({ behavior: "auto" });
},false);

