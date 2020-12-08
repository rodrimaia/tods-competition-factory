import { MAIN, QUALIFYING } from '../../constants/drawDefinitionConstants';

export const definitionTemplate = () => ({
  drawId: null,
  drawName: null,
  drawProfile: {
    automated: null,
    drawType: null,
  },
  entryProfile: {
    [QUALIFYING]: {
      drawSize: null,
      sequenceMap: null,
      alternates: true,
      wildcardsCount: null,
    },
    [MAIN]: {
      drawSize: null,
      qualifiersCount: null,
      alternates: true,
      wildcardsCount: null,
    },
  },
  entries: [],
  links: [],
  structures: [],
});

export const keyValidation = ['drawId', 'structures'];

export default definitionTemplate;
