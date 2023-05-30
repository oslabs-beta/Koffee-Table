const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../backend/server');
const partitionGraph = require('../client/components/PartitionGraph');

const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

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
    beforeAll((done) => {
      done();
    });

    afterAll(async () => {
      // Closing the DB connection allows Jest to exit successfully.
      await mongoose.connection.close();
      app.close();
    });

    let response;
    describe('POST', () => {
      beforeEach(async () => {
        response = await request(app).post('/getCluster').send({
          clientId: 'myapp',
          port: 9092,
          hostName: 'Matt-XPS',
        });
      });

      test('responds with a 201 status and application/json content type', async () => {
        expect(response.statusCode).toEqual(201);
        // expect('Content-Type', /application\/json/);
      });
    });
  });

  describe('/getOffsets', () => {
    beforeAll((done) => {
      done();
    });

    afterAll(async () => {
      // Closing the DB connection allows Jest to exit successfully.
      await mongoose.connection.close();
      app.close();
    });

    let response;
    describe('POST', () => {
      beforeEach(async () => {
        response = await request(app).post('/getOffsets').send({
          clientId: 'myapp',
          port: 9092,
          hostName: 'Matt-XPS',
        });
      });

      test('responds with a 201 status and application/json content type', async () => {
        expect(response.statusCode).toEqual(201);
      });
    });

    describe('/', () => {
      beforeAll((done) => {
        done();
      });

      afterAll(async () => {
        // Closing the DB connection allows Jest to exit successfully.
        await mongoose.connection.close();
        app.close();
      });

      test('responds with a 201 status and application/json content type', async () => {
        expect(response.statusCode).toEqual(201);
      });
    });
  });
});

describe('Websocket tests', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    // io = new Server(app);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      // clientSocket = new Client(httpServer);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      // clientSocket.on('connect', done);
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
    // app.close();
  });

  test('this better work or ima be as salty as the dead sea', (done) => {
    clientSocket.on('testing an open websocket', (arg) => {
      expect(arg).toBe('pinging the front-end');
      done(); //is this line necessary?
    });
    serverSocket.emit('testing an open websocket', 'pinging the front-end');
  });
});
