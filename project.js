hideElement("warningBackground");
hideElement("warningText");
hideElement("closeNoticeAction");

var currentUser = {
  first: "",
  last: "",
  username: "",
  domain: "",
  month: ""
};

var todayButtonX = 17;
var todayButtonY = 80;

var eventCounter = 0;
var eventList = [];

var color = "";

var currentDate = new Date();

onEvent("continuePush", "click", function() {
  currentUser.first = getText("firstNameInput");
  currentUser.last = getText("lastNameInput");
  currentUser.username = getText("usernameInput");
  if (getText("usernameInput") == "") {
    showElement("warningBackground");
    showElement("warningText");
    showElement("closeNoticeAction");
    return;
  }
  for (var i = 0; i < currentUser.username.length; i++) {
    if (currentUser.username[i] == " " || currentUser.username[i] == "@") {
      showElement("warningBackground");
      showElement("warningText");
      showElement("closeNoticeAction");
      return;
    }
  }
  currentUser.domain = getText("domainSelector");
  setScreen("todayScreen");
  todaySetup();
});

onEvent("useWithoutPush", "click", function() {
  setScreen("todayScreen");
  todaySetup();
});

onEvent("closeNoticeAction", "click", function() {
  hideElement("warningBackground");
  hideElement("warningText");
  hideElement("closeNoticeAction");
});

onEvent("createEventInit", "click", function() {
  setScreen("createEventSheet");
  setText("eventTitieInput", "");
  setText("locationInput", "");
  setText("dayTypeSelector", "All-day");
  hideElement("fromSelector");
  hideElement("toSelector");
});

onEvent("dayTypeSelector", "change", function() {
  if (getText("dayTypeSelector") == "Specific range") {
    showElement("fromSelector");
    showElement("toSelector");
  } else {
    hideElement("fromSelector");
    hideElement("toSelector");
  }
});

onEvent("todaySortSelector", "change", function() {
  sortEvents(getText("todaySortSelector"));
});

onEvent("createEventSubmit", "click", function() {
  var newEvent = {
    counter: 0,
    title: "",
    place: "",
    color: "",
    allDay: true,
    fromTime: 0,
    toTime: 0
  };
  
  newEvent.title = getText("eventTitieInput");
  newEvent.place = getText("locationInput");
  newEvent.color = color;
  if (getText("dayTypeSelector") == "Specific range") {
    newEvent.allDay = false;
    newEvent.fromTime = getText("fromSelector");
    newEvent.toTime = getText("toSelector");
  } else {
    newEvent.allDay = true;
    newEvent.fromTime = "All-day";
    newEvent.toTime = "";
  }
  setScreen("todayScreen");
  displayEvent(newEvent);
  console.log(newEvent);
  appendItem(eventList, newEvent);
});

onEvent("red", "click", function() {
  color = "#e86866";
});
onEvent("orange", "click", function() {
  color = "#e88000";
});
onEvent("yellow", "click", function() {
  color = "#efe747";
});
onEvent("green", "click", function() {
  color = "#67c949";
});
onEvent("blue", "click", function() {
  color = "#68b1f5";
});
onEvent("pink", "click", function() {
  color = "#dc66f7";
});

onEvent("tasksIcon", "click", function() {
  setScreen("tasksScreen");
});
onEvent("todayIcon2", "click", function() {
  setScreen("todayScreen");
});

function todaySetup() {
  setText("dateLabel", currentDate.getDate());
  setText("monthLabel", monthString());
}

function monthString() {
  switch(currentDate.getMonth()) {
    case 0:
      currentUser.month = "January";
      return currentUser.month;
    case 1:
      currentUser.month = "February";
      return currentUser.month;
    case 2:
      currentUser.month = "March";
      return currentUser.month;
    case 3:
      currentUser.month = "April";
      return currentUser.month;
    case 4:
      currentUser.month = "May";
      return currentUser.month;
    case 5:
      currentUser.month = "June";
      return currentUser.month;
    case 6:
      currentUser.month = "July";
      return currentUser.month;
    case 7:
      currentUser.month = "August";
      return currentUser.month;
    case 8:
      currentUser.month = "September";
      return currentUser.month;
    case 9:
      currentUser.month = "October";
      return currentUser.month;
    case 10:
      currentUser.month = "November";
      return currentUser.month;
    case 11:
      currentUser.month = "December";
      return currentUser.month;
  }
}

function displayEvent(object) {
  object.counter = eventCounter;
  console.log(eventCounter);
  
  button("event"+eventCounter, "");
  setProperty("event"+eventCounter, "background-color", object.color);
  setProperty("event"+eventCounter, "border-width", 0);
  setPosition("event"+eventCounter, todayButtonX, todayButtonY, 14, 14);
  setProperty("event"+eventCounter, "border-radius", 20);
  setProperty("event"+eventCounter, "text-color", object.color);
  
  textLabel("eventLabel"+eventCounter, object.title);
  setProperty("eventLabel"+eventCounter, "font-family", "Lucida Sans");
  setPosition("eventLabel"+eventCounter, todayButtonX+22, todayButtonY-7);
  setProperty("eventLabel"+eventCounter, "font-size", 18);
  
  if (object.toTime == "") {
    textLabel("timeLabel"+eventCounter, object.fromTime + " • " + object.place);
  } else {
    textLabel("timeLabel"+eventCounter, object.fromTime + "-" + object.toTime + " • " + object.place);
  }
  setProperty("timeLabel"+eventCounter, "font-family", "Lucida Sans");
  setPosition("timeLabel"+eventCounter, todayButtonX+22, todayButtonY+20);
  setProperty("timeLabel"+eventCounter, "font-size", 12);
  
  if (todayButtonY < 300) {
    todayButtonY += 50;
  }
  eventCounter += 1;
}

function sortEvents(sortType) {
  todayButtonY = 80;
  for (var z = 0; z < eventList.length; z++) {
    console.log(z);
    console.log(eventList[z].counter);
    hideElement("event"+eventList[z].counter);
    hideElement("eventLabel"+eventList[z].counter);
    hideElement("timeLabel"+eventList[z].counter);
  }
  for (var q = 0; q < eventList.length; q++) {
    if (sortType == "Show all") {
      displayEvent(eventList[q]);
    }
    if (sortType == "All-day") {
      if (eventList[q].allDay == true) {
        displayEvent(eventList[q]);
      }
    }
  }
}






