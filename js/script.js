/*********************************

TechDegree Project 3 - Interactive form
Javascript file mostly implemented using jQuery

**********************************/

/*
Web page loads with focus on the Name input field
Initially hides:
  Other Job Role Text Field
  Colors Select Options
*/
$(document).ready(function() {
  $('#name').focus();
  $('#other-title').hide();
  $('#colors-js-puns').hide();
  $("#paypalDiv").hide();
  $("#bitcoinDiv").hide();
});

/*Javascript to show other Job Role text input when selected, or rehide it if it is de-selected.
Code adapted from https://stackoverflow.com/questions/15566999/how-to-show-form-input-fields-based-on-select-value
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
Highlight T-shirt color options based on which T-shirt style is selected.
Code adapted from:
https://www.websparrow.org/web/add-and-remove-options-in-select-using-jquery

*/
$('#design').on('change', function(event){
  $('#colors-js-puns').show();
  if ($(this).val() === "js puns" ) {
    $("#colors-js-puns option[value='cornflowerblue']").show();
    $("#colors-js-puns option[value='darkslategrey']").show();
    $("#colors-js-puns option[value='gold']").show();
    $("#colors-js-puns option[value='tomato']").hide();
    $("#colors-js-puns option[value='steelblue']").hide();
    $("#colors-js-puns option[value='dimgrey']").hide();
  }
  if ($(this).val() === "heart js" ) {
    $("#colors-js-puns option[value='tomato']").show();
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
    Retrieve the day and time of the checked checkedActivityTime
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

$("#payment option[value='select method']").hide();


$('#payment').on('change', function(event) {
  if ($(this).val() === "select method") {
    $("#credit-card").show();
    $("#paypalDiv").hide();
    $("#bitcoinDiv").hide();
  }
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

const nameInput = $('#name');
$(nameInput).after('<span id="nameSpan" class="tooltip">Please Type Your Name</span>');
$('#nameSpan').hide();


const emailInput = $('#mail');
$(emailInput).after('<span id="emailSpan" class="tooltip">Please Type A Valid Email</span>');
$('#emailSpan').hide();


const oneActivity = $('.activities');
$('.register').after('<span id="activity-span">Please Check At Least One Box</span>');
$('#activity-span').hide();


const creditNumber = $('#cc-num');
$(creditNumber).after('<span id="credit-span">Credit Card Number Cannot Be Blank</span>');
$(creditNumber).after('<span id="credit-length">Credit Card Number Must Be 13-16 Digits Long</span>');
$('#credit-span').hide();
$('#credit-length').hide();


const creditZip = $('#zip');
$(creditZip).after('<span id="zip-span">Zip Code Cannot Be Blank</span>');
$(creditZip).after('<span id="zip-length">Zip Code Must Be 5 Digits</span>');
$('#zip-span').hide();
$('#zip-length').hide();


const cvvCode = $('#cvv');
$(cvvCode).after('<span id="cvv-span">CVV Code Must Be 3 Digits</span>');
$(cvvCode).after('<span id="cvv-length">CVV Code Must Be 3 Digits</span>');
$('#cvv-span').hide();
$('#cvv-length').hide();

/*
Validation functions
*/
function validName (username) {
  return /\S+/.test(username);
}

function validEmail (email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function validActivity (activity) {
  $('.activities').click(function(event){
    if ($('.activities input').is(':checked')) {
      return activity;
    }
  });
}

function validCreditNumber (credit) {
  return /^\d{13,16}$/.test(credit);
}

function validZip (zip) {
  return /^\d{5}$/.test(zip);
}

function validCvv (cvv) {
  return /^\d{3}$/.test(cvv);
}

//Function to show tooltips if needed
//Then hide them if they are correct

function errorMessage() {
  if (!validName()) {
    $('#nameSpan').show();
  } else {
    $('#nameSpan').hide();
  }
  if (!validEmail()) {
    $('#emailSpan').show();
  } else {
    $('#emailSpan').hide();
  }
  if (!validActivity()) {
    $('#activity-span').show();
  } else {
    $('#activity-span').hide();
  }

  if (!validCreditNumber()) {
    $('#credit-length-span').show();
  } else {
    $('#credit-length-span').hide();
  }
  if (!validZip()) {
    $('#zip-length-span').show();
  } else {
    $('#zip-length-span').hide();
  }
  if (!validCvv()) {
    $('#cvv-length-span').show();
  } else
    $('#cvv-length-span').hide();
}

//Non-working event listener to show Tooltip
$('form').on('input', function(event){
  errorMessage(event);
  console.log(event);
});

//Non-working validation function for form submission
function masterValidator () {
  validName();
  validEmail();
  validActivity();
  $('#payment').on('change', function(event) {
    if ($(this).val() === "credit card") {
        validCreditNumber();
        validZip();
        validCvv();
    } else {
      return;
    }
  });
}

$('form').submit(function(event){
  if (masterValidator()) {
    return;
  } else {
    event.preventDefault();
  }
});
