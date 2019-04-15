import { DragSource } from 'react-dnd';
import React from 'react';
import { ItemTypes } from '../constants/DndItemTypes';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';

const teamSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    return { sourceId: props.team.id };
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const sourceTeam = monitor.getItem();
    const targetTeam = monitor.getDropResult();
    props.swapPositions(sourceTeam.sourceId, targetTeam.id);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const calculatePositionCssClass = positionNumber => {
  if (positionNumber === 1) {
    return 'tabellenfuehrerClass tabelleClass';
  }
  if (positionNumber <= 3) {
    return 'championsLeagueClass tabelleClass';
  }
  if (positionNumber <= 6) {
    return 'europaLeagueClass tabelleClass';
  }
  if (positionNumber <= 15) {
    return 'mittelfeldClass tabelleClass';
  }
  if (positionNumber === 16) {
    return 'relegationClass tabelleClass';
  } else {
    return 'abstiegClass tabelleClass';
  }
};

const Team = props => {
  const { rank, team, updateTeamname } = props;
  // These two props are injected by React DnD,
  // as defined by your `collect` function above:
  const { connectDragSource } = props;
  const classes = classNames(
    'col-md-12',
    'btn',
    'text-bold',
    calculatePositionCssClass(rank)
  );

  const onChange = evt => {
    updateTeamname(team, evt.target.value);
  };

  return connectDragSource(
    <div className={classes} style={{ cursor: 'pointer' }}>
      <ContentEditable
        onChange={onChange}
        className="textPointer"
        html={team.name}
        autoFocus={true}
        maxLength={200}
        disabled={!team.editing}
      />
    </div>
  );
};

Team.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  rank: PropTypes.number.isRequired,

  // Injected by React DnD:
  team: PropTypes.object.isRequired,
  updateTeamname: PropTypes.func.isRequired
};

export default DragSource(ItemTypes.TEAM, teamSource, collect)(Team);
