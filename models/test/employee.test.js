const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no "firstName", "lastName", or "department" arg', async () => {
    const cases = [
      { firstName: '', lastName: '', department: '' },
      { firstName: 'John', lastName: '', department: '' },
      { firstName: '', lastName: 'Doe', department: '' },
      { firstName: '', lastName: '', department: 'Marketing' },
    ];

    for (let data of cases) {
      const emp = new Employee(data);
      try {
        await emp.validate();
        throw new Error('Validation should have failed but did not.');
      } catch (err) {
        expect(err.errors.firstName || err.errors.lastName || err.errors.department).to.exist;
      }
    }
  });

  it('should throw an error if "firstName" is not a string', async () => {
    const cases = [{}, []];

    for (let name of cases) {
      const emp = new Employee({ firstName: name, lastName: 'Doe', department: 'Marketing' });
      try {
        await emp.validate();
        throw new Error('Validation should have failed but did not.');
      } catch (err) {
        expect(err.errors.firstName).to.exist;
      }
    }
  });

  it('should throw an error if "lastName" is not a string', async () => {
    const cases = [{}, []];

    for (let name of cases) {
      const emp = new Employee({ firstName: 'John', lastName: name, department: 'Marketing' });
      try {
        await emp.validate();
        throw new Error('Validation should have failed but did not.');
      } catch (err) {
        expect(err.errors.lastName).to.exist;
      }
    }
  });

  it('should throw an error if "department" is not a string', async () => {
    const cases = [{}, []];

    for (let name of cases) {
      const emp = new Employee({ firstName: 'John', lastName: 'Doe', department: name });
      try {
        await emp.validate();
        throw new Error('Validation should have failed but did not.');
      } catch (err) {
        expect(err.errors.department).to.exist;
      }
    }
  });

  it('should not throw an error if arguments are correct', async () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'Marketing' },
      { firstName: 'Evelyn', lastName: 'Donely', department: 'Transport' },
      { firstName: 'Adam', lastName: 'Jenkins', department: 'Management' },
    ];

    for (let data of cases) {
      const emp = new Employee(data);
      try {
        await emp.validate();
      } catch (err) {
        throw new Error(`Validation failed with error: ${err}`);
      }
    }
  });

  after(() => {
    mongoose.models = {};
  });
});