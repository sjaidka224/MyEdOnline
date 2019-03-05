window.studentMarks = [];

function displayAllStudents () {

  $.get('/getStudents', function(result) {

    var table = document.getElementById("display-student-info-table");

    for (var i = 0; i < result.length; i ++) {

      console.log (result[i].fullname);

      var cell = table.insertRow (i);
      var cell1 = cell.insertCell(0);
      cell1.innerHTML = result[i].fullname;

      var cell2 = cell.insertCell(1);

      var nestedTable = document.getElementById("display-student");
      var newTable = "<table style='width: 100%'>";
      newTable += "<thead><tr><th>Quest</th><th>Prorgress</th><th>Marks</th>"
      for (var j = 0; j < studentMarks.length; j++) {

        if (result[i].id == studentMarks[j].user_id) {

          for (var k = 0; k < studentMarks[j].quest_paths.length; k++) {

            var questName = studentMarks[j].quest_paths[k].quest.name;
            let quesMarkText = 'N/A';
            if (studentMarks[j].quest_paths[k].mark.mark) {
                quesMarkText = studentMarks[j].quest_paths[k].mark.mark;
            }
            let completionRate = 0;
            if (studentMarks[j].quest_paths[k].mark.completion) {
                completionRate = studentMarks[j].quest_paths[k].mark.completion + "%";
            }
              newTable += "<tr><td>"+questName+"</td><td>"+completionRate+"</td><td>"+quesMarkText+"</td></tr>";

          }

          break;
        }
      }
        newTable += "</table>"
        cell2.innerHTML = newTable;

    }

  })

}


function getStudentMarks() {

  $.get('/getStudentData', function(result) {
    studentMarks = result;

    displayAllStudents ();

  });

}
