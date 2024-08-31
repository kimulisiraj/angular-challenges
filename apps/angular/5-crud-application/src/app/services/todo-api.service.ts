import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from '../models';

const TODOS_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(TODOS_ENDPOINT);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${TODOS_ENDPOINT}/${todo.id}`, todo, {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  }

  delete(todo: Todo): Observable<void> {
    return this.http.delete<void>(`${TODOS_ENDPOINT}/${todo.id}`, {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  }
}
