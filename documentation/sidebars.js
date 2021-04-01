module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Competition Factory',
      items: ['overview', 'installation'],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        {
          Policies: [
            'concepts/policies',
            'policies/feedPolicy',
            {
              Avoidance: ['policies/avoidance', 'policies/accessors'],
            },
            'policies/positionActions',
            'policies/positioningSeeds',
          ],
        },
        'concepts/timeItems',
        'concepts/scaleItems',
        'concepts/matchUpFormat',
        'concepts/context',
        'concepts/subscriptions',
      ],
    },
    {
      type: 'category',
      label: 'Mocks Engine',
      items: ['engines/mocks-engine-examples', 'apis/mocks-engine-api'],
    },
    {
      type: 'category',
      label: 'Competition Engine',
      items: ['apis/competition-engine-api'],
    },
    {
      type: 'category',
      label: 'Tournament Engine',
      items: ['apis/tournament-engine-api'],
    },
    {
      type: 'category',
      label: 'Draw Engine',
      items: ['apis/draw-engine-api'],
    },
  ],
};
