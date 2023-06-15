import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from '../database/models/SequelizeTeam';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { team, teams } from './mocks/TeamsMock';
import SequelizeUsers from '../database/models/SequellizeUsers';
import { userRegistered, validLoginBody } from './mocks/UserMock';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { findById, finishedMatches, matches, progressMatches } from './mocks/MatchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Testa função findAll da rota teams', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Testa função getById da rota teams', async () => {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  afterEach(sinon.restore);
});

describe('testa a rota de login', () => {
  it('testa post comsucesso na rota de login', async () => {
      const userMock = SequelizeUsers.build(userRegistered)
      sinon.stub(SequelizeUsers, 'findOne').resolves(userMock)
      
      const response = await chai.request(app)
      .post('/login')
      .send(validLoginBody)
      
      expect(response.status).to.be.equal(200);
      expect(response.body.token).not.to.be.undefined
  
  })
  afterEach(sinon.restore);
})

describe('testa a rota matches', () => {
  it('testa a função findAll', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any)
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  })
  it('testa a função progressMatches, com partidas encerradas', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(finishedMatches as any)
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(finishedMatches);
  })
  it('testa a função progressMatches, com partidas em andamento', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(progressMatches as any)
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(progressMatches);
  })
  it('testa a função que finaliza a partida', async () => {
    sinon.stub(jwt, 'verify').returns(userRegistered as any)
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any)
    sinon.stub(SequelizeMatches, 'findByPk').resolves(findById as any)

    const { id, ...sendData } = findById;

    const { status, body } = await chai.request(app).patch('/matches/47/finish')
    .send(sendData)
    .set('Authorization', 'token');

    expect(status).to.equal(200);
    expect(body.message).to.equal('Finished');
  })
  
  afterEach(sinon.restore);
})