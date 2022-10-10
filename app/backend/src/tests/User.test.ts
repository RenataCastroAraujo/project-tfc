import * as chai from 'chai';
import * as sinon from 'sinon';
import { failedLoginMock, invalidData, loginMock, oneUserMock, tokenMock } from './mocks/usersMock';
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
  it('Não permite acesso com email invalido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidData);
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.be.eql({message:'Incorrect email or password'});
  })
})

  describe('GET /login/validate', () => {
    let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({id:1, ...oneUserMock} as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })
  it('Recebe um header com "authorization" onde esta armazenado token e retorna status 200 e a role do user', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set({ 'authorization': tokenMock });
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.eql({'role': 'admin'});
  })
  })
