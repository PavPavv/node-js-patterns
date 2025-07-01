import { createElement } from 'react';
import { useParams } from "react-router";
import htm from 'htm';
import { Header } from '../header.js';
import { NotFound } from './notFound.js';
import { authors } from '../../../../data/authors.js';

const html = htm.bind(createElement);

export const Author = ({ match }) => {
  const params = useParams(); 
  const author = authors.find(
    author => author.id === params.authorId
  );

  if (!author) {
    return html`<${NotFound} error="Author not found"/>`;
  }

  return html`<div>
    <${Header}/>
    <h2>${author.name}</h2>
    <p>${author.bio}</p>
    <h3>Books</h3>
    <ul>
      ${author.books.map((book) =>
        html`<li key=${book.id}>${book.title} (${book.year})</li>`
      )}
    </ul>
  </div>`;
};