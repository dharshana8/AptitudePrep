// Curriculum map for lesson generation, pattern coverage, and mastery tracking.
export const APTITUDE_KNOWLEDGE_MAP = [
    {
        topicId: 'number-system',
        prerequisites: ['basic arithmetic'],
        formulas: ['sum 1..n = n(n + 1)/2', 'sum squares = n(n + 1)(2n + 1)/6', 'sum cubes = [n(n + 1)/2]^2', 'number of factors of p^a q^b = (a + 1)(b + 1)'],
        shortcuts: ['Use prime exponents for factors, HCF, LCM, and perfect powers.', 'For unit digits, reduce powers by their cycle length.'],
        traps: ['1 is neither prime nor composite.', 'Use the original number for divisibility and percentage bases.'],
        subtopics: [
            { id: 'number-types', title: 'Number Types and Properties', concepts: ['natural, whole, integer, rational, irrational, real', 'even and odd properties', 'prime and composite numbers'], patterns: ['classification', 'parity of expressions', 'prime/composite reasoning'] },
            { id: 'factors-divisibility', title: 'Factors, Multiples, and Divisibility', concepts: ['prime factorization', 'divisibility tests', 'number and sum of factors'], patterns: ['missing digits', 'smallest or largest divisible number', 'factor counting'] },
            { id: 'remainders-cyclicity', title: 'Remainders, Unit Digits, and Bases', concepts: ['remainder properties', 'cyclicity', 'last digits', 'base conversion'], patterns: ['large powers', 'division remainder', 'number formation', 'digit problems'] }
        ]
    },
    {
        topicId: 'hcf-lcm',
        prerequisites: ['prime factorization', 'number system'],
        formulas: ['HCF uses minimum prime powers.', 'LCM uses maximum prime powers.', 'For two numbers, HCF x LCM = product of numbers.'],
        shortcuts: ['Use Euclidean algorithm for large HCFs.', 'For fractions, HCF = HCF(numerators)/LCM(denominators); LCM is reversed.'],
        traps: ['The product identity applies directly to two positive integers.', 'Convert word conditions into common multiples or divisors first.'],
        subtopics: [
            { id: 'hcf-methods', title: 'HCF Methods', concepts: ['factorization', 'Euclidean algorithm', 'common divisors'], patterns: ['greatest measure', 'largest tile or length', 'fraction HCF'] },
            { id: 'lcm-methods', title: 'LCM Methods', concepts: ['common multiples', 'prime powers', 'fraction LCM'], patterns: ['bells and events', 'least divisible number', 'repeating schedules'] },
            { id: 'applications', title: 'HCF and LCM Applications', concepts: ['HCF versus LCM selection', 'combined constraints'], patterns: ['remainder conditions', 'groups and batches', 'same remainder questions'] }
        ]
    },
    {
        topicId: 'averages',
        prerequisites: ['fractions', 'basic arithmetic'],
        formulas: ['average = total/count', 'total = average x count', 'weighted average = sum(value x weight)/sum(weights)'],
        shortcuts: ['Use deviation from a central value.', 'When one value changes, average change = value change/count.'],
        traps: ['Do not average group averages unless group sizes match.', 'Use the correct new count after adding or removing values.'],
        subtopics: [
            { id: 'basic-average', title: 'Basic Average', concepts: ['mean and total', 'missing values', 'consecutive numbers'], patterns: ['find average', 'find missing term', 'average of sequences'] },
            { id: 'weighted-average', title: 'Weighted Average', concepts: ['groups with different sizes', 'combined average'], patterns: ['class averages', 'price and quantity', 'marks and batches'] },
            { id: 'replacement-average', title: 'Replacement and Change', concepts: ['replacement effect', 'average age', 'average speed distinction'], patterns: ['one member replaced', 'new member added', 'average changes'] }
        ]
    },
    {
        topicId: 'percentage',
        prerequisites: ['fractions', 'ratio'],
        formulas: ['percentage = part/whole x 100', 'net change for successive changes x and y = x + y + xy/100 with signs', 'new value = old value(1 +/- rate/100)'],
        shortcuts: ['Use fractions for common percentages.', 'Reverse percentage: original = final/(1 +/- rate/100).'],
        traps: ['Percentage increase and decrease use the original base.', 'Successive changes are not normally added directly.'],
        subtopics: [
            { id: 'basic-percentage', title: 'Percentage Basics', concepts: ['fraction-decimal-percentage conversion', 'part and whole'], patterns: ['find percentage', 'find part or whole', 'comparison'] },
            { id: 'successive-change', title: 'Increase, Decrease, and Successive Change', concepts: ['net percentage change', 'reverse change', 'population growth'], patterns: ['price changes', 'salary and expenditure', 'population problems'] },
            { id: 'marks-elections', title: 'Marks, Votes, and Business Applications', concepts: ['marks percentage', 'valid and invalid votes', 'percentage comparison'], patterns: ['exam marks', 'election votes', 'income-expenditure savings'] }
        ]
    },
    {
        topicId: 'profit-loss',
        prerequisites: ['percentage', 'ratio'],
        formulas: ['profit = SP - CP', 'loss = CP - SP', 'profit% = profit/CP x 100', 'discount% = discount/MP x 100'],
        shortcuts: ['Represent CP as 100 for percentage questions.', 'Successive discounts: a + b - ab/100.'],
        traps: ['Profit and loss percentages use CP; discount uses MP.', 'Markup, discount, and selling price are separate stages.'],
        subtopics: [
            { id: 'core-profit-loss', title: 'Cost, Selling Price, and Gain', concepts: ['CP, SP, MP', 'profit and loss', 'percentage bases'], patterns: ['find CP or SP', 'profit/loss percentage', 'equal SP or CP'] },
            { id: 'discount-markup', title: 'Markup and Discount', concepts: ['marked price', 'successive discounts', 'net selling price'], patterns: ['single discount', 'two discounts', 'markup followed by discount'] },
            { id: 'partnership-business', title: 'Business Applications', concepts: ['dishonest dealer', 'false weights', 'profit sharing'], patterns: ['short weight', 'mixed profit rates', 'partnership returns'] }
        ]
    },
    {
        topicId: 'simple-interest',
        prerequisites: ['percentage', 'ratio'],
        formulas: ['SI = PRT/100', 'amount = P + SI', 'rate = SI x 100/(P x T)'],
        shortcuts: ['Convert months to years before applying the formula.', 'Compare SI values by comparing P x R x T.'],
        traps: ['Simple interest always uses the original principal.', 'Keep rate and time in matching units.'],
        subtopics: [
            { id: 'si-basics', title: 'Simple Interest Basics', concepts: ['principal, rate, time, interest, amount'], patterns: ['find missing variable', 'amount questions', 'time conversion'] },
            { id: 'si-comparison', title: 'Comparisons and Installments', concepts: ['different principals and rates', 'periodic payments'], patterns: ['difference in SI', 'equal interest', 'loan repayment'] },
            { id: 'si-applications', title: 'Applied Interest Problems', concepts: ['population and depreciation analogies', 'fractional years'], patterns: ['investment returns', 'rate changes', 'multiple accounts'] }
        ]
    },
    {
        topicId: 'compound-interest',
        prerequisites: ['simple-interest', 'percentage'],
        formulas: ['A = P(1 + R/100)^T', 'CI = A - P', 'for two years, CI - SI = P(R/100)^2'],
        shortcuts: ['Use growth factors instead of repeatedly calculating interest.', 'For half-yearly compounding, halve rate and double periods.'],
        traps: ['Match compounding period, rate, and number of periods.', 'Depreciation uses (1 - R/100)^T.'],
        subtopics: [
            { id: 'ci-basics', title: 'Compound Amount and Interest', concepts: ['growth factor', 'annual compounding', 'CI versus SI'], patterns: ['find amount', 'find CI', 'difference from SI'] },
            { id: 'ci-periods', title: 'Compounding Periods', concepts: ['half-yearly and quarterly compounding', 'fractional time'], patterns: ['period conversion', 'different compounding frequencies'] },
            { id: 'growth-depreciation', title: 'Growth and Depreciation', concepts: ['appreciation', 'depreciation', 'successive growth'], patterns: ['population growth', 'value depreciation', 'inflation'] }
        ]
    },
    {
        topicId: 'ratio-proportion',
        prerequisites: ['fractions', 'percentage'],
        formulas: ['a:b = c:d means ad = bc', 'divide quantity Q in a:b as Qa/(a+b), Qb/(a+b)', 'direct proportion: x/y constant; inverse: xy constant'],
        shortcuts: ['Scale ratios before comparing.', 'Use unitary method for direct and inverse relationships.'],
        traps: ['Convert units before forming ratios.', 'Ratio order must match the wording.'],
        subtopics: [
            { id: 'ratio-basics', title: 'Ratio and Proportion Basics', concepts: ['equivalent ratios', 'simplification', 'fourth proportional'], patterns: ['divide quantity', 'compare ratios', 'find unknown term'] },
            { id: 'variation', title: 'Direct and Inverse Variation', concepts: ['direct proportion', 'inverse proportion', 'joint variation'], patterns: ['workers and days', 'speed and time', 'cost and quantity'] },
            { id: 'continued-ratio', title: 'Combined and Continued Ratios', concepts: ['compound ratio', 'continued proportion', 'componendo-dividendo'], patterns: ['three-part ratio', 'ratio changes', 'sharing applications'] }
        ]
    },
    {
        topicId: 'mixture-allegation',
        prerequisites: ['ratio', 'percentage'],
        formulas: ['cheaper:dearer = (dearer - mean):(mean - cheaper)', 'mean price = total cost/total quantity'],
        shortcuts: ['Use allegation cross-differences.', 'For concentration, treat pure quantity as the weighted component.'],
        traps: ['Mean must lie between component values for simple allegation.', 'Keep price, quantity, and concentration units consistent.'],
        subtopics: [
            { id: 'mixture-basics', title: 'Mixture and Weighted Mean', concepts: ['component quantity', 'mean price', 'concentration'], patterns: ['find mixture value', 'find missing quantity'] },
            { id: 'allegation', title: 'Allegation Rule', concepts: ['cross-difference', 'ratio of quantities'], patterns: ['two-price mixture', 'two-concentration mixture'] },
            { id: 'replacement', title: 'Replacement and Repeated Mixing', concepts: ['remove and replace', 'remaining fraction'], patterns: ['milk-water replacement', 'repeated dilution'] }
        ]
    },
    {
        topicId: 'problems-on-ages',
        prerequisites: ['linear equations', 'ratio'],
        formulas: ['future age = present age + years', 'past age = present age - years', 'age difference remains constant'],
        shortcuts: ['Represent ratio ages as multiples of x.', 'Start with the fixed age difference when it is given.'],
        traps: ['Ratios change over time; differences do not.', 'Keep the same time reference for every person.'],
        subtopics: [
            { id: 'age-equations', title: 'Age Equations', concepts: ['present, past, and future ages', 'linear equations'], patterns: ['sum and difference', 'one age in terms of another'] },
            { id: 'age-ratios', title: 'Age Ratios', concepts: ['ratio at different times', 'constant difference'], patterns: ['past/future ratio', 'parent-child ratio'] },
            { id: 'age-family', title: 'Family and Average Ages', concepts: ['family totals', 'birth and joining events'], patterns: ['average age', 'family member added', 'generation problems'] }
        ]
    },
    {
        topicId: 'time-work',
        prerequisites: ['fractions', 'LCM'],
        formulas: ['rate = work/time', 'if A takes x days, one-day work = 1/x', 'combined rate = sum of individual rates'],
        shortcuts: ['Take total work as the LCM of individual times.', 'Use efficiency ratio as inverse of time ratio.'],
        traps: ['Add rates, not days.', 'Account for partial work and breaks before combining.'],
        subtopics: [
            { id: 'work-rates', title: 'Work and Efficiency', concepts: ['work unit', 'daily rate', 'efficiency'], patterns: ['single worker', 'combined workers', 'efficiency comparison'] },
            { id: 'men-days', title: 'Men, Days, and Wages', concepts: ['M x D x H relation', 'wages proportional to work'], patterns: ['workers and time', 'wage distribution', 'changing workforce'] },
            { id: 'alternate-work', title: 'Alternating and Partial Work', concepts: ['alternate days', 'leaving midway', 'remaining work'], patterns: ['A and B alternate', 'worker joins or leaves', 'completion time'] }
        ]
    },
    {
        topicId: 'pipes-cisterns',
        prerequisites: ['time-work', 'fractions'],
        formulas: ['net rate = inlet rates - outlet rates', 'time = tank capacity/net rate'],
        shortcuts: ['Treat outlets as negative workers.', 'Use tank capacity as the LCM of pipe times.'],
        traps: ['Check whether net flow is filling or emptying.', 'Include leaks and partial opening times.'],
        subtopics: [
            { id: 'filling-emptying', title: 'Inlets and Outlets', concepts: ['fill rate', 'empty rate', 'net rate'], patterns: ['one or more inlets', 'inlet with outlet'] },
            { id: 'pipe-combinations', title: 'Pipe Combinations', concepts: ['simultaneous operation', 'different capacities'], patterns: ['which pipe closes', 'time to fill', 'time to empty'] },
            { id: 'leaks', title: 'Leaks and Partial Tanks', concepts: ['leak rate', 'initial water level', 'remaining capacity'], patterns: ['leaky tank', 'fill from a level', 'alternating valves'] }
        ]
    },
    {
        topicId: 'speed-distance',
        prerequisites: ['ratio', 'time-work'],
        formulas: ['speed = distance/time', 'distance = speed x time', 'km/h to m/s multiply 5/18; m/s to km/h multiply 18/5'],
        shortcuts: ['For equal distances, average speed = 2uv/(u+v).', 'Use relative speed for meeting and overtaking.'],
        traps: ['Average speed is total distance/total time, not average of speeds.', 'Convert units before calculating.'],
        subtopics: [
            { id: 'sd-basics', title: 'Speed, Distance, and Time', concepts: ['unit conversion', 'basic formula triangle'], patterns: ['find missing variable', 'journey time', 'distance comparison'] },
            { id: 'relative-speed', title: 'Relative Speed', concepts: ['same and opposite directions', 'meeting and overtaking'], patterns: ['trains and vehicles', 'meeting time', 'catch-up time'] },
            { id: 'average-speed', title: 'Average Speed and Journeys', concepts: ['equal and unequal distances', 'stoppage time'], patterns: ['return journey', 'average speed', 'late or early arrival'] }
        ]
    },
    {
        topicId: 'trains',
        prerequisites: ['speed-distance', 'unit conversion'],
        formulas: ['time = distance/speed', 'pole crossing distance = train length', 'platform crossing distance = train + platform lengths'],
        shortcuts: ['Opposite-direction relative speed is sum; same-direction is difference.', 'Convert km/h to m/s immediately when lengths are metres.'],
        traps: ['Use total length when two trains cross.', 'Distinguish crossing a pole, platform, bridge, or another train.'],
        subtopics: [
            { id: 'train-pole-platform', title: 'Train Crossing Objects', concepts: ['train length', 'platform and bridge length'], patterns: ['pole crossing', 'platform crossing', 'tunnel crossing'] },
            { id: 'two-trains', title: 'Two Trains', concepts: ['relative speed', 'combined lengths'], patterns: ['opposite directions', 'same direction', 'overtaking'] },
            { id: 'train-journey', title: 'Train Journey Applications', concepts: ['speed conversion', 'time gaps'], patterns: ['station timing', 'man walking beside train', 'crossing delays'] }
        ]
    },
    {
        topicId: 'boats-streams',
        prerequisites: ['speed-distance', 'ratio'],
        formulas: ['downstream = still-water speed + stream speed', 'upstream = still-water speed - stream speed', 'still-water speed = (downstream + upstream)/2'],
        shortcuts: ['Use half-sum and half-difference directly.', 'For equal distances, compare upstream/downstream times through reciprocal speeds.'],
        traps: ['Still-water speed is not stream speed.', 'Direction changes the sign of stream speed.'],
        subtopics: [
            { id: 'boat-basics', title: 'Still Water and Stream', concepts: ['boat speed', 'stream speed', 'upstream/downstream'], patterns: ['find either speed', 'one-way travel'] },
            { id: 'boat-time', title: 'Boat Travel Time', concepts: ['distance-time relation', 'round trips'], patterns: ['upstream and downstream journey', 'time difference'] },
            { id: 'boat-crossing', title: 'River Crossing Applications', concepts: ['resultant velocity', 'shortest path', 'width of river'], patterns: ['crossing river', 'reach opposite point', 'minimum time'] }
        ]
    },
    {
        topicId: 'races',
        prerequisites: ['ratio', 'speed-distance'],
        formulas: ['same-time distance ratio = speed ratio', 'if A beats B by d in L race, speed ratio A:B = L:(L-d)'],
        shortcuts: ['Set the winning distance to the full race length.', 'Convert time lead to distance using speed.'],
        traps: ['Separate distance lead from time lead.', 'A beats B by x metres means both are compared at A finishing time.'],
        subtopics: [
            { id: 'race-basics', title: 'Race Comparison', concepts: ['speed ratio', 'distance lead'], patterns: ['A beats B by metres', 'race length'] },
            { id: 'race-time', title: 'Time and Head Start', concepts: ['time lead', 'head start', 'relative speed'], patterns: ['head start in metres', 'head start in seconds'] },
            { id: 'multi-races', title: 'Multiple Race Conditions', concepts: ['three competitors', 'combined comparisons'], patterns: ['A beats B and C', 'find relative ranking', 'race reconstruction'] }
        ]
    },
    {
        topicId: 'permutation-combination',
        prerequisites: ['factorials', 'basic counting'],
        formulas: ['nPr = n!/(n-r)!', 'nCr = n!/[r!(n-r)!]', 'nCr = nC(n-r)'],
        shortcuts: ['Select first, arrange second.', 'Use complement counting for at least or not together conditions.'],
        traps: ['Order matters in permutation, not combination.', 'Account for repeated objects and circular rotations.'],
        subtopics: [
            { id: 'counting-principles', title: 'Fundamental Counting', concepts: ['addition and multiplication rules', 'factorials'], patterns: ['multi-stage choices', 'number formation'] },
            { id: 'permutations', title: 'Permutations and Arrangements', concepts: ['distinct arrangements', 'repetition', 'circular arrangement'], patterns: ['word arrangements', 'seating', 'restricted positions'] },
            { id: 'combinations', title: 'Combinations and Selection', concepts: ['selection without order', 'group formation'], patterns: ['committee selection', 'at least/at most', 'conditional selection'] }
        ]
    },
    {
        topicId: 'probability',
        prerequisites: ['permutation-combination', 'fractions'],
        formulas: ['P(E) = favourable outcomes/total outcomes', 'P(not E) = 1 - P(E)', 'P(A or B) = P(A) + P(B) - P(A and B)'],
        shortcuts: ['Use complement for at least one.', 'Count outcomes with combinations when order is irrelevant.'],
        traps: ['Define the sample space before counting.', 'Do not assume independence unless the experiment supports it.'],
        subtopics: [
            { id: 'probability-basics', title: 'Events and Sample Space', concepts: ['equally likely outcomes', 'event and complement'], patterns: ['coins and dice', 'cards', 'balls and boxes'] },
            { id: 'conditional-probability', title: 'Conditional and Compound Probability', concepts: ['independent/dependent events', 'conditional probability'], patterns: ['without replacement', 'successive draws', 'at least one'] },
            { id: 'counting-probability', title: 'Counting-Based Probability', concepts: ['permutations and combinations in probability'], patterns: ['arrangements', 'selection restrictions', 'exact number of successes'] }
        ]
    },
    {
        topicId: 'number-series',
        prerequisites: ['arithmetic', 'number system'],
        formulas: ['inspect first differences, second differences, ratios, and alternating terms'],
        shortcuts: ['Write differences under the terms.', 'Check squares, cubes, primes, and alternating operations early.'],
        traps: ['A pattern must explain every given term.', 'Do not force an overly complex rule when a simple rule fits.'],
        subtopics: [
            { id: 'difference-series', title: 'Difference and Polynomial Series', concepts: ['first and second differences', 'quadratic patterns'], patterns: ['missing term', 'wrong term', 'next term'] },
            { id: 'ratio-series', title: 'Ratio and Multiplicative Series', concepts: ['multiplication/division', 'mixed operations'], patterns: ['multiplicative sequence', 'fractional terms'] },
            { id: 'special-series', title: 'Special and Alternating Series', concepts: ['squares, cubes, primes', 'alternating positions'], patterns: ['two interleaved series', 'prime-based pattern', 'operation cycle'] }
        ]
    },
    {
        topicId: 'letter-series',
        prerequisites: ['alphabet positions'],
        formulas: ['use A=1..Z=26 or A=0..Z=25 consistently'],
        shortcuts: ['Convert letters to positions.', 'Separate odd and even positions for alternating patterns.'],
        traps: ['Check wraparound after Z.', 'Do not switch alphabet indexing midway.'],
        subtopics: [
            { id: 'alphabet-series', title: 'Alphabet Position Series', concepts: ['forward/backward movement', 'alphabet positions'], patterns: ['missing letter', 'next group'] },
            { id: 'alternating-letter', title: 'Alternating and Skipping Series', concepts: ['interleaved sequences', 'variable skips'], patterns: ['odd-even series', 'increasing skip'] },
            { id: 'letter-groups', title: 'Letter Group Patterns', concepts: ['pairs and triples', 'reverse alphabet'], patterns: ['group completion', 'analogy', 'odd group'] }
        ]
    },
    {
        topicId: 'coding-decoding',
        prerequisites: ['letter-series', 'alphabet positions'],
        formulas: ['test shifts, reversals, position values, substitutions, and rearrangements'],
        shortcuts: ['Compare first and last characters first.', 'Write alphabet positions to expose arithmetic shifts.'],
        traps: ['Infer the rule from all examples.', 'Keep encoding and decoding directions separate.'],
        subtopics: [
            { id: 'letter-coding', title: 'Letter and Word Coding', concepts: ['alphabet shifts', 'reverse coding', 'substitution'], patterns: ['coded word', 'decode word', 'same rule words'] },
            { id: 'number-coding', title: 'Number and Symbol Coding', concepts: ['position values', 'symbol replacement'], patterns: ['coded arithmetic', 'symbol meanings'] },
            { id: 'mixed-coding', title: 'Mixed and Matrix Coding', concepts: ['multiple rules', 'coded sentences'], patterns: ['common code words', 'code language', 'matrix code'] }
        ]
    },
    {
        topicId: 'blood-relations',
        prerequisites: ['basic family relations'],
        formulas: ['translate each statement to an edge in a family tree'],
        shortcuts: ['Draw generations horizontally.', 'Start from the person asked about and trace backward.'],
        traps: ['Gender may be unknown.', 'Do not assume a spouse or sibling relation not stated.'],
        subtopics: [
            { id: 'direct-relations', title: 'Direct Family Relations', concepts: ['parent, child, sibling, spouse'], patterns: ['single-chain relation', 'identify relation'] },
            { id: 'coded-relations', title: 'Coded Blood Relations', concepts: ['symbols and operators', 'gender inference'], patterns: ['symbol family tree', 'decode relation'] },
            { id: 'family-puzzles', title: 'Family Tree Puzzles', concepts: ['multiple generations', 'maternal/paternal sides'], patterns: ['count members', 'find impossible relation', 'generation questions'] }
        ]
    },
    {
        topicId: 'direction',
        prerequisites: ['basic geometry'],
        formulas: ['shortest distance = sqrt(east-west^2 + north-south^2)'],
        shortcuts: ['Use a coordinate grid.', 'Track net horizontal and vertical movement separately.'],
        traps: ['Shortest distance is not total path distance.', 'Account for left/right relative to current direction.'],
        subtopics: [
            { id: 'direction-basics', title: 'Cardinal Directions', concepts: ['north, south, east, west', 'turns and bearings'], patterns: ['final direction', 'relative position'] },
            { id: 'direction-distance', title: 'Distance and Displacement', concepts: ['net displacement', 'Pythagorean distance'], patterns: ['shortest distance', 'final coordinates'] },
            { id: 'direction-shadow', title: 'Advanced Direction Problems', concepts: ['angles and shadows', 'clockwise turns'], patterns: ['sun direction', 'multiple turns', 'coded directions'] }
        ]
    },
    {
        topicId: 'syllogism',
        prerequisites: ['set concepts', 'logical statements'],
        formulas: ['All A are B means A is inside B; no A is B means no overlap; some A are B means overlap exists'],
        shortcuts: ['Use a Venn diagram.', 'Test whether a conclusion is true in every valid diagram, not merely one.'],
        traps: ['Do not reverse universal statements.', 'Existence cannot be assumed from an all statement alone.'],
        subtopics: [
            { id: 'categorical-statements', title: 'Categorical Statements', concepts: ['all, no, some', 'set inclusion and exclusion'], patterns: ['valid conclusion', 'possibility conclusion'] },
            { id: 'venn-syllogism', title: 'Venn Diagram Method', concepts: ['diagram construction', 'overlap and containment'], patterns: ['two-statement syllogism', 'three-statement syllogism'] },
            { id: 'logical-conclusions', title: 'Conclusions and Inferences', concepts: ['necessary versus possible', 'either-or conclusions'], patterns: ['which follows', 'both follow', 'neither follows'] }
        ]
    },
    {
        topicId: 'data-sufficiency',
        prerequisites: ['algebra', 'logic'],
        formulas: ['test statement 1 alone, statement 2 alone, then both together'],
        shortcuts: ['Look for sufficiency, not the exact answer.', 'Stop calculation once uniqueness is proven.'],
        traps: ['A statement can be sufficient without directly giving a number.', 'Do not combine statements prematurely.'],
        subtopics: [
            { id: 'sufficiency-basics', title: 'Sufficiency Logic', concepts: ['unique answer', 'possible values'], patterns: ['one variable', 'yes/no question'] },
            { id: 'numeric-sufficiency', title: 'Numerical Sufficiency', concepts: ['equations and inequalities', 'range constraints'], patterns: ['find x', 'compare quantities', 'integer conditions'] },
            { id: 'logic-sufficiency', title: 'Logical and Geometric Sufficiency', concepts: ['properties versus values', 'diagram constraints'], patterns: ['shape properties', 'arrangement conditions', 'combined statements'] }
        ]
    },
    {
        topicId: 'data-arrangement',
        prerequisites: ['logic', 'direction'],
        formulas: ['translate each clue into position, adjacency, ordering, or exclusion constraints'],
        shortcuts: ['Place fixed positions and strongest restrictions first.', 'Use a table for multiple attributes.'],
        traps: ['Circular rotations may be identical.', 'Do not infer a relationship from missing information.'],
        subtopics: [
            { id: 'linear-arrangement', title: 'Linear Arrangement', concepts: ['left/right positions', 'adjacency', 'ordering'], patterns: ['row seating', 'ranking', 'floor arrangement'] },
            { id: 'circular-arrangement', title: 'Circular Arrangement', concepts: ['clockwise/anticlockwise', 'facing center/outside'], patterns: ['round table', 'relative neighbors', 'mixed facing'] },
            { id: 'multi-attribute', title: 'Grouping and Scheduling', concepts: ['categories and slots', 'conditional constraints'], patterns: ['group distribution', 'day/time schedule', 'matching puzzle'] }
        ]
    },
    {
        topicId: 'data-interpretation',
        prerequisites: ['percentage', 'ratio', 'averages'],
        formulas: ['percentage change = change/original x 100', 'read units and scale before calculating'],
        shortcuts: ['Estimate answer ranges first.', 'Use ratios before exact arithmetic where possible.'],
        traps: ['Check axis scale and units.', 'Do not compare percentages with different bases.'],
        subtopics: [
            { id: 'tables-charts', title: 'Tables and Charts', concepts: ['row/column reading', 'bar and line charts'], patterns: ['totals', 'difference', 'maximum/minimum'] },
            { id: 'pie-graphs', title: 'Pie Charts and Percentages', concepts: ['angles and sectors', 'part-whole conversion'], patterns: ['sector value', 'percentage share', 'combined sectors'] },
            { id: 'caselet-di', title: 'Caselet and Comparison DI', concepts: ['multi-step data', 'ratio, average, and growth'], patterns: ['caselet questions', 'data comparison', 'missing data'] }
        ]
    },
    {
        topicId: 'venn-diagram',
        prerequisites: ['sets', 'percentage'],
        formulas: ['n(A union B) = n(A) + n(B) - n(A intersection B)', 'for three sets use inclusion-exclusion'],
        shortcuts: ['Fill intersections first.', 'Use total - union for neither.'],
        traps: ['Do not count overlaps twice.', 'Distinguish exactly one, at least one, and both.'],
        subtopics: [
            { id: 'two-set', title: 'Two-Set Venn Diagrams', concepts: ['union and intersection', 'only A and only B'], patterns: ['language survey', 'preference questions'] },
            { id: 'three-set', title: 'Three-Set Venn Diagrams', concepts: ['triple intersection', 'inclusion-exclusion'], patterns: ['three subjects', 'exactly two sets'] },
            { id: 'set-applications', title: 'Set and Group Applications', concepts: ['neither', 'at least/at most'], patterns: ['population groups', 'survey data', 'count validation'] }
        ]
    },
    {
        topicId: 'clocks-calendars',
        prerequisites: ['angles', 'division'],
        formulas: ['minute hand = 6 degrees/minute', 'hour hand = 0.5 degrees/minute', 'odd days determine calendar shifts'],
        shortcuts: ['Clock angle = |30H - 5.5M|.', 'Use 400-year Gregorian cycle for repeated calendar patterns.'],
        traps: ['The hour hand moves continuously.', 'Century years are leap years only when divisible by 400.'],
        subtopics: [
            { id: 'clock-angles', title: 'Clock Angles', concepts: ['hand movement', 'coincidence and opposite positions'], patterns: ['angle at time', 'hands meet', 'right angle'] },
            { id: 'clock-gain-loss', title: 'Clock Gain and Loss', concepts: ['correct and incorrect clocks', 'time ratio'], patterns: ['clock gains/loses', 'find correct time'] },
            { id: 'calendar', title: 'Calendars and Odd Days', concepts: ['leap years', 'day of week', 'odd days'], patterns: ['day on date', 'same calendar', 'count weekdays'] }
        ]
    },
    {
        topicId: 'cube',
        prerequisites: ['geometry', 'counting'],
        formulas: ['cube has 6 faces, 12 edges, 8 vertices', 'n x n x n cube has n^3 small cubes', 'cuts create sections, not pieces directly'],
        shortcuts: ['Classify pieces by 3, 2, 1, or 0 painted faces.', 'Use (n-2)^3 for unpainted inner cubes.'],
        traps: ['n cuts along an edge create n+1 sections.', 'Painted-face counts depend on whether all outer faces are painted.'],
        subtopics: [
            { id: 'cube-properties', title: 'Cube Properties', concepts: ['faces, edges, vertices', 'opposite faces'], patterns: ['count elements', 'identify opposite face'] },
            { id: 'painted-cubes', title: 'Painted and Cut Cubes', concepts: ['corner, edge, face, inner cubes'], patterns: ['number by painted faces', 'cuts and pieces'] },
            { id: 'dice', title: 'Dice and Cubical Blocks', concepts: ['standard dice', 'folded cube nets'], patterns: ['opposite faces', 'visible faces', 'cube unfolding'] }
        ]
    },
    {
        topicId: 'visual-reasoning',
        prerequisites: ['spatial awareness'],
        formulas: ['track orientation, position, count, and shading independently'],
        shortcuts: ['Find the smallest feature that changes consistently.', 'For mirror images, reverse left and right only.'],
        traps: ['Rotation is not reflection.', 'Count elements before interpreting their shape.'],
        subtopics: [
            { id: 'pattern-completion', title: 'Pattern Completion', concepts: ['shape progression', 'position and count changes'], patterns: ['next figure', 'missing figure'] },
            { id: 'rotation-reflection', title: 'Rotation and Reflection', concepts: ['clockwise rotation', 'mirror image'], patterns: ['rotated object', 'water image', 'mirror image'] },
            { id: 'folding-counting', title: 'Folding and Figure Counting', concepts: ['paper folding', 'embedded figures', 'shading'], patterns: ['folded paper holes', 'count triangles', 'hidden figure'] }
        ]
    },
    {
        topicId: 'odd-one-out',
        prerequisites: ['number system', 'visual reasoning'],
        formulas: ['compare category, numerical pattern, shape, spelling, position, and relationship'],
        shortcuts: ['Find the strongest rule shared by most options.', 'Test simple properties before obscure ones.'],
        traps: ['Avoid coincidental properties.', 'The odd item may differ by structure, not value alone.'],
        subtopics: [
            { id: 'numeric-odd-one', title: 'Numerical Odd One Out', concepts: ['prime, square, parity, divisibility'], patterns: ['number classification', 'sequence exception'] },
            { id: 'word-odd-one', title: 'Word and Letter Odd One Out', concepts: ['alphabet positions', 'spelling and category'], patterns: ['word category', 'letter relation'] },
            { id: 'figure-odd-one', title: 'Figure Odd One Out', concepts: ['rotation, symmetry, count, shading'], patterns: ['shape classification', 'visual exception'] }
        ]
    },
    {
        topicId: 'geometry',
        prerequisites: ['basic arithmetic', 'angles'],
        formulas: ['triangle angles = 180 degrees', 'rectangle area = lb', 'circle area = pi r^2', 'circle circumference = 2 pi r'],
        shortcuts: ['Mark equal sides, parallels, and right angles first.', 'Use similarity when shapes share angles.'],
        traps: ['Use radius, not diameter, in circle formulas.', 'Area and perimeter are different quantities.'],
        subtopics: [
            { id: 'lines-angles', title: 'Lines and Angles', concepts: ['parallel lines', 'transversal angles', 'polygons'], patterns: ['unknown angle', 'angle chasing'] },
            { id: 'triangles', title: 'Triangles and Similarity', concepts: ['congruence', 'similarity', 'Pythagorean theorem'], patterns: ['side/angle finding', 'height and median', 'similar triangles'] },
            { id: 'mensuration', title: '2D Mensuration', concepts: ['perimeter and area', 'circle and composite shapes'], patterns: ['shaded region', 'path around shape', 'area change'] }
        ]
    },
    {
        topicId: 'height-distance',
        prerequisites: ['trigonometry', 'geometry'],
        formulas: ['tan theta = opposite/adjacent', 'sin theta = opposite/hypotenuse', 'cos theta = adjacent/hypotenuse'],
        shortcuts: ['Memorize 30, 45, and 60 degree values.', 'Draw the horizontal line from the observer first.'],
        traps: ['Angle of elevation/depression is measured from the horizontal.', 'Use consistent height and distance units.'],
        subtopics: [
            { id: 'trig-basics', title: 'Trigonometric Ratios', concepts: ['sin, cos, tan', 'special angles'], patterns: ['find side', 'find angle'] },
            { id: 'elevation-depression', title: 'Elevation and Depression', concepts: ['line of sight', 'horizontal reference'], patterns: ['tower and observer', 'angle of depression'] },
            { id: 'multiple-observers', title: 'Multiple Observation Problems', concepts: ['two positions', 'angles changing with distance'], patterns: ['moving observer', 'two towers', 'shadow problems'] }
        ]
    },
    {
        topicId: 'logarithms',
        prerequisites: ['indices and exponents'],
        formulas: ['log_a(xy) = log_a x + log_a y', 'log_a(x/y) = log_a x - log_a y', 'log_a(x^n) = n log_a x', 'log_a b = log_c b/log_c a'],
        shortcuts: ['Convert all terms to one base.', 'Rewrite powers before applying log rules.'],
        traps: ['Base is positive and not 1; argument is positive.', 'log(x + y) is not log x + log y.'],
        subtopics: [
            { id: 'log-basics', title: 'Logarithm Definition', concepts: ['base and argument', 'exponential inverse'], patterns: ['evaluate log', 'convert exponential form'] },
            { id: 'log-laws', title: 'Laws of Logarithms', concepts: ['product, quotient, power laws'], patterns: ['simplify expression', 'combine logs'] },
            { id: 'log-equations', title: 'Logarithmic Equations', concepts: ['domain restrictions', 'change of base'], patterns: ['solve equation', 'compare logarithms', 'nested logs'] }
        ]
    },
    {
        topicId: 'game-aptitude',
        prerequisites: ['logic', 'data arrangement'],
        formulas: ['define goal, list legal moves, track state, and compare future outcomes'],
        shortcuts: ['Write rules as a checklist.', 'Complete fixed constraints before flexible choices.'],
        traps: ['A locally good move may violate a later constraint.', 'Track every state change explicitly.'],
        subtopics: [
            { id: 'game-rules', title: 'Rules and State Tracking', concepts: ['legal/illegal moves', 'state representation'], patterns: ['select valid move', 'identify impossible state'] },
            { id: 'game-strategy', title: 'Strategy and Optimization', concepts: ['lookahead', 'minimax-style choices', 'resource limits'], patterns: ['best next move', 'maximum score', 'minimum moves'] },
            { id: 'scheduling-games', title: 'Scheduling and Constraint Games', concepts: ['slots, priorities, dependencies'], patterns: ['task scheduling', 'route planning', 'resource allocation'] }
        ]
    },
    {
        topicId: 'mixed-aptitude',
        prerequisites: ['all core topics'],
        formulas: ['classify first: percentage, ratio, rate, counting, logic, or data interpretation'],
        shortcuts: ['Secure easy marks first.', 'Estimate before exact calculation and use option elimination.'],
        traps: ['Do not apply a familiar formula before identifying the question type.', 'Watch for mixed units and changing bases.'],
        subtopics: [
            { id: 'mixed-arithmetic', title: 'Mixed Quantitative Questions', concepts: ['method selection', 'multi-concept arithmetic'], patterns: ['company arithmetic', 'multi-step word problem'] },
            { id: 'mixed-reasoning', title: 'Mixed Reasoning Questions', concepts: ['series, arrangement, relations, deduction'], patterns: ['logic set', 'company reasoning section'] },
            { id: 'company-patterns', title: 'Placement and Company Patterns', concepts: ['timed sections', 'negative marking', 'question prioritization'], patterns: ['TCS-style', 'Infosys-style', 'general placement mix'] }
        ]
    }
];

export const getKnowledgeMapByTopic = (topicId) =>
    APTITUDE_KNOWLEDGE_MAP.find(topic => topic.topicId === topicId) || null;

export const getKnowledgeMapTopics = () => APTITUDE_KNOWLEDGE_MAP;
