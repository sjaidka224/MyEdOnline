function displayAllStudents () {

console.log ("In HERE");
  $.get('/getStudents', function(result) {
    console.log ("backendInteraction + uploadDataToDb ", result);
    alert ("We will contact you shortly on ");
  })

}
