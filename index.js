'use strict';

//Require Hapi
const Hapi = require ('hapi');
const Path = require('path');

//Create new Hapi server object with a host and a port number to listen on
const server = Hapi.server ({

  port: 3000,
  host: 'localhost'

});



server.route({
  method: 'GET',
  path: '/getStudents',
  handler: (request, reply) => {

    return parseDataFromAFile("./Data-Files/users.json");

  }
});

server.route({
  method: 'GET',
  path: '/getStudentData',
  handler: (request, reply) => {

    return parseDataFromAFile("./Data-Files/quest_pathways.json");

  }
});


function parseDataFromAFile (filePath) {

  var fs = require("fs");
  var contents = fs.readFileSync(filePath);
  var jsonContent = JSON.parse(contents);
  return jsonContent;

}


const init = async () => {

  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

      return h.file('index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/display-student-info.js',
    handler: (request, h) => {

      return h.file('display-student-info.js');
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

}

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
