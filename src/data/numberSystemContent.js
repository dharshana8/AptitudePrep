export const numberSystemContent = {
  topicId: 'number-system',
  title: 'Number System',
  description: 'Foundation of all quantitative aptitude. Understand types of numbers, properties, and operations.',
  category: 'quantitative',
  subTopics: [
    {
      id: 'basics',
      title: 'Basics of Number System',
      explanation: `The number system is the foundation of mathematics. Numbers are mathematical objects used to count, measure, and label.

**Types of Numbers:**
- **Natural Numbers (N):** 1, 2, 3, 4, 5... (Counting numbers starting from 1)
- **Whole Numbers (W):** 0, 1, 2, 3, 4... (Natural numbers including 0)
- **Integers (Z):** ...-3, -2, -1, 0, 1, 2, 3... (Positive and negative whole numbers)
- **Rational Numbers (Q):** Numbers that can be expressed as p/q where q ≠ 0
- **Irrational Numbers:** Numbers that cannot be expressed as p/q (√2, π, e)
- **Real Numbers (R):** All rational and irrational numbers
- **Complex Numbers:** Numbers of the form a + bi

**Important Properties:**
- Every natural number is a whole number
- Every whole number is an integer
- Every integer is a rational number
- Every rational number is a real number`,
      examples: [
        { difficulty: 'Easy', question: 'Is 0 a natural number?', answer: 'No, 0 is not a natural number. Natural numbers start from 1.' },
        { difficulty: 'Easy', question: 'Classify -5. What type of number is it?', answer: 'It is an integer, a rational number, and a real number.' },
        { difficulty: 'Medium', question: 'Is √4 rational or irrational?', answer: '√4 = 2, which is rational. Not all square roots are irrational.' },
      ],
      shortcuts: ['Natural numbers start from 1, whole numbers from 0. The only difference is 0.'],
      tricks: ['If a number is divisible by 2, it is even. All other integers are odd.'],
      commonMistakes: [
        'Confusing natural numbers with whole numbers (forgetting 0 is a whole number)',
        'Thinking all square roots are irrational',
      ],
    },
    {
      id: 'natural-numbers',
      title: 'Natural Numbers',
      explanation: `Natural numbers are the counting numbers: 1, 2, 3, 4, 5, ...

**Properties:**
- Smallest natural number = 1
- There is no largest natural number
- They are closed under addition and multiplication
- They are NOT closed under subtraction or division

**Important Formulas:**
- Sum of first n natural numbers: n(n+1)/2
- Sum of squares of first n natural numbers: n(n+1)(2n+1)/6
- Sum of cubes of first n natural numbers: [n(n+1)/2]²`,
      examples: [
        { difficulty: 'Easy', question: 'Find the sum of first 10 natural numbers.', answer: 'n = 10, Sum = 10(11)/2 = 55' },
        { difficulty: 'Medium', question: 'Find the sum of squares of first 5 natural numbers.', answer: 'n = 5, Sum = 5(6)(11)/6 = 55' },
        { difficulty: 'Hard', question: 'Find the sum of first 20 natural numbers.', answer: 'n = 20, Sum = 20(21)/2 = 210' },
      ],
      shortcuts: ['Sum of first n natural numbers = n(n+1)/2'],
      tricks: ['If you need sum from a to b, compute sum(1 to b) - sum(1 to a-1)'],
      commonMistakes: ['Forgetting that natural numbers start from 1, not 0'],
    },
    {
      id: 'whole-numbers',
      title: 'Whole Numbers',
      explanation: `Whole numbers are natural numbers including 0: 0, 1, 2, 3, ...

**Properties:**
- Smallest whole number = 0
- No largest whole number
- Closed under addition and multiplication
- Not closed under subtraction or division

**Key Differences from Natural Numbers:**
- Whole numbers include 0
- 0 is the additive identity (a + 0 = a)
- 0 is NOT the multiplicative identity (a × 0 = 0)
- Division by 0 is undefined`,
      examples: [
        { difficulty: 'Easy', question: 'What is the smallest whole number?', answer: '0' },
        { difficulty: 'Easy', question: 'Is 0 a natural number?', answer: 'No, 0 is a whole number but not a natural number.' },
      ],
      shortcuts: [],
      tricks: ['Remember: W = N ∪ {0}. The only difference between natural and whole numbers is 0.'],
      commonMistakes: ['Confusing whole numbers with natural numbers', 'Thinking 0 is a natural number'],
    },
    {
      id: 'integers',
      title: 'Integers',
      explanation: `Integers include all whole numbers and their negatives: ..., -3, -2, -1, 0, 1, 2, 3, ...

**Properties:**
- No smallest or largest integer
- Closed under addition, subtraction, and multiplication
- NOT closed under division
- 0 is the additive identity
- 1 is the multiplicative identity

**On Number Line:**
- Positive integers are to the right of 0
- Negative integers are to the left of 0
- 0 is neither positive nor negative`,
      examples: [
        { difficulty: 'Easy', question: 'Is -3 an integer?', answer: 'Yes, -3 is a negative integer.' },
        { difficulty: 'Medium', question: 'What is the sum of -7 and 12?', answer: '-7 + 12 = 5' },
      ],
      shortcuts: ['For two integers a and b: a - b = a + (-b)'],
      tricks: ['Multiplying two negative numbers gives a positive result: (-a) × (-b) = a × b'],
      commonMistakes: ['Thinking 0 is positive or negative', 'Forgetting that subtraction of integers is adding the negative'],
    },
    {
      id: 'divisibility',
      title: 'Divisibility Rules',
      explanation: `Divisibility rules help determine if a number is divisible by another without actual division.

**Key Rules:**
- **By 2:** Last digit is even (0, 2, 4, 6, 8)
- **By 3:** Sum of digits is divisible by 3
- **By 4:** Last two digits form a number divisible by 4
- **By 5:** Last digit is 0 or 5
- **By 6:** Divisible by both 2 and 3
- **By 7:** Double the last digit, subtract from rest. If result divisible by 7, so is the number
- **By 8:** Last three digits form a number divisible by 8
- **By 9:** Sum of digits is divisible by 9
- **By 10:** Last digit is 0
- **By 11:** Difference between sum of digits at odd positions and even positions is divisible by 11`,
      examples: [
        { difficulty: 'Easy', question: 'Is 3456 divisible by 3?', answer: 'Sum = 3+4+5+6 = 18. 18/3 = 6. Yes, divisible by 3.' },
        { difficulty: 'Medium', question: 'Is 72948 divisible by 11?', answer: 'Odd positions: 7+9+8 = 24. Even positions: 2+4+4 = 10. Difference = 24-10 = 14. Not divisible by 11.' },
        { difficulty: 'Hard', question: 'Find the smallest 3-digit number divisible by 6, 8, and 12.', answer: 'LCM(6,8,12) = 24. Smallest 3-digit multiple of 24 = 120.' },
      ],
      shortcuts: ['Divisible by 6 means divisible by both 2 and 3', 'Divisible by 12 means divisible by both 3 and 4'],
      tricks: ['For divisibility by 7: Remove last digit, subtract 2×last digit. Repeat until you get a small number.'],
      commonMistakes: ['Confusing divisibility by 7 and 11 rules', 'Not checking both conditions for divisibility by 6'],
    },
    {
      id: 'factors',
      title: 'Factors',
      explanation: `A factor of a number is a number that divides it exactly without leaving a remainder.

**Properties:**
- 1 is a factor of every number
- Every number is a factor of itself
- Factors of a number are always less than or equal to the number
- A number with exactly 2 factors (1 and itself) is prime
- Number of factors can be found using prime factorization

**Finding Number of Factors:**
If N = p₁^a × p₂^b × p₃^c, then number of factors = (a+1)(b+1)(c+1)

**Sum of Factors:**
If N = p₁^a × p₂^b, sum = (p₁^(a+1)-1)/(p₁-1) × (p₂^(b+1)-1)/(p₂-1)`,
      examples: [
        { difficulty: 'Easy', question: 'Find all factors of 12.', answer: '1, 2, 3, 4, 6, 12. Total: 6 factors.' },
        { difficulty: 'Medium', question: 'How many factors does 360 have?', answer: '360 = 2³ × 3² × 5¹. Factors = (3+1)(2+1)(1+1) = 24.' },
        { difficulty: 'Hard', question: 'How many factors of 720 are perfect squares?', answer: '720 = 2⁴ × 3² × 5¹. For perfect square factors, exponents must be even. Choices: 2^0,2^2,2^4 × 3^0,3^2 × 5^0 = 3×2×1 = 6.' },
      ],
      shortcuts: ['Number of factors = product of (exponent+1) for each prime factor'],
      tricks: ['To find factors of N, only check up to √N. If i divides N, then N/i also divides N.'],
      commonMistakes: ['Forgetting 1 and the number itself are always factors', 'Incorrect prime factorization'],
    },
    {
      id: 'multiples',
      title: 'Multiples',
      explanation: `A multiple of a number is the product of that number and any integer.

**Properties:**
- Every number is a multiple of itself
- 0 is a multiple of every number
- Multiples of a number are always greater than or equal to the number
- There are infinitely many multiples of any number

**LCM (Least Common Multiple):**
The smallest number that is a multiple of two or more numbers.
- LCM(a,b) = (a × b) / HCF(a,b)
- LCM is useful for finding when events coincide`,
      examples: [
        { difficulty: 'Easy', question: 'List the first 5 multiples of 7.', answer: '7, 14, 21, 28, 35' },
        { difficulty: 'Medium', question: 'Find LCM of 12 and 18.', answer: 'HCF(12,18) = 6. LCM = (12×18)/6 = 36.' },
        { difficulty: 'Hard', question: 'Two bells ring every 12 and 18 minutes. If they ring together at 9:00 AM, when will they ring together again?', answer: 'LCM(12,18) = 36. They ring together at 9:36 AM.' },
      ],
      shortcuts: ['LCM(a,b) = (a×b)/HCF(a,b)'],
      tricks: ['LCM is always ≥ max(a,b). HCF is always ≤ min(a,b).'],
      commonMistakes: ['Confusing factors with multiples', 'Using HCM instead of LCM'],
    },
    {
      id: 'prime-numbers',
      title: 'Prime Numbers',
      explanation: `A prime number is a natural number greater than 1 that has exactly two factors: 1 and itself.

**First 25 Prime Numbers:**
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97

**Key Properties:**
- 2 is the only even prime number
- 1 is NOT a prime number
- Every composite number has at least one prime factor
- There are infinitely many prime numbers (Euclid's theorem)

**Sieve of Eratosthenes:**
Method to find all primes up to a given number by eliminating multiples of each prime.`,
      examples: [
        { difficulty: 'Easy', question: 'Is 1 a prime number?', answer: 'No. 1 has only one factor (itself), but primes must have exactly two factors.' },
        { difficulty: 'Medium', question: 'Find all prime numbers between 20 and 40.', answer: '23, 29, 31, 37' },
        { difficulty: 'Hard', question: 'How many prime numbers are there between 1 and 100?', answer: '25 prime numbers.' },
      ],
      shortcuts: ['To check if N is prime, check divisibility only up to √N'],
      tricks: ['All prime numbers except 2 are odd. If N is odd and not divisible by any prime ≤ √N, it is prime.'],
      commonMistakes: ['Thinking 1 is prime', 'Forgetting 2 is prime (and the only even prime)'],
    },
    {
      id: 'composite-numbers',
      title: 'Composite Numbers',
      explanation: `A composite number is a natural number greater than 1 that is NOT prime (has more than 2 factors).

**Properties:**
- 1 is neither prime nor composite
- All even numbers greater than 2 are composite
- The smallest composite number is 4
- Every composite number can be expressed as a product of primes (Fundamental Theorem of Arithmetic)

**Goldbach's Conjecture:**
Every even number greater than 2 can be expressed as the sum of two primes.`,
      examples: [
        { difficulty: 'Easy', question: 'Is 15 prime or composite?', answer: '15 = 3 × 5. It has factors 1, 3, 5, 15. It is composite.' },
        { difficulty: 'Medium', question: 'How many composite numbers are there between 1 and 20?', answer: 'Composite numbers: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20. Total: 11.' },
      ],
      shortcuts: [],
      tricks: ['If a number has at least 3 factors, it is composite.'],
      commonMistakes: ['Thinking 1 is composite', 'Forgetting that even numbers > 2 are always composite'],
    },
  ],
  youtubeReferences: [
    {
      title: 'Number System - Complete Concept',
      url: 'https://www.youtube.com/results?search_query=number+system+aptitude+complete+concept+solved+questions',
      channel: 'YouTube search results',
      description: 'Find complete concept lessons and solved questions for Number System.',
    },
  ],
};

numberSystemContent.subTopics = numberSystemContent.subTopics.map(subTopic => ({
  ...subTopic,
  keyPoints: [
    `Definition: ${subTopic.explanation.split('\n')[0]}`,
    ...(subTopic.keyPoints || []),
    'Placement approach: identify the number type or property first, then apply the shortest valid rule.',
  ],
  shortcuts: [
    ...(subTopic.shortcuts || []),
    'Write the relevant formula before substituting values; this prevents sign and denominator mistakes.',
    'For multiple-choice questions, test options against the rule instead of completing a long calculation.',
  ],
  tricks: [
    ...(subTopic.tricks || []),
    'Check boundary values such as 0, 1, negative numbers and perfect squares because they expose common traps.',
    'Use prime factorization whenever a question asks about factors, multiples, HCF or LCM.',
  ],
}));

const numberSystemGuides = {
  basics: {
    shortcuts: [
      { title: 'Natural vs Whole', whenToUse: 'Use when a question asks whether 0 belongs to a number set.', example: 'Natural = 1, 2, 3...; Whole = 0, 1, 2, 3...', placementQuestion: 'Is 0 a natural number? No. It is a whole number.' },
      { title: 'Number-set chain', whenToUse: 'Use to classify a number into every set it belongs to.', example: '−5 is an integer, rational number and real number.', placementQuestion: 'Classify 7/2: it is rational and real, but not an integer.' },
      { title: 'Even and odd operations', whenToUse: 'Use when only parity is asked and exact calculation is unnecessary.', example: 'Odd + Odd = Even; Even × any integer = Even.', placementQuestion: 'The product of three consecutive integers is always even because one factor is even.' },
    ],
  },
  'natural-numbers': {
    shortcuts: [
      { title: 'Sum of first n numbers', whenToUse: 'Use for 1 + 2 + ... + n.', example: 'Sum to 20 = 20 × 21 / 2 = 210.', placementQuestion: 'Find 1 + 2 + ... + 50 = 50 × 51 / 2 = 1275.' },
      { title: 'Sum between two limits', whenToUse: 'Use for consecutive ranges without adding every term.', example: 'Sum 11 to 20 = sum to 20 − sum to 10 = 210 − 55 = 155.', placementQuestion: 'Find the sum from 31 to 40 = 820 − 465 = 355.' },
      { title: 'Pairing terms', whenToUse: 'Use when first and last terms have a simple constant sum.', example: '1 + 100, 2 + 99, ... gives 50 pairs of 101.', placementQuestion: 'Sum 1 to 100 = 50 × 101 = 5050.' },
    ],
  },
  'whole-numbers': {
    shortcuts: [
      { title: 'Whole = Natural + 0', whenToUse: 'Use to answer membership questions instantly.', example: '0 is whole; 1, 2 and 3 are both natural and whole.', placementQuestion: 'Which is not whole: 0, 5, −2, 12? Answer: −2.' },
      { title: 'Zero identities', whenToUse: 'Use in operation-property questions.', example: 'a + 0 = a, but a × 0 = 0.', placementQuestion: 'Why is division by 0 undefined? No number multiplied by 0 can produce a non-zero dividend.' },
      { title: 'Closure check', whenToUse: 'Use when asked whether an operation always stays in the set.', example: 'Whole numbers are closed under addition, but 2 − 5 = −3 is not whole.', placementQuestion: 'Are whole numbers closed under division? No, 1 ÷ 2 is not whole.' },
    ],
  },
  integers: {
    shortcuts: [
      { title: 'Sign rules', whenToUse: 'Use for fast addition and multiplication of signed integers.', example: '(−3) × (−4) = +12; (−3) × 4 = −12.', placementQuestion: 'What is −8 + 13? Subtract magnitudes and keep the sign of 13: 5.' },
      { title: 'Integer number line', whenToUse: 'Use for comparisons and addition/subtraction.', example: '−7 is less than −2 because it lies further left.', placementQuestion: 'Arrange −3, 0, −8, 5: −8, −3, 0, 5.' },
      { title: 'Absolute value', whenToUse: 'Use for distance from zero or magnitude questions.', example: '|−12| = 12 and |12| = 12.', placementQuestion: 'The distance between −4 and 6 is |6 − (−4)| = 10.' },
    ],
  },
  divisibility: {
    shortcuts: [
      { title: 'Digit-sum test for 3 and 9', whenToUse: 'Use for very large numbers.', example: '738 has digit sum 18, so it is divisible by both 3 and 9.', placementQuestion: 'Is 987654321 divisible by 9? Digit sum = 45, so yes.' },
      { title: 'Last digits for 4 and 8', whenToUse: 'Use because powers of 10 are divisible by 4 and 8.', example: '2316: last two digits 16, so divisible by 4. 73152: last three digits 152, so divisible by 8.', placementQuestion: 'Is 456712 divisible by 8? Check 712; 712 ÷ 8 = 89, so yes.' },
      { title: 'Alternating sum for 11', whenToUse: 'Use for divisibility by 11 without long division.', example: '121: (1 + 1) − 2 = 0, so divisible by 11.', placementQuestion: 'For 72948, (7 + 9 + 8) − (2 + 4) = 18, not a multiple of 11.' },
    ],
  },
  factors: {
    shortcuts: [
      { title: 'Factor count formula', whenToUse: 'Use after prime factorisation.', example: '360 = 2³ × 3² × 5, so factors = (3+1)(2+1)(1+1) = 24.', placementQuestion: 'How many factors does 72 = 2³ × 3² have? 4 × 3 = 12.' },
      { title: 'Factor pairs up to √n', whenToUse: 'Use to list factors quickly.', example: 'For 36, check only 1 through 6; each divisor gives a pair.', placementQuestion: 'The factor pair for 36 using 4 is 4 and 9.' },
      { title: 'Perfect-square factor count', whenToUse: 'Use when counting square factors.', example: 'For 2⁴ × 3², square exponents are 0,2,4 and 0,2: 3 × 2 = 6.', placementQuestion: 'A square factor can use only even prime exponents.' },
    ],
  },
  multiples: {
    shortcuts: [
      { title: 'LCM by prime powers', whenToUse: 'Use for the first common occurrence or repeating events.', example: 'LCM(12,18) = 2² × 3² = 36.', placementQuestion: 'Bells ring every 12 and 18 minutes; together again after 36 minutes.' },
      { title: 'HCF × LCM identity', whenToUse: 'Use when HCF and one number are known.', example: 'For 12 and 18, LCM = 12 × 18 / 6 = 36.', placementQuestion: 'If HCF = 5 and numbers are 25 and 40, LCM = 25 × 40 / 5 = 200.' },
      { title: 'Consecutive product', whenToUse: 'Use for products of consecutive integers.', example: 'n(n+1) is always divisible by 2 because one factor is even.', placementQuestion: 'n(n+1)(n+2) is always divisible by 6: one factor is even and one is divisible by 3.' },
    ],
  },
  'prime-numbers': {
    shortcuts: [
      { title: 'Check only up to √n', whenToUse: 'Use to test whether n is prime.', example: 'To test 97, check prime divisors only up to √97 < 10: 2, 3, 5, 7.', placementQuestion: 'Is 91 prime? No, 91 = 7 × 13.' },
      { title: 'Only even prime', whenToUse: 'Use to eliminate options quickly.', example: '2 is prime; every even number greater than 2 is composite.', placementQuestion: 'The only even prime number is 2.' },
      { title: 'Prime factor uniqueness', whenToUse: 'Use in factorisation and divisibility questions.', example: '84 = 2² × 3 × 7.', placementQuestion: 'The distinct prime factors of 60 are 2, 3 and 5.' },
    ],
  },
  'composite-numbers': {
    shortcuts: [
      { title: 'Composite means more than two factors', whenToUse: 'Use to classify numbers greater than 1.', example: '15 has 1, 3, 5, 15, so it is composite.', placementQuestion: 'The smallest composite number is 4.' },
      { title: 'Exclude 1', whenToUse: 'Use in prime/composite counting questions.', example: '1 is neither prime nor composite.', placementQuestion: 'Between 1 and 5, 4 is composite; 1 is neither.' },
      { title: 'Even-number filter', whenToUse: 'Use to classify large even numbers instantly.', example: 'Every even number greater than 2 is composite.', placementQuestion: '248 is composite because it is even and greater than 2.' },
    ],
  },
};

numberSystemContent.subTopics = numberSystemContent.subTopics.map(subTopic => ({
  ...subTopic,
  shortcutGuides: numberSystemGuides[subTopic.id]?.shortcuts || [],
}));

numberSystemContent.subTopics.push(
  {
    id: 'remainders',
    title: 'Remainders and Modular Arithmetic',
    explanation: `A remainder is what is left after division. If a = dq + r, then r is always less than d. Modular arithmetic lets us work with remainders without calculating the full number.`,
    examples: [{ difficulty: 'Easy', question: 'What is the remainder when 29 is divided by 7?', answer: '29 = 7 × 4 + 1, so the remainder is 1.' }, { difficulty: 'Medium', question: 'What is the remainder when 2³ is divided by 5?', answer: '8 ÷ 5 leaves remainder 3.' }],
    shortcuts: ['The remainder is always from 0 to divisor − 1.', 'Reduce every factor modulo the divisor before multiplying.', 'If a number is exactly divisible, its remainder is 0.'],
    tricks: ['For a large power, look for a repeating remainder cycle.', 'Replace a number by its remainder before adding or multiplying.', 'For negative remainders, add the divisor to get the standard positive remainder.'],
    commonMistakes: ['Writing a remainder equal to or greater than the divisor.', 'Using the quotient instead of the remainder.', 'Forgetting that the divisor must be non-zero.'],
    shortcutGuides: [{ title: 'Remainder range', whenToUse: 'Use in every remainder question to eliminate impossible options.', example: 'Division by 7 can only produce 0, 1, 2, 3, 4, 5 or 6.', placementQuestion: 'The remainder when a number is divided by 7 cannot be 7.' }, { title: 'Reduce before multiplying', whenToUse: 'Use for large products.', example: '123 × 47 mod 5 = 3 × 2 mod 5 = 1.', placementQuestion: 'Find 123 × 47 remainder 5: answer 1.' }],
  },
  {
    id: 'unit-digit',
    title: 'Unit Digit',
    explanation: `The unit digit is the last digit of a number. Powers often repeat their unit digits in short cycles, so only the exponent's position in the cycle matters.`,
    examples: [{ difficulty: 'Medium', question: 'Find the unit digit of 7²³.', answer: '7 repeats 7, 9, 3, 1. 23 mod 4 = 3, so the unit digit is 3.' }],
    shortcuts: ['For powers ending in 0, 1, 5 or 6, the unit digit never changes.', 'For 2, 3, 7 and 8, use a cycle of 4.', 'For exponent n, use n mod cycle length; treat remainder 0 as the last cycle position.'],
    tricks: ['Ignore all digits except the unit digit before calculating a power.', 'For a product, multiply unit digits and keep only the final digit.', 'Write the cycle once beside the question to avoid mental errors.'],
    commonMistakes: ['Using exponent 0 as cycle position 0 instead of unit digit 1.', 'Forgetting that a remainder of 0 means the last cycle item.', 'Calculating the complete power unnecessarily.'],
    shortcutGuides: [{ title: 'Cycle of 7', whenToUse: 'Use for powers of 7.', example: '7, 9, 3, 1 repeat. 7²³: 23 mod 4 = 3, answer 3.', placementQuestion: 'Find the unit digit of 7¹⁰²: 102 mod 4 = 2, answer 9.' }, { title: 'Fixed unit digits', whenToUse: 'Use for bases ending in 0, 1, 5 or 6.', example: '35⁹ always ends in 5.', placementQuestion: 'The unit digit of 16¹²³ is 6.' }],
  },
  {
    id: 'cyclicity',
    title: 'Cyclicity of Powers',
    explanation: `Cyclicity is the repeating pattern in powers modulo a number. It is useful for unit digits and last-two-digit questions involving very large exponents.`,
    examples: [{ difficulty: 'Hard', question: 'Find the unit digit of 3¹⁰⁰.', answer: 'The cycle is 3, 9, 7, 1. 100 mod 4 = 0, so the answer is 1.' }],
    shortcuts: ['Find the cycle from the first few powers, then divide the exponent by its length.', 'For last two digits, calculate modulo 100 and identify the cycle.', 'Combine cycles only after reducing each base to the required modulus.'],
    tricks: ['Exponent 0 gives 1 for every non-zero base.', 'If the base is coprime to 10, its unit-digit cycle length divides 4.', 'Use the last digit of the base; earlier digits cannot affect the unit digit.'],
    commonMistakes: ['Using the wrong cycle length.', 'Treating exponent remainder 0 as the first item.', 'Applying a unit-digit cycle when the question asks for the last two digits.'],
    shortcutGuides: [{ title: 'Cycle-position rule', whenToUse: 'Use for any large power and a repeating last-digit pattern.', example: '3¹⁰⁰ has position 100 mod 4 = 4, so unit digit 1.', placementQuestion: 'Find the unit digit of 3⁵⁷: 57 mod 4 = 1, answer 3.' }],
  },
  {
    id: 'perfect-squares',
    title: 'Perfect Squares',
    explanation: `A perfect square is the product of an integer by itself. Last-digit tests and prime exponents help eliminate options before calculating a square root.`,
    examples: [{ difficulty: 'Easy', question: 'Can 4587 be a perfect square?', answer: 'No. A square cannot end in 2, 3, 7 or 8.' }, { difficulty: 'Medium', question: 'Which endings can a square have?', answer: '0, 1, 4, 5, 6 or 9.' }],
    shortcuts: ['A perfect square cannot end in 2, 3, 7 or 8.', 'If a square ends in 1, its root ends in 1 or 9; if it ends in 4, the root ends in 2 or 8.', 'In prime factorisation, every exponent of a perfect square is even.'],
    tricks: ['Use the nearest square to estimate a root.', 'A square ending in 5 always ends in 25.', 'Between n² and (n+1)² there is no other perfect square.'],
    commonMistakes: ['Calling 0 a non-square; 0 is a perfect square.', 'Forgetting that 1 is a perfect square.', 'Checking only the last digit and assuming that is sufficient proof.'],
    shortcutGuides: [{ title: 'Impossible endings', whenToUse: 'Use for a quick no-answer in MCQs.', example: '4587 ends in 7, so it cannot be a square.', placementQuestion: 'Which cannot be a square: 2025, 4096, 6724, 3187? Answer: 3187.' }, { title: 'Even prime exponents', whenToUse: 'Use after prime factorisation.', example: '144 = 2⁴ × 3², so it is a square.', placementQuestion: 'Is 72 = 2³ × 3² a perfect square? No, exponent 3 is odd.' }],
  },
  {
    id: 'advanced-divisibility',
    title: 'Advanced Divisibility: 7, 13, 17 and 19',
    explanation: `Less-obvious divisibility rules are useful when a placement question gives a large number and no calculator. Apply the rule repeatedly until the remaining number is small.`,
    examples: [{ difficulty: 'Medium', question: 'Is 203 divisible by 7?', answer: 'Double the last digit: 3 × 2 = 6. Subtract from 20: 20 − 6 = 14. Since 14 is divisible by 7, 203 is divisible by 7.' }, { difficulty: 'Hard', question: 'Is 221 divisible by 13?', answer: 'Remove 1 and add 4 × 1 to 22: 22 + 4 = 26. Since 26 is divisible by 13, 221 is divisible by 13.' }],
    shortcuts: ['For 7: remove the last digit and subtract twice it from the remaining number.', 'For 13: remove the last digit and add four times it to the remaining number.', 'For 17: remove the last digit and subtract five times it; for 19, add twice the last digit.'],
    tricks: ['Repeat the operation until the result is a familiar multiple.', 'A negative result is fine; test its absolute value.', 'Combine an easy rule first, such as checking evenness before a harder rule.'],
    commonMistakes: ['Changing the multiplier in the middle of repeated steps.', 'Assuming a small result must be divisible without checking it.', 'Using a rule for 13 as if it were the rule for 7.'],
    shortcutGuides: [{ title: 'Rule for 7', whenToUse: 'Use for large numbers when direct division is slow.', example: '203 → 20 − 2×3 = 14.', placementQuestion: 'Is 203 divisible by 7? Yes.' }, { title: 'Rule for 13', whenToUse: 'Use when the number has many digits.', example: '221 → 22 + 4×1 = 26.', placementQuestion: 'Is 221 divisible by 13? Yes.' }],
  },
  {
    id: 'last-digits',
    title: 'Last Two and Three Digits',
    explanation: `Questions about the last two or three digits are modular arithmetic questions modulo 100 or 1000. Reduce the calculation before multiplying.`,
    examples: [{ difficulty: 'Medium', question: 'Find the last two digits of 37².', answer: '37² = 1369, so the last two digits are 69.' }, { difficulty: 'Hard', question: 'Find the last three digits of 12³.', answer: '12³ = 1728, so the last three digits are 728.' }],
    shortcuts: ['Last two digits means work modulo 100; last three means modulo 1000.', 'Keep leading zeroes: 1005 has last three digits 005.', 'For a product, reduce each factor modulo 100 or 1000 first.'],
    tricks: ['Use algebraic identities around 100: 98² = (100−2)² = 9604.', 'If a factor contains 100, its product contributes zero to the last two digits.', 'Find cycles for powers instead of expanding them.'],
    commonMistakes: ['Reporting 5 instead of 005 for the last three digits.', 'Using modulo 10 when two digits are requested.', 'Dropping a carry while multiplying reduced values.'],
    shortcutGuides: [{ title: 'Work modulo 100', whenToUse: 'Use when only the last two digits are required.', example: '98² = 10000 − 400 + 4 = 9604, so answer 04.', placementQuestion: 'Find the last two digits of 98²: 04.' }],
  },
  {
    id: 'factorial',
    title: 'Factorial and Trailing Zeroes',
    explanation: `Factorial n! is the product 1 × 2 × ... × n. Trailing zeroes come from factors of 10, and each 10 is formed by a pair of 2 and 5.`,
    examples: [{ difficulty: 'Medium', question: 'How many trailing zeroes are in 25!?', answer: '⌊25/5⌋ + ⌊25/25⌋ = 5 + 1 = 6.' }, { difficulty: 'Hard', question: 'What is the highest power of 3 dividing 20!?', answer: '⌊20/3⌋ + ⌊20/9⌋ = 6 + 2 = 8.' }],
    shortcuts: ['Trailing zeroes in n! = floor(n/5) + floor(n/25) + floor(n/125) + ...', 'For highest power of prime p in n!, repeatedly divide n by p and add quotients.', 'For n! divisibility, count the available prime exponents.'],
    tricks: ['Count 5s, not 2s, because 2s are more plentiful in a factorial.', 'Stop the trailing-zero series when the quotient becomes 0.', 'For 100!, add 20 + 4 = 24; do not count only multiples of 5 once.'],
    commonMistakes: ['Using n/10 directly for factorial zeroes.', 'Forgetting multiples of 25 contribute two factors of 5.', 'Using ordinary rounding instead of floor division.'],
    shortcutGuides: [{ title: 'Trailing zero formula', whenToUse: 'Use for n! ending-zero questions.', example: '100!: 100/5 + 100/25 = 20 + 4 = 24.', placementQuestion: 'How many zeroes does 100! have? 24.' }],
  },
  {
    id: 'digit-problems',
    title: 'Digit-Based Problems',
    explanation: `Digit problems use place value. A two-digit number with digits a and b is 10a+b; its reverse is 10b+a.`,
    examples: [{ difficulty: 'Easy', question: 'A two-digit number has digit sum 9 and tens digit 3. Find it.', answer: 'Units digit = 9 − 3 = 6, so the number is 36.' }, { difficulty: 'Medium', question: 'What is the difference between 10a+b and 10b+a?', answer: '9a − 9b = 9(a−b), so the difference is always divisible by 9.' }],
    shortcuts: ['Represent a two-digit number as 10a+b and a three-digit number as 100a+10b+c.', 'Reversing a two-digit number changes it by 9 times the digit difference.', 'Digit sum tests divisibility by 3 and 9 before full calculation.'],
    tricks: ['Keep leading-digit restrictions: a cannot be zero in a two-digit number.', 'Use the digit sum to find a missing digit quickly.', 'For number formation, count choices separately for the first digit and remaining digits.'],
    commonMistakes: ['Writing ab as a+b instead of 10a+b.', 'Allowing zero as the first digit.', 'Counting repeated-digit arrangements as distinct when repetition is forbidden.'],
    shortcutGuides: [{ title: 'Place-value representation', whenToUse: 'Use for reversed digits and digit-sum equations.', example: 'Number = 10a+b; reverse = 10b+a.', placementQuestion: 'If a number is 27, its reverse is 72 and difference is 45 = 9(2−7).' }],
  },
  {
    id: 'base-systems',
    title: 'Base Systems',
    explanation: `A number in base b uses powers of b as place values. Decimal conversion expands each digit by its positional power.`,
    examples: [{ difficulty: 'Easy', question: 'Convert (1011)₂ to decimal.', answer: '1×8 + 0×4 + 1×2 + 1×1 = 11.' }, { difficulty: 'Medium', question: 'Convert decimal 14 to binary.', answer: '14 = 8 + 4 + 2, so (1110)₂.' }],
    shortcuts: ['Binary place values from right are 1, 2, 4, 8, 16...', 'For decimal-to-base conversion, repeatedly divide by the base and read remainders upward.', 'A base-b digit must be less than b.'],
    tricks: ['Group binary digits in threes for octal and fours for hexadecimal.', 'Check the converted value by expanding it back using place values.', 'Use base restrictions to eliminate invalid options immediately.'],
    commonMistakes: ['Using a digit equal to or greater than the base.', 'Reading division remainders in the wrong order.', 'Treating (10)₂ as ten; it equals decimal 2.'],
    shortcutGuides: [{ title: 'Binary expansion', whenToUse: 'Use for binary-to-decimal conversion.', example: '(1011)₂ = 8 + 2 + 1 = 11.', placementQuestion: 'Convert (1101)₂: 8 + 4 + 1 = 13.' }],
  },
  {
    id: 'number-formation',
    title: 'Number Formation and Arrangements',
    explanation: `Number-formation questions count or construct numbers from given digits under conditions such as divisibility, repetition and first-digit restrictions.`,
    examples: [{ difficulty: 'Medium', question: 'How many two-digit numbers can be formed from 1,2,3 without repetition?', answer: '3 choices for tens and 2 for units: 3×2 = 6.' }, { difficulty: 'Hard', question: 'How many three-digit even numbers can be formed from 1,2,3,4 without repetition?', answer: 'Units has 2 choices (2 or 4), hundreds has 3, tens has 2: 2×3×2 = 12.' }],
    shortcuts: ['Fill the restricted position first, such as the last digit for evenness.', 'For no repetition, decrease the available choices after each placement.', 'For repetition allowed, choices remain constant except for a restricted first digit.'],
    tricks: ['Use divisibility rules to restrict the last one, two or three positions.', 'Separate cases when zero is included because it cannot lead a number.', 'Multiply independent choices; add counts for separate cases.'],
    commonMistakes: ['Allowing zero in the first position.', 'Using permutations when repetition is allowed.', 'Forgetting that divisibility by 5 requires a final 0 or 5.'],
    shortcutGuides: [{ title: 'Restricted position first', whenToUse: 'Use for even, odd, 5-divisible or 3-divisible formation.', example: 'For a 3-digit even number, choose the units digit first from even digits.', placementQuestion: 'Using 1,2,3,4 without repetition, 12 three-digit even numbers are possible.' }],
  },
  {
    id: 'fast-calculation',
    title: 'Fast Calculation and Identities',
    explanation: `Mental calculation reduces time in placement tests. Use identities and numbers near 10, 100 or 1000 instead of long multiplication.`,
    examples: [{ difficulty: 'Easy', question: 'Calculate 48×52 quickly.', answer: '(50−2)(50+2) = 50²−2² = 2496.' }, { difficulty: 'Medium', question: 'Calculate 125×48.', answer: '125×8 = 1000, then ×6 = 6000.' }],
    shortcuts: ['Use (a+b)(a−b)=a²−b² for numbers equally spaced around a base.', 'Multiply by 25 as ×100÷4, by 50 as ×100÷2 and by 125 as ×1000÷8.', 'Square numbers ending in 5 as n5² = n(n+1)25.'],
    tricks: ['For 98×97, use (100−2)(100−3) = 10000−500+6 = 9506.', 'Cancel factors before multiplying fractions or products.', 'Estimate first to catch place-value errors.'],
    commonMistakes: ['Applying an identity when the numbers are not symmetric around the same base.', 'Forgetting to divide after multiplying by 25 or 125.', 'Dropping zeros in powers of 10.'],
    shortcutGuides: [{ title: 'Difference of squares', whenToUse: 'Use when two factors are equally above and below a number.', example: '48×52 = 50²−2² = 2496.', placementQuestion: 'Calculate 103×97 = 100²−3² = 9991.' }, { title: 'Multiply by 125', whenToUse: 'Use for fast multiplication by 125.', example: '48×125 = 48×1000÷8 = 6000.', placementQuestion: 'Find 72×125 = 9000.' }],
  },
);

numberSystemContent.assessmentQuestions = numberSystemContent.subTopics
  .flatMap(subTopic => (subTopic.shortcutGuides || []).map((guide, index) => ({
    id: `number-system-${subTopic.id}-${index}`,
    question: guide.placementQuestion,
    options: [guide.example, guide.placementQuestion, 'This rule cannot be used in aptitude questions.', 'There is not enough information.'],
    correctAnswer: guide.placementQuestion,
    explanation: `${guide.title}: ${guide.whenToUse} ${guide.example}`,
    topic: 'number-system',
    subTopic: subTopic.id,
    difficulty: 'Medium',
  })));
