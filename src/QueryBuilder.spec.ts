import QueryBuilder from './QueryBuilder';
import { IQueryExecutor, IFireOrmQueryLine, FirestoreOperators } from './types';
import { expect } from 'chai';

class Test {
  id: string;
}

class FakeExecutor implements IQueryExecutor<Test> {
  public queries: IFireOrmQueryLine[];
  execute(queries: IFireOrmQueryLine[]): Promise<Test[]> {
    this.queries = queries;
    return Promise.resolve([]);
  }
}

describe('QueryBuilder', () => {
  let executor: FakeExecutor = null;
  beforeEach(() => {
    executor = new FakeExecutor();
  });
  it('must build query', () => {
    const queryBuilder = new QueryBuilder<Test>(executor);
    queryBuilder.whereEqualTo('id', '1').find();
    expect(executor.queries.length).to.eql(1);
    expect(executor.queries[0].operator).to.eql(FirestoreOperators.equal);
    expect(executor.queries[0].prop).to.eql('id');
    expect(executor.queries[0].val).to.eql('1');
  });

  it('must pipe queries', () => {
    const queryBuilder = new QueryBuilder<Test>(executor);
    queryBuilder
      .whereEqualTo('id', '0')
      .whereEqualTo('id', '1')
      .whereEqualTo('id', '2')
      .find();
    expect(executor.queries.length).to.eql(3);
    expect(executor.queries[0].val).to.eql('0');
    expect(executor.queries[1].val).to.eql('1');
    expect(executor.queries[2].val).to.eql('2');
  });
});
