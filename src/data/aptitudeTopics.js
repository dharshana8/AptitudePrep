export const APTITUDE_CATEGORIES = [
  {
    id: 'quantitative',
    name: 'Quantitative Aptitude',
    topics: [
      { id: 'number-system', name: 'Number System', order: 1 },
      { id: 'hcf-lcm', name: 'HCF & LCM', order: 2 },
      { id: 'averages', name: 'Averages', order: 3 },
      { id: 'percentage', name: 'Percentage', order: 4 },
      { id: 'profit-loss', name: 'Profit & Loss', order: 5 },
      { id: 'simple-interest', name: 'Simple Interest', order: 6 },
      { id: 'compound-interest', name: 'Compound Interest', order: 7 },
      { id: 'ratio-proportion', name: 'Ratio & Proportion', order: 8 },
      { id: 'mixture-allegation', name: 'Mixture & Allegation', order: 9 },
      { id: 'problems-on-ages', name: 'Problems on Ages', order: 10 },
      { id: 'time-work', name: 'Time & Work', order: 11 },
      { id: 'pipes-cisterns', name: 'Pipes & Cisterns', order: 12 },
      { id: 'speed-distance', name: 'Time, Speed & Distance', order: 13 },
      { id: 'trains', name: 'Trains', order: 14 },
      { id: 'boats-streams', name: 'Boats & Streams', order: 15 },
      { id: 'races', name: 'Races', order: 16 },
      { id: 'permutation-combination', name: 'Permutation & Combination', order: 17 },
      { id: 'probability', name: 'Probability', order: 18 },
    ],
  },
  {
    id: 'reasoning',
    name: 'Reasoning',
    topics: [
      { id: 'number-series', name: 'Number Series', order: 19 },
      { id: 'letter-series', name: 'Letter Series', order: 20 },
      { id: 'coding-decoding', name: 'Coding & Decoding', order: 21 },
      { id: 'blood-relations', name: 'Blood Relations', order: 22 },
      { id: 'direction', name: 'Direction', order: 23 },
      { id: 'syllogism', name: 'Syllogism', order: 24 },
      { id: 'data-sufficiency', name: 'Data Sufficiency', order: 25 },
      { id: 'data-arrangement', name: 'Data Arrangement', order: 26 },
      { id: 'data-interpretation', name: 'Data Interpretation', order: 27 },
      { id: 'venn-diagram', name: 'Venn Diagram', order: 28 },
      { id: 'clocks-calendars', name: 'Clocks & Calendars', order: 29 },
      { id: 'cube', name: 'Cube', order: 30 },
      { id: 'visual-reasoning', name: 'Visual Reasoning', order: 31 },
      { id: 'odd-one-out', name: 'Odd One Out', order: 32 },
    ],
  },
  {
    id: 'other',
    name: 'Other',
    topics: [
      { id: 'geometry', name: 'Geometry', order: 33 },
      { id: 'height-distance', name: 'Height & Distance', order: 34 },
      { id: 'logarithms', name: 'Logarithms', order: 35 },
      { id: 'game-aptitude', name: 'Game-based Aptitude', order: 36 },
      { id: 'mixed-aptitude', name: 'Mixed Aptitude + Company Questions', order: 37 },
    ],
  },
];

export const getTopicByOrder = (order) => {
  for (const cat of APTITUDE_CATEGORIES) {
    const topic = cat.topics.find(t => t.order === order);
    if (topic) return topic;
  }
  return null;
};

export const getAllTopics = () => {
  return APTITUDE_CATEGORIES.flatMap(c => c.topics);
};

export const MASTERY_THRESHOLD = 80;
