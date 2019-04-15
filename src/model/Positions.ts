export default class Positions {
  private static _findTeamRank = (teamId, positions) => {
    const zeroBasedIndex = positions.findIndex(team => team.id === teamId);
    return zeroBasedIndex + 1;
  };

  private static _findTeam = (teamId, positions) => {
    return positions.find(team => team.id === teamId);
  };

  public static recalculateSwappedPositions = (
    sourceTeamId,
    targetTeamId,
    currentPositions
  ) => {
    const clonedPositions = currentPositions.slice();

    const sourceRank = Positions._findTeamRank(sourceTeamId, clonedPositions);
    const targetRank = Positions._findTeamRank(targetTeamId, clonedPositions);

    const sourceTeam = Positions._findTeam(sourceTeamId, clonedPositions);
    const targetTeam = Positions._findTeam(targetTeamId, clonedPositions);

    clonedPositions[targetRank - 1] = sourceTeam;
    clonedPositions[sourceRank - 1] = targetTeam;
    return clonedPositions;
  };

  public static recalculatePositionsWithRenamedTeam = (
    team,
    updatedText,
    currentPositions
  ) => {
    const clonedPositions = currentPositions.slice();

    const teamRank = Positions._findTeamRank(team.id, clonedPositions);

    //team.editing = false;
    team.name = updatedText;

    clonedPositions[teamRank - 1] = team;
    return clonedPositions;
  };
}
