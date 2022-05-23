import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Tests', () => {
  describe('Email Validation', () => {
    let chaiHttpResponse: Response;
    it('👥 Should be a String', async () => {
         chaiHttpResponse = await chai
         .request(app).post('/login').send({email:123145652}) 
         expect(chaiHttpResponse.status).to.be.eq(401);
         expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password')
       });
    it('Must not be empty', async () =>{
      chaiHttpResponse =  await chai
      .request(app)
      .post('/login').send({email: ''})
      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled')
    });
    it('Must have a valid format', async  () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({email:'xablaus'})
      expect(chaiHttpResponse.status).to.eq(401)
      expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password')
    });
    it('Email is required', async  () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login').send({password:'xablaus'})
      expect(chaiHttpResponse.status).to.eq(400)
      expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled')
    })

  })
})