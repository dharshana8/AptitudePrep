export const speakingTopics = [
  // College
  { id: 'st-001', topic: 'If you could change one thing about your college, what would it be?', category: 'college' },
  { id: 'st-002', topic: 'What is the best thing about your college experience?', category: 'college' },
  { id: 'st-003', topic: 'Should college education be free for everyone? Why or why not?', category: 'college' },
  { id: 'st-004', topic: 'Describe a memorable moment from your college life.', category: 'college' },
  { id: 'st-005', topic: 'What skills should colleges teach that they currently do not?', category: 'college' },
  // Career
  { id: 'st-006', topic: 'What is your dream job and why?', category: 'career' },
  { id: 'st-007', topic: 'Is work-life balance achievable? Share your thoughts.', category: 'career' },
  { id: 'st-008', topic: 'Should companies mandate return to office? Discuss.', category: 'career' },
  { id: 'st-009', topic: 'What matters more in a job: salary or passion?', category: 'career' },
  { id: 'st-010', topic: 'How has technology changed the way we work?', category: 'career' },
  // Technology
  { id: 'st-011', topic: 'Is AI going to replace human jobs? What do you think?', category: 'technology' },
  { id: 'st-012', topic: 'Should social media have age restrictions? Why?', category: 'technology' },
  { id: 'st-013', topic: 'What is the most useful app on your phone and why?', category: 'technology' },
  { id: 'st-014', topic: 'Is technology making us more or less social?', category: 'technology' },
  { id: 'st-015', topic: 'Should coding be compulsory in schools?', category: 'technology' },
  // General
  { id: 'st-016', topic: 'What is one habit that changed your life?', category: 'general' },
  { id: 'st-017', topic: 'If you could have dinner with any person, who would it be?', category: 'general' },
  { id: 'st-018', topic: 'What does success mean to you?', category: 'general' },
  { id: 'st-019', topic: 'Describe your ideal day.', category: 'general' },
  { id: 'st-020', topic: 'What is the most important quality in a friend?', category: 'general' },
  // Opinion
  { id: 'st-021', topic: 'Should exams be the primary method of evaluation?', category: 'opinion' },
  { id: 'st-022', topic: 'Is it important to learn a second language?', category: 'opinion' },
  { id: 'st-023', topic: 'Should voting be mandatory?', category: 'opinion' },
  { id: 'st-024', topic: 'What is your opinion on online education?', category: 'opinion' },
  { id: 'st-025', topic: 'Should there be stricter environmental laws?', category: 'opinion' },
  // Social
  { id: 'st-026', topic: 'How can we reduce inequality in society?', category: 'social' },
  { id: 'st-027', topic: 'What role does sports play in character building?', category: 'social' },
  { id: 'st-028', topic: 'Is fast fashion a problem? Why or why not?', category: 'social' },
  { id: 'st-029', topic: 'How important is mental health awareness?', category: 'social' },
  { id: 'st-030', topic: 'Should community service be compulsory for students?', category: 'social' },
  // Situational
  { id: 'st-031', topic: 'You are given 1 million rupees. How would you use it?', category: 'situational' },
  { id: 'st-032', topic: 'If you could go back in time, what advice would you give your younger self?', category: 'situational' },
  { id: 'st-033', topic: 'You have to convince your boss to allow work from home. What would you say?', category: 'situational' },
  { id: 'st-034', topic: 'Your friend is giving up on their dreams. What would you tell them?', category: 'situational' },
  { id: 'st-035', topic: 'You are stranded on an island. What 3 things would you want?', category: 'situational' },
  // Personal
  { id: 'st-036', topic: 'What is your biggest strength and how has it helped you?', category: 'personal' },
  { id: 'st-037', topic: 'Describe a challenge you overcame and what you learned.', category: 'personal' },
  { id: 'st-038', topic: 'What motivates you to keep going when things get tough?', category: 'personal' },
  { id: 'st-039', topic: 'What is one thing you would like to improve about yourself?', category: 'personal' },
  { id: 'st-040', topic: 'What advice would you give to someone preparing for placements?', category: 'personal' },
  // Placement
  { id: 'st-041', topic: 'Tell me about yourself in 2 minutes.', category: 'placement' },
  { id: 'st-042', topic: 'Why should we hire you over other candidates?', category: 'placement' },
  { id: 'st-043', topic: 'Describe a project you worked on and what you learned.', category: 'placement' },
  { id: 'st-044', topic: 'Where do you see yourself in 5 years?', category: 'placement' },
  { id: 'st-045', topic: 'What are your strengths and weaknesses?', category: 'placement' },
];

export const speakingCategories = [
  { id: 'college', name: 'College', icon: '🎓' },
  { id: 'career', name: 'Career', icon: '💼' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'general', name: 'General', icon: '🌍' },
  { id: 'opinion', name: 'Opinion', icon: '💭' },
  { id: 'social', name: 'Social', icon: '👥' },
  { id: 'situational', name: 'Situational', icon: '🎭' },
  { id: 'personal', name: 'Personal', icon: '🧑' },
  { id: 'placement', name: 'Placement', icon: '🏢' },
];

export const getRandomTopic = (category = null) => {
  const pool = category
    ? speakingTopics.filter(t => t.category === category)
    : speakingTopics;
  return pool[Math.floor(Math.random() * pool.length)];
};

export const speakingPrompts = [
  { time: 30, text: 'Give an example to support your point.' },
  { time: 60, text: 'Explain why you think this way.' },
  { time: 90, text: 'Can you give another perspective?' },
  { time: 110, text: 'Try to conclude your answer now.' },
];

export const helpPrompts = [
  'Why do you think this?',
  'Can you give a real-life example?',
  'What would happen if the opposite were true?',
  'What is one advantage of this?',
  'What is one disadvantage of this?',
  'What would you personally do?',
  'How does this affect people around you?',
  'Can you compare this to something else?',
];
