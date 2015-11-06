	var delay = 1;
	var vMultiplier = 0.01;
	var clearToSend = 0;
	var msExpDelay = 1000; //message expiration
	var msDelay = 100; //delay after message received call back
	var timeToLive = 2000; //time tilt messages will live
	var lrtiltThreshold = 10;
	var udtiltThreshold = 10;
	var lrxtiltThreshold = 0.8; //for acceleration including gravity
	var udxtiltThreshold = 0.8; //for acceleration including gravity
	var messageCount = 0;

	var motionState = "0&0&0&0";
	lastMsg = "";
	var USE_SPEED		= 1;
	LOGBUFFERSIZE		= 2;
	var logBuffer = new Array();
	for (tempn=0;tempn<=LOGBUFFERSIZE-1;tempn++) {
		logBuffer[tempn] = "";
	}


init = function() {
	log("pin="+pin+" Initializing "+pin);
	window.ondeviceorientation = deviceOrientationHandler;
	clearToSend = 1;
};

var deviceOrientationHandler = function(event) {
	talpha = event.alpha;
	tbeta = event.beta;
	tgamma = event.gamma;

  if (tgamma > lrtiltThreshold){
  	Left = 0;
  	// Right = tgamma/90;
  	Right = 1;
  }
  else if (tgamma < -lrtiltThreshold) {
  	// Left = Math.abs(tgamma)/90;
  	Left = 1;
  	Right = 0;
  }
  else {
 		Left = 0;
  	Right = 0;
  }

  if (tbeta > udtiltThreshold){
  	Up = 0;
  	// Down = tbeta/90;
  	Down = 1;
  }
  else if (tbeta < -udtiltThreshold) {
   	// Up = Math.abs(tbeta)/90;
  	Up = 1;
  	Down = 0;
  }
  else {
  	Up = 0;
  	Down = 0;
  }

  var NewmotionState = Left+"&"+Up+"&"+Right+"&"+Down;

	if (NewmotionState != motionState )
	{
		broadcast ({message: NewmotionState});
	}
};

function log(logMsg) {
	var elem = document.getElementById("log");
	var tempLogBuffer="";
	logBuffer[0] = logBuffer[1]; //DISCARD THE FIRST LINE
	var n = 0;
	for (n=1;n<=LOGBUFFERSIZE-2;n++) {
		tempLogBuffer = tempLogBuffer+"\n"+logBuffer[n];
		logBuffer[n] = logBuffer[n+1];
	}
	logBuffer[LOGBUFFERSIZE-1] = logMsg;
	elem.innerHTML=tempLogBuffer+"\n"+logMsg;
	console.log(tempLogBuffer+"\n"+logMsg);
}

function logStatus(statusMsg) {
	$("#statusMsg").text(statusMsg);
}

function logMsg(leftright, updown) {
    var beta = Math.round(leftright);
    var gamma = Math.round(updown);
//    data.alpha = Math.round(event.alpha);
    /* jQuery mobile cannot handle negative minimum values so use zero based value on sliders.      */
    $("#beta").val(beta * 1 + 180).trigger("keyup");
    $("#gamma").val(gamma * 1 + 90).trigger("keyup");
}
