import { Router } from 'https://deno.land/x/oak/mod.ts';
import { ObjectId } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';
import { getDb } from '../config/db_client.ts';
import { Todo, TodoSchema } from '../models/todo.ts';

const router = new Router();

router.get('/todos', async (ctx) => {
  const todos = await getDb().collection('todos').find(); // { _id: ObjectId(), text: string }

  const transformedTodos = todos.map((todo: TodoSchema) => {
    return { id: todo._id.$oid, text: todo.text };
  });

  ctx.response.body = { todos: transformedTodos };
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body();
  const newTodo: Todo = {
    text: data.value.text,
  };

  const id = await getDb().collection('todos').insertOne(newTodo);

  newTodo.id = id.$oid;

  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  const data = await ctx.request.body();

  await getDb()
    .collection('todos')
    .updateOne({ _id: ObjectId(id!) }, { $set: { text: data.value.text } });

  ctx.response.body = { message: 'Updated todo' };
});

router.delete('/todos/:id', async (ctx) => {
  const { id } = ctx.params;

  await getDb()
    .collection('todos')
    .deleteOne({ _id: ObjectId(id!) });

  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
