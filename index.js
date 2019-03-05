'use strict';

//Require Hapi
const Hapi = require ('hapi');

//Create new Hapi server object with a host and a port number to listen on
const server = Hapi.server ({

  port: 3000,
  host: 'localhost'

});

server.route({
    method: 'GET',
    path: '/getStudents',
    handler: (request, reply) => {

      var fs = require("fs");
      console.log("\n *STARTING* \n");

      var contents = fs.readFileSync("./Data-Files/users.json");

      var jsonContent = JSON.parse(contents);

      console.log("User Name:", jsonContent);


      return 'Hello, world!';

    }
});

server.route({
    method: 'GET',
    path: '/getStudentData',
    handler: (request, reply) => {

      var fs = require("fs");
      console.log("\n *STARTING* \n");

      var contents = fs.readFileSync("./Data-Files/quest_pathways.json");

      var jsonContent = JSON.parse(contents);

      console.log("User Name:", jsonContent);


      return jsonContent;

    }
});




const init = async () => {

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);

}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
