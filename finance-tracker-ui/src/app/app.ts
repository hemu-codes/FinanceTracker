import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService, Transaction } from './services/transaction';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  transactions: Transaction[] = [];
  newTransaction: Transaction = {
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'Expense'
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    });
  }

  addTransaction() {
    if (this.newTransaction.description && this.newTransaction.amount > 0) {
      this.transactionService.createTransaction(this.newTransaction).subscribe({
        next: (data) => {
          this.transactions.push(data);
          // Reset form
          this.newTransaction = {
            amount: 0,
            date: new Date().toISOString().split('T')[0],
            description: '',
            type: 'Expense'
          };
        },
        error: (error) => {
          console.error('Error creating transaction:', error);
        }
      });
    }
  }

  deleteTransaction(id: number | undefined) {
    if (id) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          this.transactions = this.transactions.filter(t => t.id !== id);
        },
        error: (error) => {
          console.error('Error deleting transaction:', error);
        }
      });
    }
  }
}