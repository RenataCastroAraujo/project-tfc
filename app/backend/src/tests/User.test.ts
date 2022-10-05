import * as chai from 'chai';
import * as sinon from 'sinon';
import { failedLoginMock, loginMock, oneUserMock, tokenMock } from './mocks/usersMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({id:1, ...oneUserMock} as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Quando login feito com sucesso retorna status 200 e um token', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginMock);
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(tokenMock)
})
  it('Falha quando login feito sem email ou senha, retorna status 400 e mensagem "All fields must be filled"', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(failedLoginMock);
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.be.eql({message: 'All fields must be filled'});
  })
})
