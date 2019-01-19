import CustomRepository from './CustomRepository';
import { expect } from 'chai';

describe('CustomRepositoryDecorator', () => {
  let globalRef: any = null;
  const metadataStorage = { repositories: [] };
  const repositories = metadataStorage.repositories;

  const getStorage: any = () => global;
  before(() => {
    const globalObj = getStorage();
    globalRef = globalObj;
    globalObj.metadataStorage = metadataStorage;
  });

  afterEach(() => {
    metadataStorage.repositories = [];
  });

  after(() => {
    global = globalRef;
  });

  it('should register custom repositories', () => {
    class Entity {}

    @CustomRepository(Entity)
    class EntityRepo {}

    expect(repositories.length).to.eql(1);
    expect(repositories[0].entity).to.eql(Entity);
    expect(repositories[0].target).to.eql(EntityRepo.constructor);
  });

  it('should enforce that custom repository inherits from BaseRepository');
});
