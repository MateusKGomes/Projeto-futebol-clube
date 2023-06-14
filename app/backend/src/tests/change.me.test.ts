import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from '../database/models/SequelizeTeam';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { team, teams } from './mocks/TeamsMock';
import SequelizeUsers from '../database/models/SequellizeUsers';
import { userRegistered, validLoginBody } from './mocks/UserMock';

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