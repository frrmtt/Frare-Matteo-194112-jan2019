var app = require ('./app');
const request = require('supertest');

describe('GET /api/rooms/:roomname/messages', function() {
    it('controllo che torni qualcosa', async() => {
    const response = await request(app).get('/api/rooms/:main/messages');
        expect(response.statusCode).toBe(200);
    });
    it ('dovrebbe non tornare niente', async() => {
        const response = await request(app).get('/api/rooms/:nonesistente/messages');
        expect(response.statusCode).toBe(404);    
    });
  });

  describe('GET /', function() {
    it('controllo che vada homepage', async() => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    });
  });