const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.models.js')

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();

    const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
    await testDepTwo.save();
  });

  it('/:id should delete chosen document', async () => {
    const departmentIdToDelete = '5d9f1140f10a81216cfd4408';
    const res = await request(server).delete(`/api/departments/${departmentIdToDelete}`);
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    const deletedDepartment = await Department.findById(departmentIdToDelete);
    expect(deletedDepartment).to.be.null;
    const notDeletedDepartment = await Department.findOne({ name: 'Department #2' });
    expect(notDeletedDepartment).to.not.be.null;
  });

  after(async () => {
    await Department.deleteMany();
  });
});