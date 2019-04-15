import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Row, Container } from 'react-bootstrap';
import LeagueTable from './LeagueTable';

const App = (): JSX.Element => {
  return (
    <div className="index">
      <Container>
        <Row>
          <LeagueTable />
        </Row>
      </Container>
    </div>
  );
};

export default App;
