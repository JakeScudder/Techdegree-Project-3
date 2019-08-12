/*********************************

TechDegree Project 3 - Interactive form
Javascript file mostly implemented using jQuery

**********************************/

/*
Web page loads with focus on the Name input field
Initially hides:
  Other Job Role Text Field
  Colors Select Options
  Other payment options
*/
$(document).ready(function() {
  $('#name').focus();
  $('#other-title').hide();
  $('#colors-js-puns').hide();
  $("#paypalDiv").hide();
  $("#bitcoinDiv").hide();
});

/*
Javascript to show other Job Role text input when selected, or rehide it if it is de-selected.
*/
$('#title').on('change', function(event){
  if ($(this).val() === "other") {
    $('#other-title').show();
    $('#other-title').focus();
  }
  else {
    $('#other-title').hide()
  }
});

/*
Show or Hide T-shirt color options based on which T-shirt style is selected.
Code adapted from:
https://www.websparrow.org/web/add-and-remove-options-in-select-using-jquery

*/

$("#design option[value='select theme']").hide();

$('#design').on('change', function(event){
  $('#colors-js-puns').show();
  if ($(this).val() === "js puns" ) {
    $("#colors-js-puns option[value='pleaseselect']").remove();
    $("#colors-js-puns option[value='cornflowerblue']").show().prop('selected', true);
    $("#colors-js-puns option[value='darkslategrey']").show();
    $("#colors-js-puns option[value='gold']").show();
    $("#colors-js-puns option[value='tomato']").hide();
    $("#colors-js-puns option[value='steelblue']").hide();
    $("#colors-js-puns option[value='dimgrey']").hide();
  }
  if ($(this).val() === "heart js" ) {
    $("#colors-js-puns option[value='pleaseselect']").remove();
    $("#colors-js-puns option[value='tomato']").show().prop('selected', true);
    $("#colors-js-puns option[value='steelblue']").show();
    $("#colors-js-puns option[value='dimgrey']").show();
    $("#colors-js-puns option[value='cornflowerblue']").hide();
    $("#colors-js-puns option[value='darkslategrey']").hide();
    $("#colors-js-puns option[value='gold']").hide();
  }
});


/**********************************
Activities Section
***********************************/
/*
Debugging the event cost

let test = "$200"
let replaceTest = test.replace("$", "");
let parseTest= parseInt(replaceTest);
console.log(typeof parseTest);

*/

let grandTotal = 0;

//Append Total Cost to the bottom of the checkbox fieldset
$('.activities').append('<span id="total-cost">Total Cost: <span>');

/*
Activities Checkboxes
Retrieving the cost attribute and adding them together to get the Grand Total
*/

$('.activities input[type=checkbox]').change(function(event){
  let checked = $(this).is(":checked");
  let revisedStringCost = $(this).attr("data-cost").replace("$", "")
  let revisedNum = parseInt(revisedStringCost);
  if (checked) {
    grandTotal += revisedNum;
  } else {
    grandTotal -= revisedNum;
  }
  $('#total-cost').text("Total Cost: $").append(grandTotal);

  /*
  Retrieve the day and time of the checked activity time
  Run a for loop through the inputs in the activities Section
  Check to see that the loop time is equal to the checked activity time and also if input being checked is not the same as the element in the for loop:
    Then the element in the for loop is disabled.
    When the box is unchecked, the input is enabled once more.
  */
  let checkedActivityTime = $(this).attr("data-day-and-time");
  let actSection = $('.activities label input')

  for (let i = 0; i < actSection.length; i++) {
    let loopTime = $(actSection[i]).attr("data-day-and-time");
    if (loopTime === checkedActivityTime && event.target !== actSection[i]) {
      if (checked) {
        $(actSection[i]).prop('disabled', true);
      } else {
        $(actSection[i]).prop('disabled', false);
      }
    }
  }
});

/**********************************
Payment Section
***********************************/

$("#payment option[value='select method']").remove();


$('#payment').on('change', function(event) {

  if ($(this).val() === "credit card") {
    $("#credit-card").show();
    $("#paypalDiv").hide()
    $("#bitcoinDiv").hide()
  }
  if ($(this).val() === "paypal") {
    $("#paypalDiv").show();
    $("#credit-card").hide();
    $("#bitcoinDiv").hide()
  }
  if ($(this).val() === "bitcoin") {
    $("#bitcoinDiv").show()
    $("#paypalDiv").hide()
    $("#credit-card").hide();
  }
});

/**********************************
Validation Functions and Error Messages
All are hidden until they are tested
***********************************/

//Attaching error messages to their input fields and then hiding them

const $nameInput = $('#name');

$($nameInput).after('<span id="nameSpan" class="tooltip">Please Type Your Name</span>');
$('#nameSpan').hide();


const $emailInput = $('#mail');
$($emailInput).after('<span id="emailSpan" class="tooltip">Please Type A Valid Email</span>');
$('#emailSpan').hide();


const $oneActivity = $('.activities');
$('.register').after('<span id="activity-span" class="tooltip">Please Check At Least One Box</span>');
$('#activity-span').hide();


const $creditNumber = $('#cc-num');
$($creditNumber).after('<span id="credit-span" class="tooltip">Credit Card Number Cannot Be Blank</span>');
$($creditNumber).after('<span id="credit-length" class="tooltip">Credit Card Number Must Be 13-16 Digits Long</span>');
$('#credit-span').hide();
$('#credit-length').hide();


const $creditZip = $('#zip');
$($creditZip).after('<span id="zip-span" class="tooltip">Zip Code Cannot Be Blank</span>');
$($creditZip).after('<span id="zip-length" class="tooltip">Zip Code Must Be 5 Digits</span>');
$('#zip-span').hide();
$('#zip-length').hide();


const $cvvCode = $('#cvv');
$($cvvCode).after('<span id="cvv-span" class="tooltip">CVV Code Cannot Be Blank</span>');
$($cvvCode).after('<span id="cvv-length" class="tooltip">CVV Code Must Be 3 Digits</span>');
$('#cvv-span').hide();
$('#cvv-length').hide();


/***********************************
Validation functions
***********************************/


function validName (username) {
  if (username !== "") {
    $('#nameSpan').hide();
    return true;
  } else {
    $('#nameSpan').show();
    return false;
  }
}


function validEmail (email) {
  let testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  if (testEmail) {
    $('#emailSpan').hide();
    return true;
  } else {
    $('#emailSpan').show();
    return false;
  }
}

function validActivity (activity) {
  if (grandTotal !== 0) {
    $('#activity-span').hide();
    return true;
  } else {
    $('#activity-span').show();
    return false;
  }
}

//Credit functions are evaluating if the field is true,left blank, or if it does not fulfill the necessary requirements

function validCreditNumber (credit) {
  let creditTest = /^\d{13,16}$/.test(credit);
  if (creditTest) {
    $('#credit-span').hide();
    $('#credit-length').hide();
    return true;
  } else if (credit === "") {
      $('#credit-span').show();
      $('#credit-length').hide();
      return false;
  } else {
    $('#credit-span').hide();
    $('#credit-length').show();
    return false;
  }
}

function validZip (zip) {
  let zipTest = /^\d{5}$/.test(zip);
  if (zipTest) {
    $('#zip-length').hide();
    $('#zip-span').hide();
    return true;
  } else if (zip === ""){
    $('#zip-span').show();
    $('#zip-length').hide();
    return false;
  } else {
    $('#zip-span').hide();
    $('#zip-length').show();
    return false;
  }
}

function validCvv (cvv) {
  let cvvTest = /^\d{3}$/.test(cvv);
  if (cvvTest) {
    $('#cvv-span').hide();
    $('#cvv-length').hide();
    return true;
  } else if (cvv === "") {
    $('#cvv-span').show();
    $('#cvv-length').hide();
    return false;
  } else {
    $('#cvv-span').hide();
    $('#cvv-length').show();
    return false;
  }
}

/************************************
Validation Function Event Listeners
************************************/
//Most error messages are set to when the input field loses focus

$nameInput.on('blur', function(event) {
  validName(event.target.value);
});

$emailInput.on('keypress blur', function(event) {
  validEmail(event.target.value);
});

$oneActivity.on('mouseleave', function(event) {
  validActivity(event.target.value);
});

if ($('#payment').val() === "credit card") {
  $creditNumber.on('keyup blur', function(event){
    validCreditNumber(event.target.value);
  });
  $creditZip.on('keyup blur', function(event){
    validZip(event.target.value);
  });
  $cvvCode.on('keyup blur', function(event){
    validCvv(event.target.value);
  });
}



/*
Master Validation function to be evaluated on form submission
It checks the first 3 validations, then evaluates the credit card evaluations if that is the option selected.
All the validations are combined into an array and if that array includes a false value then the masterValidator will return false.
*/
function masterValidator () {
  let validArray = [
  validName($nameInput.val()),
  validEmail($emailInput.val()),
  validActivity($oneActivity.val())]
  let creditArray = [
  validCreditNumber($creditNumber.val()),
  validZip($creditZip.val()),
  validCvv($cvvCode.val())];
  if ($('#payment').val() === "credit card") {
    Array.prototype.push.apply(validArray, creditArray);
    console.log("needs validation");
  }
  if (validArray.includes(false)) {
    return false;
  } else {
    return true;
  }
}

/*
Final form submit:
When the submit button is pressed, masterValidator must resolve to true, otherwise the form will not submit and the error messages are displayed
*/
$('form').submit(function(event){
  if (!masterValidator()) {
    console.log("fail");
    event.preventDefault();
  } else {
    console.log("success");
  }
});
