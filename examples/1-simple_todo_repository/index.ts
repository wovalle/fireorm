import * as admin from 'firebase-admin';
import { GetRepository, Collection, Initialize } from '../../src';

const serviceAccount = require('../firestore.creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});
Initialize(firestore);

@Collection('todos')
class Todo {
  id: string;
  text: string;
  done: Boolean;
}

const todoRepository = GetRepository(Todo);

const run = async () => {
  // Create a todo
  const todo = new Todo();
  todo.text = 'my super todo';
  todo.done = false;

  const todoEntity = await todoRepository.create(todo);
  console.log(`Created todo with id: ${todoEntity.id}`);
  console.table(todoEntity);

  // Read a todo
  const todoId = todoEntity.id;
  const mySuperTodo = await todoRepository.findById(todoId);
  console.log(`Got todo with id: ${todoId}`);
  console.table(mySuperTodo);

  // Update a todo
  mySuperTodo.done = true;
  await todoRepository.update(mySuperTodo);
  console.log(`Updated todo.`);
  console.table(mySuperTodo);

  // Delete a todo
  await todoRepository.delete(mySuperTodo.id);
  console.log(`Deleted todo.`);
  const deletedTodo = await todoRepository.findById(mySuperTodo.id);
  console.log('Deleted Todo:', deletedTodo);
};

run().catch(e => console.error(e));
