
 
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

var buttonState="hidden";


$(".addButton").on("click", function(){
  if(buttonState==="hidden"){
  $(".formContainer").css("display","block");
  buttonState="active";
  }

  else{
    $(".formContainer").css("display","none");
  buttonState="hidden";
  }
});

     // $("#formValidate").validate({
     //    rules: {
     //        trainName: {
     //            required: true
     //        },
     //        dest: {
     //            required: true
     //        },
     //        firstTrain: {
     //            required: true
     //        },
     //        freq: {
     //            required: true
     //        },

     //    },

     //    errorElement : 'div',
     //    errorPlacement: function(error, element) {
     //      var placement = $(element).data('error');
     //      if (placement) {
     //        $(placement).append(error)
     //      } else {
     //        error.insertAfter(element);
     //      }
     //    }
     // });

//      $('#firstTrain').formatter({
//           'pattern': '{{99}}:{{99}}',
// });

    
 $(".subBtn").on("click", function(e) {

      e.preventDefault();

      console.log("i clicked");

      var trainName = $("#trainName").val().trim();
      var dest = $("#dest").val().trim();
      var freq = $("#freq").val().trim();
      var firstTrain = $("#firstTrain").val().trim();



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

});


database.ref().on("child_added", function(childSnapshot) {

  var trainName = childSnapshot.val().trainName;
  var dest = childSnapshot.val().dest;
  var freq = childSnapshot.val().freq;
  var firstTrain = childSnapshot.val().firstTrain;

  //time convverstions
  var convertedTime=moment(firstTrain,"hh:mm").subtract(1,"years");
  var diffTime=moment().diff(moment(convertedTime),"minutes");
  var remainder=diffTime%freq;

  var minutesLeft=freq-remainder;
  var nextTrain=moment().add(minutesLeft, "minutes").format("hh:mm");


  $("#theTable > tbody").append("<tr><td>" + trainName+ "</td><td>" + dest + "</td><td>" +
  freq + "</td><td>" + nextTrain + "</td><td>" + minutesLeft + "</td></tr>");



}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



