const request = require('supertest')
const app = require('../server')

describe('Post', () => {
  it('should get a user', async () => {
    const res = await request(app).get('/user/createUser');
    expect(res.statusCode).toEqual(200)
  });

  it('should create a user', async () => {
    const res = await request(app).post('/user/createUser')
    .send({
        login: 'abcd',
        password: 'abcd123'
    })
    expect(res.statusCode).toEqual(201)
  });

  it('should get a user by ID', async () => {
    const res = await request(app).get('/user/getUserById/1')
    expect(res.statusCode).toEqual(200)
  });

  it('should update a user by ID', async () => {
    const res = await request(app).put('/user/updateUser/1')
    .send({
        login: 'abcd',
        age: 16
    })
    expect(res.statusCode).toEqual(200)
  });

  it('should delete a user by ID', async () => {
    const res = await request(app).delete('/user/deleteUser/1')
    expect(res.statusCode).toEqual(200)
  });
})