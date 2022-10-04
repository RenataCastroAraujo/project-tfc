import * as chai from 'chai';
import * as sinon from 'sinon';
import { loginMock, oneUserMock, tokenMock } from './mocks/usersMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "create")
      .resolves({id:1, ...oneUserMock} as UserModel);
  });

  after(()=>{
    (UserModel.create as sinon.SinonStub).restore();
  })

  it('Quando login feito com sucesso retorna status 200 e um token', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginMock);
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(tokenMock)
})
})
