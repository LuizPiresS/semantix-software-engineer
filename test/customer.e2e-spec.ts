import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CustomerModule } from '../src/customer/customer.module';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  const mockedRequest = {
    id: 'valid uuid',
    name: 'valid name',
    email: 'valid@email.com',
    password: 'validPassword',
    phoneNumber: '53991826270',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // app.useLogger(new TestLogger()) // more on this line is below
    await app.init();
  });

  // afterAll(async () => {
  //   await app.close();
  // });

  it('/customers (POST)', () => {
    return request(app)
      .post('/customers')
      .set('Accept', 'application/json')
      .send(mockedRequest)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeFalsy();
      })
      .expect(HttpStatus.CREATED);
  });
});
