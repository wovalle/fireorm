import QueryBuilder from './QueryBuilder';
import { IQueryExecutor, IFireOrmQueryLine, FirestoreOperators } from './types';
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

  it('must build query', async () => {
    const queryBuilder = new QueryBuilder<Test>(executor);
    await queryBuilder.whereEqualTo('id', '1').find();
    expect(executor.queries.length).toEqual(1);
    expect(executor.queries[0].operator).toEqual(FirestoreOperators.equal);
    expect(executor.queries[0].prop).toEqual('id');
    expect(executor.queries[0].val).toEqual('1');
  });

  it('must build array value query', async () => {
    const queryBuilder = new QueryBuilder<Test>(executor);
    await queryBuilder.whereIn('id', ['1', '2']).find();
    expect(executor.queries[0].operator).toEqual(FirestoreOperators.in);
    expect(executor.queries[0].prop).toEqual('id');
    expect(executor.queries[0].val).toEqual(['1', '2']);
  });

  it('must pipe queries', async () => {
    const queryBuilder = new QueryBuilder<Test>(executor);
    await queryBuilder
      .whereEqualTo('id', '0')
      .whereEqualTo('id', '1')
      .whereEqualTo('id', '2')
      .find();
    expect(executor.queries.length).toEqual(3);
    expect(executor.queries[0].val).toEqual('0');
    expect(executor.queries[1].val).toEqual('1');
    expect(executor.queries[2].val).toEqual('2');
  });
});
