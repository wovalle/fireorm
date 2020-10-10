import { CustomRepository } from './CustomRepository';
import { BaseFirestoreRepository } from '../BaseFirestoreRepository';

const metadataStorageMock = {
  setRepository: jest.fn(),
};

jest.mock('../MetadataStorage', () => ({
  getMetadataStorage: () => metadataStorageMock,
}));

describe('CustomRepositoryDecorator', () => {
  beforeEach(() => {
    metadataStorageMock.setRepository.mockReset();
  });
  it('should call metadataStorage.setRepository with right params', () => {
    class Entity {
      id: string;
    }

    @CustomRepository(Entity)
    class EntityRepo extends BaseFirestoreRepository<Entity> {}

    expect(metadataStorageMock);
  });
});
