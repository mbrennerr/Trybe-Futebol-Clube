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
    it('Should be a String', async () => {
         chaiHttpResponse = await chai
         .request(app).post('/login').send({email:123654879}) 
         expect(chaiHttpResponse.status).to.be.eq(422);
         expect(chaiHttpResponse.body.error).to.be.eq("\"email\" must be a string")
       });

  })
})