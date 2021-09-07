export function checkDependenciesScheduled({
  matchUpScheduleTimes,
  matchUpDependencies,
  allDateMatchUpIds,
  matchUp,
}) {
  // only those dependencies that are part of the date scheduling profile are important to consider
  const matchUpIdDependencies = (
    matchUpDependencies?.[matchUp.matchUpId] || []
  ).filter((matchUpId) => allDateMatchUpIds.includes(matchUpId));

  // when true all the matchUps on which this matchUp is dependent have already been scheduled
  const dependenciesScheduled = matchUpIdDependencies.every((matchUpId) => {
    return matchUpScheduleTimes[matchUpId];
  });

  return { dependenciesScheduled };
}
