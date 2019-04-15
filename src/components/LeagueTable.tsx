import React, { useState, useEffect } from 'react';
import Position from './Position';
import Positions from '../model/Positions';
import { DragDropContext } from 'react-dnd';
import _ from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import { SAMPLE_LEAGUE_TABLE } from '../constants/SampleData';
import { Card, Col } from 'react-bootstrap';

export interface Team {
  name: string;
  editing: boolean;
  id: string;
}

export interface LeagueTable {
  positions: Team[];
}

const LeagueTable = (): JSX.Element => {
  const defaultState = {
    positions: SAMPLE_LEAGUE_TABLE
  };

  const getInitialState = (): LeagueTable => {
    if (_.isUndefined(localStorage.state)) {
      return defaultState;
    }
    const localstate = JSON.parse(localStorage.state);

    if (_.isUndefined(localstate)) {
      return defaultState;
    }
    return localstate;
  };

  const [positions, setPositions] = useState(getInitialState().positions);

  const swapPositions = (sourceTeamId, targetTeamId): void => {
    setPositions(
      Positions.recalculateSwappedPositions(
        sourceTeamId,
        targetTeamId,
        positions
      )
    );
  };

  const updateTeamname = (team, updatedText): void => {
    setPositions(
      Positions.recalculatePositionsWithRenamedTeam(
        team,
        updatedText,
        positions
      )
    );
  };

  useEffect(() => {
    //unused params prevProps and prevState
    localStorage.state = JSON.stringify({ positions });
  });

  const positionNodes = positions.map((team, index) => (
    <Position
      team={team}
      rank={index + 1}
      key={index}
      swapPositions={swapPositions}
      updateTeamname={updateTeamname}
    />
  ));

  return (
    <Col md={6}>
      <Card bg="dark">
        <Card.Header>
          <Card.Title>Ligatabelle zum Selberstecken</Card.Title>
        </Card.Header>
        <Card.Body>{positionNodes}</Card.Body>
      </Card>
    </Col>
  );
};

export default DragDropContext(HTML5Backend)(LeagueTable);
