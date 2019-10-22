import {renderToString} from 'react-dom/server';
import App from '../App';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import {newStore} from '../services/store/store';
import {fetchApp, fetchPage} from '../services/store/actions';
import axios from 'axios';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export const isomorphicRenderer = (req, res) => {
  const store = newStore();
  const context = {};
  const renderMarkup = () => renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  axios.defaults.baseURL = 'http://localhost:3000';
  const pageId = req.path.substr(1);

  if (context.url) {
    res.redirect(context.url);
  } else {
    return store.dispatch(fetchApp())
      .then(() => (pageId ? store.dispatch(fetchPage(pageId)) : Promise.resolve()))
      .then(() => {
        res.status(200).send(
          `<!doctype html>
                <html lang="">
                    <head>
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta charset="utf-8" />
                        <title>Welcome to Razzle</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
                        ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`

          }
                    <script type="application/json" id="__INITIAL_STATE__">${JSON.stringify(store.getState())}</script>
                    </head>
                    <body>
                        <div id="root">${renderMarkup()}</div>
                    </body>
                </html>`
        );
      }).catch(e => console.log('error thrown when ssr'));
  }
}