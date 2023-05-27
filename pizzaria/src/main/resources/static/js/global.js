function displayTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    
    var meridiem = "AM";  // Default to AM
    
    // Convert from 24 hour to 12 hour format
    if (hours > 12) {
      hours = hours - 12;
      meridiem = "PM";
    }
    
    // Add leading zeros if necessary
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    
    // Display the time
    var clockDiv = document.getElementById("clock");
    clockDiv.textContent = hours + ":" + minutes + ":" + seconds + "|Período" + meridiem ;
  }

   
  // Update the clock every second
  setInterval(displayTime, 1000);
      