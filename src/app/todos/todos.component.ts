import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo() {
    if (this.newTodo.trim() === '') return;

    const todo: Todo = { text: this.newTodo, done: false };
    this.todoService.addTodo(todo).subscribe((added) => {
      this.todos.push(added);
      this.newTodo = '';
    });
  }

  toggleDone(todo: Todo) {
    const updated = { ...todo, done: !todo.done };
    this.todoService.updateTodo(updated).subscribe(() => {
      todo.done = updated.done;
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    });
  }
}
