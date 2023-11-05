// declaring the time variable - dayjs() is being used to take the info from the API src=cdn.jsdelivr.net/npm/dayjs@1.11.3/dayjs.m`
// we want the CONST(ant) variable to be the time in dayjs()
// we want the CURRENTHOUR variable to have the ability to change making it a LET variable
// CONST variable is being checked against ever-changing LET variable
const dayJsObject = dayjs();
let currentHour = dayJsObject.hour();

console.log(dayJsObject.format('D/M/YYYY h:mm A'));



$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


// Give FUNCTION to the SAVE BUTTON - CLICKING SAVE will take THE BLOCK and the INFO that was entered 
// SAVING it on the specific block will ensure that the info will repopulate int he correct space

$(".saveBtn").on("click", function () {
  var blockId = $(this).parent().attr('id');
  var userInput = $(this).siblings(".description").val();
  // console logging to test what happens - checking if it works 
  console.log("Block ID:", blockId)
  console.log("User Input:", userInput)

  localStorage.setItem(blockId, userInput);
});

// ABOVE ^ ONLY saves the info into the storage - it does not make it show up when the page is refreshed 
// this function is being used to PULL THAT INFO THATS STORED and show it
// also the IF statement is used so if there is NOTHING THERE it will remain empty
function populateLocalStorage() {
  $(".time-block textarea").each(function () {
    var blockId = $(this).parent().attr("id");
    var storedValue = localStorage.getItem(blockId);

    if (storedValue !== null) {
      $(this).val(storedValue);
    }
  });
}

// without telling the computer to RUN the function- the info doesn't get recalled
populateLocalStorage();


// jQuery function to take the ID 'current day' and make the text reflect the info being converted from the API - so its not just 0213165441869541305641
// ID 'currentday' is in the Header
$("#currentDay").text(dayJsObject.format('dddd, MMMM D, YYYY h:mm A'));



// Function to update the time-block classes based on the current hour - the hour assigned in the ID is exemplified by 'hour-___' - it then gets matched up to dayJsObject
function updateTimeBlocks() {
  console.log();
  $(".time-block").each(function () {
    // Get the hour from the time-block's id
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Compare the block's hour with the current hour and add the appropriate class - we want to REMOVE the current class on the block and then APPLY the proper one i.e correct COLOR
    if (blockHour < dayJsObject.hour()) {
      // if the block has PRESENT or FUTURE class - REMOVE IT and then ADD Past
      // else statements will continue in same format
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}

// when the page Initializes APPLY THE CORRECT time-block classes/colors
updateTimeBlocks();

// Add an interval to update the classes every hour - page needs to update according to what hour is present
// Checks if the current hour obtained from dayJsObject is not equal to the stored value in the currentHour variable.
// If the current hour has changed, it updates the currentHour variable with the new hour from dayJsObject: currentHour = dayJsObject.hour();.
// then run updateTimeBlocks accordingly
setInterval(function () {
  if (dayJsObject.hour() !== currentHour) {
    currentHour = dayJsObject.hour();
    updateTimeBlocks();
  }
}, 10 * 60 * 1000);
// Update only when the hour changes -
// 60 seconds in a minute: 60 * 1000 milliseconds
// 60 minutes in an hour: 60 * (60 * 1000) milliseconds
// SINCE WE WANT IT TO CHECK every 10 mins we change it to 10 * 60 * 1000
