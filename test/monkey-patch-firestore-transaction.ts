import { DocumentReference } from '@google-cloud/firestore';

class TransactionWriteBatch {
  delete(ref: DocumentReference) {
    return ref.delete();
  }

  set(ref: DocumentReference, data, option = {}) {
    return ref.set(data, option);
  }

  update(ref: DocumentReference, data) {
    return ref.update(data);
  }

  create(ref: DocumentReference, data) {
    return ref.create(data);
  }

  get(ref: DocumentReference) {
    return ref.get();
  }

  getAll(...refs: DocumentReference[]) {
    return Promise.all(refs.map(r => r.get()));
  }
}

export default (instance: any) => {
  // tslint:disable-next-line
  instance.runTransaction = (
    executor: (tran: TransactionWriteBatch) => Promise<void>
  ) => {
    return executor(new TransactionWriteBatch());
  };
};
