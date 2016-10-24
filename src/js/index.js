import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import {Rate} from 'antd';

ReactDOM.render(
  <div>
    <h1>SaaS管理台</h1>
    <Rate/>
 	<Button type="primary" size="large">Large</Button>
  </div>,
  document.getElementById('app')
);
