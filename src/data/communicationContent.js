export const communicationLessons = [
  {
    id: 'comm-001',
    title: 'How to Start Speaking',
    category: 'techniques',
    explanation: `Starting to speak is often the hardest part. Here are techniques to begin confidently:

**The PAUSE Method:**
- **P**ause and breathe
- **A**cknowledge the topic
- **U**se a starter sentence
- **S**hare your first point
- **E**xpand with an example

**Starter Sentences:**
- "I believe that..."
- "In my opinion..."
- "From my experience..."
- "This is an interesting topic because..."
- "Let me explain this step by step..."`,
    tips: [
      'Take a deep breath before speaking',
      'Start with what you know best about the topic',
      'It is okay to pause and think before speaking',
      'Do not try to be perfect from the start',
    ],
    objective: 'Begin a response within five seconds using a clear opening and one useful point.',
    modelAnswer: 'This is an interesting topic because it affects our daily choices. I believe that preparation is important. For example, a simple plan helps us act with more confidence.',
    practiceDrill: 'Choose any topic. Take one breath, choose a starter sentence, and speak for 30 seconds using the PAUSE method.',
    selfCheck: [
      'Did I pause and breathe before speaking?',
      'Did I clearly acknowledge the topic?',
      'Did I share one point and support it with an example?',
    ],
    youtubeReference: {
      title: 'How to Start Speaking Confidently',
      url: 'https://www.youtube.com/results?search_query=how+to+start+speaking+confidently+communication+skills',
      channel: 'Communication Skills',
    },
  },
  {
    id: 'comm-002',
    title: 'How to Continue Speaking',
    category: 'techniques',
    explanation: `Once you start, keeping the flow going is key:

**Techniques to Continue:**
- **Elaborate:** Add more detail to what you just said
- **Example:** Give a real-life example
- **Contrast:** Compare with something opposite
- **Explain Why:** Give reasons for your opinion
- **Personal Experience:** Share something you have experienced
- **Hypothetical:** "What if..." scenario
- **Cause-Effect:** Explain consequences

**Filler-Free Pauses:**
Instead of "um", "uh", "like" - pause silently. It shows confidence.`,
    tips: [
      'Use the PREP method: Point, Reason, Example, Point',
      'Ask yourself "Why do I think this?" and explain',
      'Think of a real-life example to support your point',
      'If stuck, switch to a related angle',
    ],
    youtubeReference: null,
  },
  {
    id: 'comm-003',
    title: 'How to Express Opinions',
    category: 'techniques',
    explanation: `Expressing opinions clearly is a core communication skill:

**Useful Phrases:**
- "I strongly believe that..."
- "In my view..."
- "From my perspective..."
- "I am of the opinion that..."
- "It seems to me that..."
- "I would argue that..."

**Structuring an Opinion:**
1. State your opinion clearly
2. Give 2-3 reasons
3. Provide an example
4. Conclude with your view`,
    tips: [
      'Be direct - do not hedge too much',
      'Back up your opinion with reasons',
      'It is okay to have a different opinion from others',
    ],
    youtubeReference: null,
  },
  {
    id: 'comm-004',
    title: 'How to Disagree Politely',
    category: 'techniques',
    explanation: `Disagreeing respectfully is important in professional and personal settings:

**Polite Disagreement Phrases:**
- "I see your point, but I think..."
- "That is a valid perspective. However..."
- "I understand where you are coming from, but..."
- "I respectfully disagree because..."
- "I have a different take on this..."

**Do NOT:**
- Say "You are wrong"
- Get defensive
- Make it personal
- Interrupt the other person`,
    tips: [
      'Always acknowledge the other person first',
      'Focus on the idea, not the person',
      'Use "I" statements instead of "You" statements',
    ],
    youtubeReference: null,
  },
  {
    id: 'comm-005',
    title: 'How to Conclude a Speech',
    category: 'techniques',
    explanation: `A strong conclusion leaves a lasting impression:

**Conclusion Techniques:**
- **Summary:** Briefly recap your main points
- **Call to Action:** Suggest what the listener should do
- **Thought-provoking Question:** End with a question
- **Quote:** Use a relevant quote
- **Personal Note:** Share a final thought

**Example Conclusions:**
- "To sum up, I believe..."
- "In conclusion, the key takeaway is..."
- "So, the next time you face this, remember..."
- "I would like to leave you with this thought..."`,
    tips: [
      'Do not just trail off - end deliberately',
      'Keep the conclusion brief (10-15 seconds)',
      'Match the tone of your conclusion to your speech',
    ],
    youtubeReference: null,
  },
  {
    id: 'comm-006',
    title: 'Vocabulary Building',
    category: 'vocabulary',
    explanation: `A strong vocabulary makes you a more effective speaker:

**Daily Vocabulary Practice:**
1. Learn 3 new words daily
2. Use each word in a sentence
3. Review weekly

**Useful Words for Impromptu Speaking:**
- **Furthermore** - in addition
- **Nevertheless** - however
- **Consequently** - as a result
- **Moreover** - besides
- **Nonetheless** - despite that
- **Therefore** - for that reason
- **Additionally** - also
- **Essentially** - basically`,
    tips: [
      'Learn words in context, not in isolation',
      'Use new words in conversations within 24 hours',
      'Focus on words you will actually use',
    ],
    youtubeReference: null,
  },
  {
    id: 'comm-007',
    title: 'Impromptu Speaking Framework',
    category: 'impromptu',
    explanation: `Impromptu speaking means speaking without preparation. The PREP framework helps:

**PREP Method:**
- **P**oint: State your main point (10 seconds)
- **R**eason: Give your reason (20 seconds)
- **E**xample: Share an example (30 seconds)
- **P**oint: Restate your main point (10 seconds)

**Additional Tips:**
- Buy time by saying "That is a great question..."
- Bridge between ideas using "Furthermore..."
- If nervous, slow down your speaking pace
- Focus on one clear message, not multiple ideas`,
    tips: [
      'Practice PREP daily with random topics',
      'Time yourself to build the habit',
      'Record yourself and review',
    ],
    youtubeReference: null,
  },
  {
    id: 'comm-008',
    title: 'Reducing Filler Words',
    category: 'fluency',
    explanation: `Filler words like "um", "uh", "like", "actually" weaken your speech:

**Common Filler Words:**
- um, uh, er
- like, you know
- actually, basically
- so, well
- I mean

**How to Reduce Them:**
1. Record yourself and count fillers
2. Replace fillers with silent pauses
3. Practice speaking slowly
4. Be aware of when you use them most
5. Practice tongue twisters for fluency`,
    tips: [
      'Silence is better than a filler word',
      'Slow down - most people speak too fast when nervous',
      'Practice reading aloud for 5 minutes daily',
    ],
    youtubeReference: null,
  },
];

export const getCommunicationLesson = (id) => {
  return communicationLessons.find(l => l.id === id);
};

export const getLessonsByCategory = (category) => {
  return communicationLessons.filter(l => l.category === category);
};
