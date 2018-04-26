
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB2TsF4Giyg9uRm7JWJ3CqnI7FHKhx7bKo",
    authDomain: "trainproject-3a877.firebaseapp.com",
    databaseURL: "https://trainproject-3a877.firebaseio.com",
    projectId: "trainproject-3a877",
    storageBucket: "trainproject-3a877.appspot.com",
    messagingSenderId: "906752244706"
  };
  firebase.initializeApp(config);


var database = firebase.database();

$(document).ready(function(){


    


$(".addButton").on("click", function(){
  $(".formContainer").css("display","block");
  $(".buttonContainer").css("display","none");
});

$(".close").on("click", function(){
  $(".formContainer").css("display","none");
  $(".buttonContainer").css("display","block");
});


    
 $(".subBtn").on("click", function(e) {

      e.preventDefault();

      $(".error1").html("&nbsp;");
      $(".error2").html("&nbsp;");
      $(".error3").html("&nbsp;");
      $(".error4").html("&nbsp;");

      var trainName = $("#trainName").val().trim();
      var dest = $("#dest").val().trim();
      var freq = $("#freq").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var convertedTime=moment(firstTrain,"hh:mm").subtract(1,"years");
      console.log(freq);
      console.log(isNaN(freq));
      console.log(convertedTime);

      var testmode=true;

      if (trainName===""){
        $(".error1").text("Required Field");
        return;
      }

      else if (dest===""){
        $(".error2").text("Required Field");
        return;
      }

      else if (isNaN(freq)===true||freq===0){
        $(".error3").text("Frequency must be a Valid Number");
        return;
      }

      else if(convertedTime._isValid===false){
        $(".error4").text("Invalid Format");
      }

      // else if (testmode===true){
      //   console.log("stop here")
      // }

      else{


      database.ref().push({
        trainName: trainName,
        dest: dest,
        freq: freq,
        firstTrain: firstTrain
      })

    $("#trainName").val("");
    $("#dest").val("");
    $("#freq").val("");
    $("#firstTrain").val("");
  }

});


database.ref().on("child_added", function(childSnapshot) {

  var trainName = childSnapshot.val().trainName;
  var dest = childSnapshot.val().dest;
  var freq = childSnapshot.val().freq;
  var firstTrain = childSnapshot.val().firstTrain;

  //time convverstions
  var convertedTime2=moment(firstTrain,"HH:mm").subtract(1,"years");
  var diffTime=moment().diff(moment(convertedTime2),"minutes");
  var remainder=diffTime%freq;

  var minutesLeft=freq-remainder;

  var nextTrain=moment().add(minutesLeft, "minutes").format("HH:mm");

    if(nextTrain<moment().subtract(1,"years").format("HH:mm"))
      nextTrain="None Today";

    

  $("#theTable > tbody").append("<tr><td>" + trainName+ "</td><td>" + dest + "</td><td>" +
  freq + "</td><td>" + nextTrain + "</td><td class='min'>" + minutesLeft + "</td></tr>");

// console.log("Test");

}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


// setTimeout(function(){
//   $('#theTable').load(location.href+" #theTable>*","");
// },60000);
});



