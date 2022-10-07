import * as chai from 'chai';
import * as sinon from 'sinon';
import allTeams from './mocks/teamsMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /teams', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves([...allTeams] as any);
  });

  afterEach(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

  it('Retorna os times ', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/teams');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeams);
})
})