import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';

describe('Product (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' });

    token = loginResponse.body.access_token;
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('/products (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send({ name: 'Product 1', price: 10 })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Product 1',
        price: 10,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('/products (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          price: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );
  });

  it('/products/:id (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${token}`);

    const product = data.body[0];

    const response = await request(app.getHttpServer())
      .get(`/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: product.id,
        name: product.name,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }),
    );
  });

  it('/products/:id (PUT)', async () => {
    const data = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const product = data.body[0];

    const response = await request(app.getHttpServer())
      .put(`/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Product 2', price: 20 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: product.id,
        name: 'Product 2',
        price: 20,
        createdAt: product.createdAt,
        updatedAt: expect.any(String),
      }),
    );
  });

  it('/products/:id (DELETE)', async () => {
    const dada = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const productId = dada.body[0].id;

    return request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
