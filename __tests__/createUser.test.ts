import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../src/app';

describe('Create User', () => {
  it('Should create user', async () => {
    const res = await request(app).post('/user').send({ 
      email: `${uuidv4()}@gmail.com`,
      username: uuidv4(),
      password: uuidv4(),
    });
    
    expect(res.body).toEqual({ message: 'User created successfully.' });
    expect(res.status).toBe(201);
  });
});
