import React from 'react';
import { DropTarget } from 'react-dnd';
import Team from './Team';
import PropTypes from 'prop-types';
import { ItemTypes } from '../constants/DndItemTypes';

const positionTarget = {
  drop(props) {
    return props.team;
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: monitor.getItem()
  };
};

const Position = props => {
  const team = props.team;
  const rank = props.rank;
  const updateTeamname = props.updateTeamname;
  const swapPositions = props.swapPositions;
  const { connectDropTarget } = props;
  return connectDropTarget(
    <div>
      <Team
        team={team}
        rank={rank}
        updateTeamname={updateTeamname}
        swapPositions={swapPositions}
      />
    </div>
  );
};

Position.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  rank: PropTypes.number.isRequired,
  swapPositions: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  updateTeamname: PropTypes.func.isRequired
};
export default DropTarget(ItemTypes.TEAM, positionTarget, collect)(Position);
