$(function () {
  // Function to display the current date and time in the header of the page
  function updateCurrentTime() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    var currentTime = dayjs().format("h:mm A");
    $("#currentDay").text(currentDate + " | " + currentTime);
  }

  // Save button click event listener
  $(".saveBtn").on("click", function () {
    var hourId = $(this).parent().attr("id"); // Get the id of the parent time-block
    var description = $(this).siblings(".description").val(); // Get the value of the textarea
    localStorage.setItem(hourId, description); // Save the description in local storage
  });

  // Function to update the time-block classes based on the current hour
  function updateTimeBlocks() {
    var currentHour = dayjs().hour(); // Get the current hour in 24-hour format

    // Iterate over each time-block
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]); // Get the hour from the id

      // Remove any existing classes from the time-block
      $(this).removeClass("past present future");

      // Add the appropriate class based on the comparison between blockHour and currentHour
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Function to retrieve saved events from local storage and update the textarea values
  function loadEvents() {
    $(".time-block").each(function () {
      var hourId = $(this).attr("id");
      var description = localStorage.getItem(hourId);
      $(this).find(".description").val(description);
    });
  }

  function generateTimeBlocks() {
    var startHour = 9;
    var endHour = 17; // 5PM in 24-hour format

    // Container to store the generated time blocks
    var timeBlocksHTML = '';

    // Loop to create the time blocks
    for (var hour = startHour; hour <= endHour; hour++) {
      var timeBlockHTML = `
        <div id="hour-${hour}" class="row time-block">
          <div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(hour).format("hA")}</div>
          <textarea class="col-8 col-md-10 description" rows="3"></textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>
      `;
      timeBlocksHTML += timeBlockHTML;
    }

    $("#timeBlocks").append(timeBlocksHTML);
  }

  // Update the time-block classes and display the current time initially
  updateTimeBlocks();
  updateCurrentTime();

  // Continuously update the current time every second
  setInterval(updateTimeBlocks, 1000);

  // Load saved events from local storage on page load
  loadEvents();

  generateTimeBlocks();
});