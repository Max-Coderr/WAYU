import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('NewsCategoriesXController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    let password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType", "isVerified", "isActive", "role",
                                               "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true, true, 'admin', '${password}')`);
  });
  afterAll(async () => await teardownTestApp(app, dataSource));

  it(
    'POST /auth/sign-in -> should respond with a jwt token and 201',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ login: 'ali@gmail.com', password: 'qwer' })
        .expect(201);

      expect(res.body.accessToken).toBeDefined();
      jwtToken = res.body.accessToken;
    },
  );



  it(
    'Post /news-categories/admin should response with 401',
    async () => {
      const res = await request(app.getHttpServer())
        .post('news-categories/admin')
        .send({ title: 'Unauthorized' })
        .expect(401);
    },
  );
  it(
    'Post /news-categories/admin, response with 201',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/news-categories/admin')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ title: 'News' })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('News');
    },
  );


  it(
    'should PATCH /news-categories/admin 401',
    async () => {
      const res=await request(app.getHttpServer())
        .patch('/news-categories/admin/1')
        .send({title:'Nothing'})
        .expect(401)
    });

  it(
    'should PATCH /news-categories/admin 404',
    async () => {
      const res=await request(app.getHttpServer())
        .set('Authorization', `Bearer ${jwtToken}`)
        .patch('/news-categories/admin/6')
        .send({title:'Sth'})
        .expect(404)
    });

  it(
    'should PATCH /news-categories/admin 200',
    async () => {
      const res=await request(app.getHttpServer())
        .set('Authorization', `Bearer ${jwtToken}`)
        .patch('/news-categories/admin/1')
        .send({title:'Updated'})
        .expect(200)
    });

  it(
    'should GET /news-categories/admin 401',
    async () => {
      const res=await request(app.getHttpServer())
        .get('/news-categories/admin')
        .expect(401)
    });

  it(
    'should GET /news-categories/admin 200',
    async () => {
      const res=await request(app.getHttpServer())
        .set('Authorization', `Bearer ${jwtToken}`)
        .patch('/news-categories/admin/1')
        .send({id:1,title:'Updated'})
        .expect(200)
    });

});
