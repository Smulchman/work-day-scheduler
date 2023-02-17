// Wrapped all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // Added a listener for click events on the save button. This code uses
  // the id in the containing time-block as a key to save the user input in
  // local storage.
  //
  var saveBtns = document.querySelectorAll(".saveBtn");

  $(saveBtns).each(function(){
    $(this).on('click', function(){
      localStorage.setItem($(this).parent().attr('id'), 
      ($(this).siblings("textarea").val())
      )
    })
  });

  // Code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  // NOTE: I removed the existing past, present, and future classes from all elements to prevent a color stutter on initialization
  // However, I am leaving the remove class functionality in case the team wants to set a default
  // NOTE: the purpose of the 'replace' method is to remove the 'hour-' that starts every id attached to a text entry area.
  // I alternatively could have simple modified the id names for each in the html itself, but I prefered this method.
  // 
var timeSlots = document.querySelectorAll(".time-block");
$(timeSlots).each(function(){
  var slot = $(this).attr('id').replace(/hour-/, '');
  var dt = new Date();
  var hourNow = dt.getHours();
  if (slot < hourNow){
    $(this).removeClass("present");
    $(this).removeClass("future");
    $(this).addClass("past");
  }
  else if (slot == hourNow){
    $(this).removeClass("past");
    $(this).removeClass("future");
    $(this).addClass("present");
  }
  else if (slot > hourNow){
    $(this).removeClass("past");
    $(this).removeClass("present");
    $(this).addClass("future");
  }
})

  // Added code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  //
  var savedEvents = document.querySelectorAll(".description");

  $(savedEvents).each(function(){
    var tempSaved = localStorage.getItem($(this).parent().attr('id'));
    $(this).text(tempSaved);
  });

  // Added code to display the current date in the header of the page.
  // NOTE: I'm certain theres a way to do this without these variables, but this was the way that seemed the most readable.

  var today = dayjs();
  var dayWeek = today.format('dddd');
  //  display the date in the format of 'Monday, december 14th'
$("#currentDay").text(dayWeek + ', ' + today.format('MMMM D'));
});
