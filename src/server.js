import React from 'react';
import express from 'express';
import {isomorphicRenderer} from './server/isomorphicRender';
import {appRenderer, pageRenderer} from './server/apiRenderer';

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/api/app.model.json', appRenderer)
  .get('/api/pages/:page.model.json', pageRenderer)
  .get('/*', isomorphicRenderer);

export default server;
