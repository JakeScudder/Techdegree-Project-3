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
