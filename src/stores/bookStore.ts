import { atom } from "jotai";

export const bookStore = atom([
  {
    id: 1,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien"
  }, 
  {
    id: 2,
    title: "Harry Potter",
    author: "J.K. Rowling"
  }, 
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien"
  }
])