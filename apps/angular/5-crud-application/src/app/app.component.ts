import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getState } from '@ngrx/signals';

import { LoadingDialogComponent, TodoListItemComponent } from './components';
import { Todo } from './models';
import { TodoApiService } from './services';
import { TodosStore } from './state';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, TodoListItemComponent],
  providers: [TodosStore],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      @if (store.todos(); as todos) {
        <mat-card>
          <mat-card-content>
            <ul>
              @for (todo of todos; track todo.id) {
                <li>
                  <app-todo-list-item
                    [todo]="todo"
                    [isLoading]="
                      store.updatingTodoId() === todo.id && store.isLoading()
                    "
                    [error]="
                      store.updatingTodoId() === todo.id && store.error()
                    "
                    (updateTodoEvent)="updateTodo($event)"
                    (deleteTodoEvent)="deleteTodo($event)"></app-todo-list-item>
                </li>
              } @empty {
                <li>There are no todos.</li>
              }
            </ul>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: `
    mat-card {
      width: fit-content;
      margin: 20px auto;
    }

    ul {
      list-style-type: none;
      padding-inline-start: 0;
    }
  `,
})
export class AppComponent {
  public readonly store = inject(TodosStore);
  private readonly todoApiService = inject(TodoApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const state = getState(this.store);

      if (state.todos === undefined && state.isLoading) {
        this.dialog.open(LoadingDialogComponent);
      } else {
        this.dialog.closeAll();
      }

      if (state.error) {
        this.snackbar.open('Error occurred', undefined, { duration: 3000 });
      }
    });
  }

  ngOnInit(): void {
    this.todoApiService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (todos) => this.store.setTodos(todos),
        (error) => this.store.setError(error),
      );
  }

  updateTodo(todo: Todo): void {
    this.store.updateTodo(todo.id);
    this.todoApiService
      .update(todo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (updatedTodo: Todo) => this.store.changeTodo(updatedTodo),
        (error) => this.store.setError(error),
      );
  }

  deleteTodo(todo: Todo): void {
    this.store.updateTodo(todo.id);
    this.todoApiService
      .delete(todo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        () => this.store.deleteTodo(todo),
        (error) => this.store.setError(error),
      );
  }
}
