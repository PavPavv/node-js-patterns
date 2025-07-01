import { createElement } from 'react';
import htm from 'htm';
import { Routes, Route } from 'react-router-dom';
import { Author } from './components/pages/author.js';
import { AuthorsIndex } from './components/pages/authorIndex.js';
import { NotFound } from './components/pages/notFound.js';

const html = htm.bind(createElement);

export const App = () => {
  return html`
    <${Routes}>
      <${Route} path="/" element=${html`<${AuthorsIndex} />`} />
      <${Route} path="/author/:authorId" element=${html`<${Author} />`} />
      <${Route} path="*" element=${html`<${NotFound} />`} />
    </${Routes}>
  `;
};