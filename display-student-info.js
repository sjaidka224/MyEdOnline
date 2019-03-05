window.studentMarks = [];
window.dataForGraph = [['Names', 'Curiosity - The Space Rover', 'The 4 Hour Work Week', 'Lets Learn about Economics']];

function displayAllStudents () {
  console.log ("1");
  $.get('/getStudents', function(result) {

    var table = document.getElementById("display-student-info-table");
    var graphArray = [];
    for (var i = 0; i < result.length; i ++) {

      var cell = table.insertRow (i);
      var cell1 = cell.insertCell(0);
      cell1.innerHTML = result[i].fullname;
      graphArray.push(result[i].fullname);

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
            if (questMarks  == null) {
              graphArray.push(0);
            } else {
              graphArray.push(questMarks);
            }


          }
          if (graphArray.length  >= 4) {
            dataForGraph.push(graphArray);
          } else {
            graphArray.push(0);
            dataForGraph.push(graphArray);
          }

          graphArray = [];
          break;
        }
      }

    }
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

  })

}


function getStudentMarks() {

  $.get('/getStudentData', function(result) {
    studentMarks = result;

    displayAllStudents ();

  });

}

function drawChart () {
  google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        data = google.visualization.arrayToDataTable([
          ['Names', 'Curiosity - The Space Rover', 'The 4 Hour Work Week', 'Lets Learn about Economics'],
          ["Ryan Grey", 100, 0, 10],
          ["Jacqueline Myers", 0, 0, 0],
          ["Henry Bloggs", 15, 0, 0],
          ["Michael McManns", 80, 0, 0],
          ["Vanessa Riley", 100, 0, 65]
        ]);

        var options = {
          chart: {
            title: 'Students Data',
            subtitle: '',
          },
          bars: 'vartical', // Required for Material Bar Charts.
          hAxis: {format: 'decimal'},
          height: 300,
          colors: ['#1b9e77', '#d95f02', '#7570b3']
        };

        var chart = new google.charts.Bar(document.getElementById('chart_div'));

        chart.draw(data, google.charts.Bar.convertOptions(options));

      }
}
