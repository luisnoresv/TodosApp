export interface Todo {
  id?: string;
  text: string;
}

export interface TodoSchema {
  _id: { $oid: string };
  text: string;
}
