import * as chai from 'chai';
import * as sinon from 'sinon';
import { allTeams, oneTeam } from './mocks/teamsMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
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
       .get('/teams');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeams);
})
describe('GET /teams/:id', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(TeamsModel, "findByPk")
      .resolves(oneTeam as any);
  });

  afterEach(()=>{
    (TeamsModel.findByPk as sinon.SinonStub).restore();
  })
  it('Encontra um time quando passado o Id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(oneTeam);
  })
})
})