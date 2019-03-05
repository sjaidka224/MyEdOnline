window.studentMarks = [];

function displayAllStudents () {

  $.get('/getStudents', function(result) {

    var table = document.getElementById("display-student-info-table");

    for (var i = 0; i < result.length; i ++) {

      console.log (result[i].fullname);

      var cell = table.insertRow (i);
      var cell1 = cell.insertCell(0);
      cell1.innerHTML = result[i].fullname;

      var nestedTable = document.getElementById("display-student");

      for (var j = 0; j < studentMarks.length; j++) {

        if (result[i].id == studentMarks[j].user_id) {

          for (var k = 0; k < studentMarks[j].quest_paths.length; k++) {

            var questName = studentMarks[j].quest_paths[k].quest.name;
            var questMarks = studentMarks[j].quest_paths[k].mark.mark;

            var newCell = nestedTable.insertRow (k);
            var newCell1 = newCell.insertCell(0);
            var newCell2 = newCell.insertCell(1);
            newCell1.innerHTML = questName;
            newCell2.innerHTML = questMarks;

          }

          break;
        }
      }

    }

  })

}


function getStudentMarks() {

  $.get('/getStudentData', function(result) {
    studentMarks = result;

    displayAllStudents ();

  });

}
