import { APTITUDE_CATEGORIES } from './aptitudeTopics';
import { getKnowledgeMapByTopic } from './aptitudeKnowledgeMap';

const topicLessons = {
    'hcf-lcm': {
        summary: 'HCF is the greatest common divisor, while LCM is the smallest common multiple. Prime factorization makes both easy to calculate.',
        formula: 'For two positive numbers: HCF × LCM = first number × second number.',
        example: 'For 12 = 2² × 3 and 18 = 2 × 3², HCF = 2 × 3 = 6 and LCM = 2² × 3² = 36.',
        shortcut: 'Use minimum prime powers for HCF and maximum prime powers for LCM.',
        mistake: 'Do not use maximum powers for HCF or minimum powers for LCM.',
    },
    averages: {
        summary: 'An average is the equal share of a total. It helps compare groups and solve missing-value questions.',
        formula: 'Average = sum of observations ÷ number of observations. New average after adding x = (old total + x) ÷ new count.',
        example: 'The average of 12, 15 and 18 is (12 + 15 + 18) ÷ 3 = 15.',
        shortcut: 'When every value increases by k, the average also increases by k.',
        mistake: 'Never average averages directly unless all groups have the same size.',
    },
    percentage: {
        summary: 'Percentage means a value out of 100. It is used to compare changes, marks, discounts and growth.',
        formula: 'Percentage = (part ÷ whole) × 100. Percentage change = (change ÷ original value) × 100.',
        example: 'If a price rises from 200 to 250, the increase is 50/200 × 100 = 25%.',
        shortcut: 'A change of x% followed by y% gives net change x + y + xy/100, using signs for increase or decrease.',
        mistake: 'Always calculate percentage change using the original value as the denominator.',
    },
    'profit-loss': {
        summary: 'Profit or loss compares the selling price with the cost price. Discount is calculated from the marked price.',
        formula: 'Profit% = profit ÷ cost price × 100; Loss% = loss ÷ cost price × 100.',
        example: 'Buying an item for 800 and selling it for 920 gives profit 120, so profit% = 120/800 × 100 = 15%.',
        shortcut: 'If profit is p%, selling price is (100 + p)% of cost price.',
        mistake: 'Profit and loss percentages always use cost price, not selling price.',
    },
    'simple-interest': {
        summary: 'Simple interest is calculated only on the original principal, so the interest earned each period remains constant.',
        formula: 'SI = (P × R × T) ÷ 100 and Amount = P + SI.',
        example: 'For P = 5,000, R = 8% and T = 2 years, SI = 5,000 × 8 × 2 / 100 = 800.',
        shortcut: 'Convert months into years before using the formula.',
        mistake: 'Do not add previous interest to the principal in simple interest.',
    },
    'compound-interest': {
        summary: 'Compound interest adds each period’s interest to the principal, so later interest is earned on interest as well.',
        formula: 'Amount = P(1 + R/100)^T; CI = Amount - P.',
        example: 'For 10,000 at 10% yearly for 2 years, amount = 10,000 × 1.1² = 12,100, so CI = 2,100.',
        shortcut: 'For two years, CI - SI = P(R/100)² when the rate is yearly.',
        mistake: 'Match the rate period with the compounding period: halve the rate for half-yearly compounding.',
    },
    'ratio-proportion': {
        summary: 'A ratio compares quantities in the same units. A proportion says that two ratios are equal.',
        formula: 'a:b = c:d means a/b = c/d, so ad = bc.',
        example: 'If boys:girls = 3:2 and there are 25 students, one part is 5 and boys = 15, girls = 10.',
        shortcut: 'In a ratio, multiply every term by the same number without changing the relationship.',
        mistake: 'Convert units before forming a ratio, such as metres and centimetres.',
    },
    'mixture-allegation': {
        summary: 'Mixture problems combine quantities with different prices or concentrations. Allegation compares their differences from the mean.',
        formula: 'Quantity of cheaper : quantity of dearer = (dearer - mean) : (mean - cheaper).',
        example: 'Mixing items at 20 and 30 per kg to get 24 per kg gives cheaper:dearer = 6:4 = 3:2.',
        shortcut: 'Draw the two prices on the sides and the mean price in the centre.',
        mistake: 'Use prices or concentrations consistently; do not mix units.',
    },
    'problems-on-ages': {
        summary: 'Age differences remain constant, while age ratios change with time. Define one person’s age as a variable and build equations.',
        formula: 'Future age = present age + years; past age = present age - years.',
        example: 'If a father is 3 times his son’s age and their total is 48, 4x = 48, so their ages are 36 and 12.',
        shortcut: 'Start with the fixed age difference when a question gives one.',
        mistake: 'Do not multiply the age difference by time; only individual ages change.',
    },
    'time-work': {
        summary: 'Work rate is the fraction of work completed in one unit of time. Combined workers add their rates.',
        formula: 'If A finishes in x days, A’s one-day work is 1/x. Combined rate = 1/x + 1/y.',
        example: 'A takes 6 days and B takes 3 days, so together they do 1/6 + 1/3 = 1/2 work per day and finish in 2 days.',
        shortcut: 'Use total work as the LCM of individual days to avoid fractions.',
        mistake: 'Add rates, not the number of days taken.',
    },
    'pipes-cisterns': {
        summary: 'An inlet fills a tank and an outlet empties it. Their rates are combined with positive and negative signs.',
        formula: 'Net rate = sum of inlet rates - sum of outlet rates.',
        example: 'A pipe fills in 4 hours and a drain empties in 12 hours: net rate = 1/4 - 1/12 = 1/6, so filling takes 6 hours.',
        shortcut: 'Treat an emptying pipe as a negative worker in time-and-work problems.',
        mistake: 'Check whether the tank is filling or emptying before calculating time.',
    },
    'speed-distance': {
        summary: 'Speed connects distance and time. Keep units consistent before substituting values.',
        formula: 'Speed = distance ÷ time; distance = speed × time; time = distance ÷ speed.',
        example: 'At 60 km/h for 2.5 hours, distance = 60 × 2.5 = 150 km.',
        shortcut: 'Convert km/h to m/s by multiplying 5/18, and m/s to km/h by multiplying 18/5.',
        mistake: 'Do not combine kilometres with hours and metres with seconds in the same equation.',
    },
    trains: {
        summary: 'Train questions use the distance travelled by the train or by both moving objects, depending on what is being crossed.',
        formula: 'Time = distance ÷ speed. Crossing a pole uses train length; crossing a platform uses train length + platform length.',
        example: 'A 180 m train at 15 m/s crosses a pole in 180/15 = 12 seconds.',
        shortcut: 'For two trains moving opposite ways, add speeds; in the same direction, subtract them.',
        mistake: 'Convert train speed to metres per second before using lengths in metres.',
    },
    'boats-streams': {
        summary: 'A boat’s speed changes with the stream. Downstream speed increases and upstream speed decreases.',
        formula: 'Downstream = boat speed + stream speed; upstream = boat speed - stream speed.',
        example: 'If downstream is 12 km/h and upstream is 8 km/h, boat speed in still water is 10 km/h and stream speed is 2 km/h.',
        shortcut: 'Still-water speed = (downstream + upstream)/2.',
        mistake: 'Do not use the stream speed as the boat speed in still water.',
    },
    races: {
        summary: 'Race problems compare distances covered in the same time or times taken for the same distance.',
        formula: 'If A beats B by d metres in an L-metre race, A:B speed = L:(L-d).',
        example: 'In a 100 m race, A beats B by 20 m, so their speed ratio is 100:80 = 5:4.',
        shortcut: 'Use speed ratio = distance ratio when runners take the same time.',
        mistake: 'Clarify whether the stated lead is a distance lead or a time lead.',
    },
    'permutation-combination': {
        summary: 'Permutation counts arrangements where order matters. Combination counts selections where order does not matter.',
        formula: 'nPr = n!/(n-r)! and nCr = n!/[r!(n-r)!].',
        example: 'Choosing and arranging 2 people from 5 gives 5P2 = 5 × 4 = 20; choosing only gives 5C2 = 10.',
        shortcut: 'Use combinations first when selecting a group, then permutations for arranging it.',
        mistake: 'Do not use permutation when swapping selected items does not create a new outcome.',
    },
    probability: {
        summary: 'Probability measures how likely an event is. It is the ratio of favourable outcomes to all equally likely outcomes.',
        formula: 'P(E) = favourable outcomes ÷ total outcomes; P(not E) = 1 - P(E).',
        example: 'The probability of drawing a red card from a standard deck is 26/52 = 1/2.',
        shortcut: 'For “at least one”, calculate 1 - probability of none when that is simpler.',
        mistake: 'Ensure the sample space includes every possible outcome exactly once.',
    },
    'number-series': {
        summary: 'Number series follow a hidden pattern, commonly involving differences, ratios, squares, cubes or alternating operations.',
        formula: 'Check first differences, second differences, ratios and alternating terms in that order.',
        example: '2, 5, 10, 17 follows n² + 1, so the next term is 26.',
        shortcut: 'Write differences below the series; many patterns become visible immediately.',
        mistake: 'Do not stop at the first pattern if it does not explain every term.',
    },
    'letter-series': {
        summary: 'Letter series use alphabet positions, forward or backward movement, alternate patterns and repeated groups.',
        formula: 'Use A=1 through Z=26, or A=0 through Z=25, but keep one convention throughout.',
        example: 'A, C, F, J increases by 2, 3, 4, so the next letter is O (+5).',
        shortcut: 'Convert letters to positions before searching for a numeric pattern.',
        mistake: 'Remember that after Z the sequence may wrap around to A.',
    },
    'coding-decoding': {
        summary: 'Coding-decoding questions transform words or numbers using a consistent rule. Find the rule from the examples first.',
        formula: 'Test alphabet shifts, reversals, position values, substitutions and rearrangements.',
        example: 'If CAT becomes DBU, each letter moves one position forward: C→D, A→B, T→U.',
        shortcut: 'Compare the first and last letters first; they often reveal the operation quickly.',
        mistake: 'Do not assume the same code rule for every question without checking the examples.',
    },
    'blood-relations': {
        summary: 'Blood-relation problems become easier when each person is represented as a node in a family tree.',
        formula: 'Translate every sentence into a direct relation before answering the final question.',
        example: 'A is B’s sister and B is C’s father, so A is C’s paternal aunt.',
        shortcut: 'Draw generations horizontally and siblings on the same level.',
        mistake: 'Track whose gender is known; “child” and “sibling” alone do not specify gender.',
    },
    direction: {
        summary: 'Direction problems track movement on a map using north, south, east and west, then calculate final position or distance.',
        formula: 'Net east-west and north-south distances form perpendicular sides; shortest distance uses √(x²+y²).',
        example: 'Moving 3 km east and 4 km north gives a shortest distance of √(3²+4²) = 5 km.',
        shortcut: 'Draw a small coordinate grid for every turn.',
        mistake: 'Do not add all travelled distances when the question asks for shortest distance.',
    },
    syllogism: {
        summary: 'Syllogisms test whether conclusions necessarily follow from given statements. Use set relationships rather than assumptions.',
        formula: 'All A are B means A is inside B; no A is B means the sets do not overlap; some A are B means an overlap exists.',
        example: 'All doctors are educated and some teachers are doctors; therefore some teachers are educated.',
        shortcut: 'Use a Venn diagram and test each conclusion against it.',
        mistake: 'Never reverse “All A are B” into “All B are A”.',
    },
    'data-sufficiency': {
        summary: 'Data sufficiency asks whether the statements provide enough information to answer a question, not what the answer is.',
        formula: 'Test statement 1 alone, statement 2 alone, then both together.',
        example: 'To find x, x=5 is sufficient alone; x+y=10 is not sufficient unless y is also known.',
        shortcut: 'Stop as soon as a statement is definitely sufficient; avoid unnecessary calculation.',
        mistake: 'A statement can be sufficient even when it does not give a numerical answer directly.',
    },
    'data-arrangement': {
        summary: 'Arrangement questions place people or objects in rows, circles or positions while satisfying several conditions.',
        formula: 'Convert each clue into a fixed position, adjacency, ordering or exclusion rule.',
        example: 'If A is left of B and C is immediately right of B, the order is A-B-C.',
        shortcut: 'Place the strongest restrictions first, such as fixed positions and immediate neighbours.',
        mistake: 'Do not rotate a circular arrangement as a new arrangement when rotations are considered identical.',
    },
    'data-interpretation': {
        summary: 'Data interpretation uses tables, charts and graphs to compare values and calculate totals, ratios, averages and percentages.',
        formula: 'Read units and scale first; then apply the required arithmetic to the exact values.',
        example: 'If sales rise from 400 to 500, growth is 100/400 × 100 = 25%.',
        shortcut: 'Estimate answer ranges before calculating to eliminate impossible options.',
        mistake: 'Check whether a graph uses thousands, lakhs or percentages on its axis.',
    },
    'venn-diagram': {
        summary: 'Venn diagrams represent sets and their overlaps. They are useful for “only”, “both”, “at least one” and “neither” questions.',
        formula: 'For two sets, n(A∪B) = n(A) + n(B) - n(A∩B).',
        example: 'If 30 like tea, 20 like coffee and 8 like both, at least one = 30 + 20 - 8 = 42.',
        shortcut: 'Fill the intersection first, then subtract it from each total to find only-A and only-B.',
        mistake: 'Do not count the intersection twice when finding the union.',
    },
    'clocks-calendars': {
        summary: 'Clock problems use relative movement of the hands, while calendar problems use odd days and leap-year rules.',
        formula: 'Minute hand moves 6° per minute; hour hand moves 0.5° per minute.',
        example: 'At 3:00 the hands form a 90° angle because the hour hand is at 3 and the minute hand is at 12.',
        shortcut: 'A leap year is divisible by 4, except century years must also be divisible by 400.',
        mistake: 'The hour hand moves continuously; it is not fixed exactly at a number between hours.',
    },
    cube: {
        summary: 'Cube questions involve faces, edges, vertices and painted-cube counts after dividing a cube into smaller equal cubes.',
        formula: 'A cube has 6 faces, 12 edges and 8 vertices; a cube cut into n parts along each edge has n³ small cubes.',
        example: 'A 3×3×3 cube has 27 small cubes; 8 corner cubes have three painted faces.',
        shortcut: 'Classify small cubes by 3, 2, 1 or 0 painted faces.',
        mistake: 'Distinguish cuts from resulting pieces; n cuts create n+1 sections along an edge.',
    },
    'visual-reasoning': {
        summary: 'Visual reasoning finds transformations such as rotation, reflection, counting, folding and pattern continuation.',
        formula: 'Track orientation, position, number of elements and shading separately.',
        example: 'A 90° clockwise rotation moves the top edge to the right edge while preserving the shape.',
        shortcut: 'Look for the smallest feature that changes consistently between figures.',
        mistake: 'A mirror image reverses left and right, while a rotation changes orientation without mirroring.',
    },
    'odd-one-out': {
        summary: 'Odd-one-out questions ask you to identify the item that does not follow the common property of the others.',
        formula: 'Compare category, numerical pattern, shape, spelling, position or relationship.',
        example: '2, 3, 5 and 9: 9 is the odd one because the others are prime numbers.',
        shortcut: 'Find the strongest rule shared by exactly three or more options.',
        mistake: 'Choose the simplest consistent rule, not an unusual property that fits by coincidence.',
    },
    geometry: {
        summary: 'Geometry studies shapes, angles, lines and areas. Most aptitude questions reduce to a small set of standard relationships.',
        formula: 'Triangle angles sum to 180°; rectangle area = length × breadth; circle area = πr².',
        example: 'A triangle with angles 50° and 60° has third angle 180 - 110 = 70°.',
        shortcut: 'Mark equal sides, parallel lines and right angles before calculating.',
        mistake: 'Use diameter 2r wherever a formula requires radius r.',
    },
    'height-distance': {
        summary: 'Height-and-distance questions use right triangles to relate an object’s height, horizontal distance and angle of elevation.',
        formula: 'tan θ = opposite ÷ adjacent; sin θ = opposite ÷ hypotenuse; cos θ = adjacent ÷ hypotenuse.',
        example: 'If an object is 20 m away and the elevation angle is 45°, height = 20 × tan45° = 20 m.',
        shortcut: 'Memorize values of sin, cos and tan for 30°, 45° and 60°.',
        mistake: 'Draw the horizontal line from the observer before identifying the angle.',
    },
    logarithms: {
        summary: 'A logarithm is the exponent required to produce a number from a given base. It reverses exponentiation.',
        formula: 'logₐ(xy)=logₐx+logₐy; logₐ(x/y)=logₐx-logₐy; logₐ(xⁿ)=n logₐx.',
        example: 'log₂8 = 3 because 2³ = 8.',
        shortcut: 'Convert all terms to the same base before combining logarithms.',
        mistake: 'The base must be positive and not equal to 1, and the argument must be positive.',
    },
    'game-aptitude': {
        summary: 'Game-based aptitude tests planning, pattern recognition, prioritisation and decision-making under constraints.',
        formula: 'Define the goal, list available moves, remove illegal moves and choose the move with the best future outcome.',
        example: 'In a scheduling game, complete fixed-time tasks first, then fit flexible tasks into the remaining slots.',
        shortcut: 'Read every rule once, then use a small table to track state changes.',
        mistake: 'Do not optimise one move while ignoring restrictions that apply later in the game.',
    },
    'mixed-aptitude': {
        summary: 'Mixed aptitude combines arithmetic, reasoning, data and company-style questions. The main skill is selecting the right method quickly.',
        formula: 'Classify the question first: percentage, ratio, rate, counting, logic or data interpretation.',
        example: 'For a discount followed by tax, apply each percentage to the value at that stage, not both to the original price.',
        shortcut: 'Skip lengthy questions temporarily and return after securing easy marks.',
        mistake: 'Do not apply one familiar formula before identifying what the question is actually asking.',
    },
};

const createTopicContent = (topic) => {
    const lesson = topicLessons[topic.id];
    if (!lesson) return null;
    const knowledgeMap = getKnowledgeMapByTopic(topic.id);
    const subTopicBase = {
        explanation: lesson.summary,
        keyPoints: [lesson.formula, lesson.example, `Exam approach: ${lesson.summary}`],
        examples: [
            { difficulty: 'Worked Example', question: 'How is this concept applied?', answer: lesson.example },
            { difficulty: 'Exam Method', question: 'What should you identify before calculating?', answer: lesson.formula },
        ],
        shortcuts: [
            lesson.shortcut,
            'Write the known values first, then choose the formula instead of calculating mentally.',
            'Estimate the answer before calculating so you can eliminate impossible options quickly.',
        ],
        tricks: [
            lesson.formula,
            'Underline the question word: find, increase, decrease, arrangement, probability or time. It tells you which method to use.',
            'After solving, substitute the answer back into the question and check the units.',
        ],
        commonMistakes: [lesson.mistake],
    };
    const mappedSubTopics = knowledgeMap?.subtopics.map(subTopic => ({
        id: subTopic.id,
        title: subTopic.title,
        explanation: `${subTopic.title} covers ${subTopic.concepts.join(', ')}. Identify the question pattern before choosing a method.`,
        keyPoints: [
            ...subTopic.concepts.map(concept => `Concept: ${concept}`),
            ...subTopic.patterns.map(pattern => `Question pattern: ${pattern}`),
        ],
        examples: subTopic.patterns.slice(0, 2).map(pattern => ({
            difficulty: 'Question Pattern',
            question: `How can you recognise a ${pattern} question?`,
            answer: `Look for the ${pattern} structure, list the known values, and select the matching formula or rule.`,
        })),
        shortcuts: knowledgeMap.shortcuts,
        tricks: subTopic.patterns.map(pattern => `Recognise the ${pattern} pattern before calculating.`),
        commonMistakes: knowledgeMap.traps,
    }));
    const mappedAssessments = knowledgeMap?.subtopics.map((subTopic, index) => ({
        id: `${topic.id}-assessment-${index + 1}`,
        question: `Which question pattern belongs to ${subTopic.title}?`,
        options: [subTopic.patterns[0], subTopic.concepts[0], 'Unrelated calculation', 'Guessing from the options'],
        correctAnswer: subTopic.patterns[0],
        explanation: `First recognise the ${subTopic.patterns[0]} pattern, then choose the matching method.`,
        topic: topic.id,
        subTopic: subTopic.id,
        pattern: subTopic.patterns[0],
        difficulty: index === 0 ? 'Easy' : index === 1 ? 'Medium' : 'Hard',
    }));
    return {
        topicId: topic.id,
        title: topic.name,
        description: lesson.summary,
        category: 'aptitude',
        subTopics: mappedSubTopics || [
            { id: 'concepts', title: `${topic.name}: Core Concepts`, ...subTopicBase },
            { id: 'methods', title: `${topic.name}: Methods and Formulas`, ...subTopicBase },
            { id: 'exam-strategy', title: `${topic.name}: Exam Strategy`, ...subTopicBase },
        ],
        youtubeReferences: [{
            title: `${topic.name} Aptitude Complete Explanation`,
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${topic.name} aptitude complete explanation`)}`,
            channel: 'YouTube search results',
            description: `Watch detailed lessons and solved questions for ${topic.name}.`,
        }],
        assessmentQuestions: mappedAssessments || [
            {
                id: `${topic.id}-assessment-1`,
                question: `Which formula or rule is central to ${topic.name}?`,
                options: [lesson.formula, lesson.shortcut, lesson.mistake, lesson.summary],
                correctAnswer: lesson.formula,
                explanation: lesson.formula,
                topic: topic.id,
                subTopic: 'methods',
                pattern: 'formula recognition',
                difficulty: 'Easy',
            },
            {
                id: `${topic.id}-assessment-2`,
                question: `What is the best first step when solving a ${topic.name} question?`,
                options: ['Identify the known values and method', 'Guess the closest option', 'Ignore the units', 'Use every formula you remember'],
                correctAnswer: 'Identify the known values and method',
                explanation: `Start by identifying the question type and known values. Then apply this rule: ${lesson.formula}`,
                topic: topic.id,
                subTopic: 'exam-strategy',
                pattern: 'method selection',
                difficulty: 'Easy',
            },
            {
                id: `${topic.id}-assessment-3`,
                question: `Which error should you avoid in ${topic.name}?`,
                options: [lesson.mistake, 'Checking the answer', 'Writing the formula', 'Keeping units consistent'],
                correctAnswer: lesson.mistake,
                explanation: lesson.mistake,
                topic: topic.id,
                subTopic: 'concepts',
                pattern: 'common mistake detection',
                difficulty: 'Easy',
            },
        ],
    };
};

export const aptitudeContent = Object.fromEntries(
    APTITUDE_CATEGORIES.flatMap(category => category.topics)
        .map(topic => [topic.id, createTopicContent(topic)])
        .filter(([, content]) => content)
);

export const getAptitudeContent = (topicId) => aptitudeContent[topicId] || null;
