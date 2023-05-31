const request = require('supertest');
const app = require('../backend/server');
// const partitionGraph = require('../client/components/main-pages/PartitionGraph');

// const { createServer } = require('http');
// const { Server } = require('socket.io');
// const Client = require('socket.io-client');

//function to generate random topic name
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

//testing different route integrations
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      test('responds with a 200 status and text/html content type', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toEqual(200);
      });
    });
  });

  describe('/getCluster', () => {
    let response;
    beforeEach(async () => {
      response = await request(app).post('/getCluster').send({
        clientId: 'myapp',
        port: 9092,
        hostName: 'Matt-XPS',
      });
    });

    test('responds with a 201 status and application/json content type', async () => {
      expect(response.statusCode).toEqual(201);
    });
  });

  describe('/createCluster', () => {
    let response;
    let topic = generateString(6);
    beforeEach(async () => {
      response = await request(app).post('/getCluster').send({
        clientId: 'myapp',
        port: 9092,
        hostName: 'Matt-XPS',
        topic: topic,
        partitionNum: 5,
      });
    });

    test('a new cluster is created with a 201 status code', async () => {
      expect(response.statusCode).toEqual(201);
    });
  });
});

describe('GraphQL', () => {
  let topicNames = JSON.stringify({
    data: {
      topics: [
        { name: 'testTopic' },
        { name: 'TestTopic' },
        { name: '__consumer_offsets' },
      ],
    },
  });
  test('Fetch topics', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
        query { 
          topics(clientId:"myapp", hostName:"Matt-XPS", port:9092) {
            name,
          }
        }
      `,
      });

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(topicNames);
  });
});

// describe('Creates and deletes a topic', async () => {
//   let groupId, consumer, admin
//   let topic = generateString(6);
//   beforeEach(() => {})

//   test('creates a topic and return the list of updated topics', async() => {
//     response = await request(app).post('/createTopic').send({
//       clientId: 'myapp',
//       port: 9092,
//       hostName: 'Matt-XPS',
//       topic: topic,
//       partitionNum: 5
//     })
//   })

// })

// describe('POST', () => {
//   beforeAll(async () => {
//     //create a topic
//     response = await request(app).post('/createTopic').send({
//       clientId: 'myapp',
//       port: 9092,
//       hostName: 'Matt-XPS',
//       topic: generateString(6),
//       partitionNum: 5
//     });
//   });

//   afterAll(async () => {
//     // Closing the DB connection allows Jest to exit successfully.
//     await request(app).post('/deleteTopic').send({
//       clientId: 'myapp',
//       port: 9092,
//       hostName: 'Matt-XPS',
//       topic: 'newTopic',
//     });
//     app.close();
//   });

//     describe('/getOffsets', () => {
//       beforeAll((done) => {
//         done();
//       });

//       afterAll(async () => {
//         // Closing the DB connection allows Jest to exit successfully.
//         await mongoose.connection.close();
//         app.close();
//       });

//       let response;
//       describe('POST', () => {
//         beforeEach(async () => {
//           response = await request(app).post('/getOffsets').send({
//             clientId: 'myapp',
//             port: 9092,
//             hostName: 'Matt-XPS',
//             topic: 'newTopic',
//           });
//         });

//         test('responds with a 201 status and application/json content type', async () => {
//           expect(response.statusCode).toEqual(201);
//         });
//       });

//       describe('/', () => {
//         beforeAll((done) => {
//           done();
//         });

//         afterAll(async () => {
//           // Closing the DB connection allows Jest to exit successfully.
//           app.close();
//         });

//         test('responds with a 201 status and application/json content type', async () => {
//           expect(response.statusCode).toEqual(201);
//         });
//       });
//     });
//   });
// });

// describe('Websocket tests', () => {
//   let io, serverSocket, clientSocket;

//   beforeAll((done) => {
//     const httpServer = createServer();
//     io = new Server(httpServer);
//     // io = new Server(app);
//     httpServer.listen(() => {
//       const port = httpServer.address().port;
//       clientSocket = new Client(`http://localhost:${port}`);
//       // clientSocket = new Client(httpServer);
//       io.on('connection', (socket) => {
//         serverSocket = socket;
//       });
//       // clientSocket.on('connect', done);
//       clientSocket.on('connect', done);
//     });
//   });

//   afterAll(() => {
//     io.close();
//     clientSocket.close();
//     // app.close();
//   });

//   test('this better work or ima be as salty as the dead sea', (done) => {
//     clientSocket.on('testing an open websocket', (arg) => {
//       expect(arg).toBe('pinging the front-end');
//       done(); //is this line necessary?
//     });
//     serverSocket.emit('testing an open websocket', 'pinging the front-end');
//   });
// });
