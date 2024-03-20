import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items: Array<any>

  products = [
    { item: 'apples', price: 2.99 },
    { item: 'peaches', price: 3.99 },
    { item: 'pears', price: 4.99 },
  ];

  validCustomerInfo = false;

  firstName!: string;
  lastName!: string;
  streetAddress!: string;

  selectedProduct!: string;
  quantity!: number;

  subTotal: number = 0;
  taxRate: number = 0.07;
  total: number = 0;

  displaySubTotal: string = '0.00';
  displayTax: string = '0.00';
  displayTotal: string = '0.00';

  constructor() {
      this.items = [];
  }

  addItems(selectedItem: string, quantity: number) {
    let product = this.products.find(p => p.item === selectedItem);
    let itemExists = false;

    if (!product) {
      return;
    }

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].item == selectedItem) {
        this.items[i].quantity += quantity;
        this.items[i].amount = (Math.round(product.price * this.items[i].quantity * 100) / 100).toFixed(2);
        this.subTotal += product.price * quantity;
        this.total = this.subTotal + (this.subTotal * this.taxRate);
        itemExists = true;
        this.getDisplaySubTotal();
        this.getDisplayTax();
        this.getDisplayTotal();
        break;
      }
    }

    if (!itemExists) {
      let newItem = {'item': product.item, 'price': product.price, 'quantity': quantity, 'amount': (Math.round(product.price * quantity * 100) / 100).toFixed(2), 'num': this.items.length + 1};
      this.items.push(newItem);
      this.subTotal += product.price * quantity;
      this.total = this.subTotal + (this.subTotal * this.taxRate);
      this.getDisplaySubTotal();
      this.getDisplayTax();
      this.getDisplayTotal();
    }
  }

  removeItem(item: any) {
    for(var i=0; i<this.items.length; i++) {
      if(this.items[i].num == item.num) {
        this.items.splice(i,1); // remove 1 item at ith place
        this.subTotal -= item.price * item.quantity;
        this.total = this.subTotal + (this.subTotal * this.taxRate);
        this.getDisplaySubTotal();
        this.getDisplayTax();
        this.getDisplayTotal();
      }
    }
  }

  showOrderInfo() {
  }

  getDisplaySubTotal() {
    this.displaySubTotal = (Math.round(this.subTotal * 100) / 100).toFixed(2);
  }

  getDisplayTax() {
    this.displayTax = (Math.round(this.subTotal * this.taxRate * 100) / 100).toFixed(2);
  }

  getDisplayTotal() {
    this.displayTotal = (Math.round(this.total * 100) / 100).toFixed(2)
  }

  onCustomerInfoSubmit() {
    this.validCustomerInfo = true;
  }
}