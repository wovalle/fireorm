// import CustomRepository from './CustomRepository';
// import { expect } from 'chai';
// import sinon from 'sinon';

// describe('CustomRepositoryDecorator', () => {
//   const metadataStorage = { repositories: [] };
//   const repositories = metadataStorage.repositories;
//   let stub = null;

//   before(() => {
//     stub = sinon
//       .stub(global as any, 'metadataStorage')
//       .returns(metadataStorage);
//   });

//   afterEach(() => {
//     metadataStorage.repositories = [];
//   });

//   after(() => {
//     stub.restore();
//   });

//   it('should register custom repositories', () => {
//     class Entity {}

//     @CustomRepository(Entity)
//     class EntityRepo {}

//     expect(repositories.length).to.eql(1);
//     expect(repositories[0].entity).to.eql(Entity);
//     expect(repositories[0].target).to.eql(EntityRepo.constructor);
//   });

//   it('should enforce that custom repository inherits from BaseRepository');
// });
