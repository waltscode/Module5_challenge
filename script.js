// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const dayJsObject = dayjs();

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


$(".saveBtn").on("click",function () {
  var blockId = $(this).parent().attr('id');
  var userInput = $(this).siblings(".description").val();

console.log("Block ID:", blockId)
console.log("User Input:", userInput)

  localStorage.setItem(blockId, userInput);
});


function populateLocalStorage() {
  $(".time-block textarea").each(function () {
    var blockId = $(this).parent().attr("id");
    var storedValue = localStorage.getItem(blockId);

    if (storedValue !== null) {
      $(this).val(storedValue);
    }
  });
}

populateLocalStorage();

$("#currentDay").text(dayJsObject.format('dddd, MMMM D, YYYY h:mm A'));

// Function to update the time-block classes based on the current hour
function updateTimeBlocks() {
  console.log();
  $(".time-block").each(function () {
    // Get the hour from the time-block's id
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Compare the block's hour with the current hour and add the appropriate class
    if (blockHour < dayJsObject.hour()) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}

// Call the function to initially set the time-block classes
updateTimeBlocks();

// Add an interval to update the classes every hour
setInterval(function () {
  if (dayJsObject.hour() !== currentHour) {
    currentHour = dayJsObject.hour();
    updateTimeBlocks();
  }
}, 60 * 60 * 1000); // Update only when the hour changes
