import { createElement } from 'react';
import htm from 'htm';
import { Link } from 'react-router-dom';
import { Header } from '../header.js';

const html = htm.bind(createElement);

export const NotFound = ({ error }) => {
  return html`<div>
    <${Header}/>
    <div>
      <h2>404</h2>
      <h3>${error || 'Page not found'}</h3>
      <${Link} to="/">Go back to the home page</>
    </div>
  </div>`;
};