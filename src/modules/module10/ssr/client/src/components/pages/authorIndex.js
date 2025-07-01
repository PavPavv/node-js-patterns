import { createElement } from 'react';
import htm from 'htm';
import { Link } from 'react-router-dom'
import { Header } from '../header.js';
import { authors } from '../../../../data/authors.js';

const html = htm.bind(createElement);

export const AuthorsIndex = () => {
  return html`<div>
    <${Header}/>
    <div>${authors.map((author) =>
      html`<div key=${author.id}>
        <p>
          <${Link} to="${`/author/${author.id}`}">${author.name}</>
        </p>
      </div>`)}
    </div>
  </div>`;
};