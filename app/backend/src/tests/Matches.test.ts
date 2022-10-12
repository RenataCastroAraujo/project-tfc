import * as chai from 'chai';
import * as sinon from 'sinon';
import { allMatches, matchCreate, matchesInProgressFalse, matchesInProgressTrue } from './mocks/matchesMock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchesModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves([...allMatches] as any);
  });

  afterEach(()=>{
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('Retorna todas as partidas ', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
})

describe('GET /matches true', () => {
  let chaiHttpResponse: Response;

  // beforeEach(async () => {
  //   sinon
  //     .stub(MatchModel, "findAll")
  //     .resolves([...matchesInProgressTrue] as any);
  // });

  // afterEach(()=>{
  //   (MatchModel.findAll as sinon.SinonStub).restore();
  // })
  it('Retorna as partidas em andamento', async () => {
    (MatchModel.findAll as sinon.SinonStub).restore();
    sinon
    .stub(MatchModel, "findAll")
    .resolves([...matchesInProgressTrue] as any);
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesInProgressTrue);
  })
})

describe('GET /matches false', () => {
  let chaiHttpResponse: Response;

  // beforeEach(async () => {
  //   sinon
  //     .stub(MatchModel, "findAll")
  //     .resolves([...matchesInProgressFalse] as any);
  // });

  // afterEach(()=>{
  //   (MatchModel.findAll as sinon.SinonStub).restore();
  // })
  it('Retorna as partidas finalizadas', async () => {
    (MatchModel.findAll as sinon.SinonStub).restore();
    sinon
    .stub(MatchModel, "findAll")
    .resolves([...matchesInProgressFalse] as any);
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesInProgressFalse);
  })
})
  describe('POST /matches', () => {
    let chaiHttpResponse: Response;
    beforeEach(async () => {
      sinon
        .stub(MatchModel, "create")
        .resolves(matchCreate as any);
    })
    afterEach(() => {
      (MatchModel.create as sinon.SinonStub).restore();
    })
  it('Salva uma partida com sucesso no banco de dados', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .send({
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    });
  expect(chaiHttpResponse.status).to.equal(200);
  expect(chaiHttpResponse.body).to.be.deep.equal(matchCreate);
  })
  })
  describe('PATCH /matches', () => {
    let chaiHttpResponse: Response;
    beforeEach(async () => {
      sinon
        .stub(MatchModel, "update")
        .resolves();
    })
    afterEach(() => {
      (MatchModel.update as sinon.SinonStub).restore();
    })
    it('Atualiza uma partida em andamento', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        })
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.be.equal({ message: 'Match updated' });
    })
  })
})
