import { createElement } from 'react';
import { Link } from 'react-router-dom';
import htm from 'htm';

const html = htm.bind(createElement);

export const Header = () => {
  return html`<header>
      <h1>
        <${Link} to="/">My library</>
      </h1>
    </header>`;
};