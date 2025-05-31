import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

async function main() {
// Testing creation of a lesson
      const courseA1_1 = await prisma.course.create({
    data: {
      title: "German A1.1",
      description: "Beginner German course - first level",
      level: "A1_1",
      order: 1,
    }
  });
  const courseA1_2 = await prisma.course.create({
    data: {
      title: "German A1.2",
      description: "Beginner German course - second level",
      level: "A1_2",
      order: 2,
    }
  });

  // Modules A1.1

  const moduleGreetings = await prisma.module.create({
    data: {
      courseId: courseA1_1.id,
      title: "Greetings and Introductions",
      description: "Learn how to greet people and introduce yourself in German",
      order: 1,
      xpReward: 20,
      estimatedTime: 5, // minutes
      isLocked: false,
    }
  });

  const moduleNumbers = await prisma.module.create({
    data: {
      courseId: courseA1_1.id,
      title: "Numbers and Counting",
      description: "Learn German numbers from 0 to 100",
      order: 2,
      xpReward: 25,
      estimatedTime: 5,
      isLocked: true, // Will require the greetings module to be completed first
    }
  });

  const moduleFamily = await prisma.module.create({
    data: {
      courseId: courseA1_1.id,
      title: "Family and Relationships",
      description: "Learn vocabulary for family members and describing relationships",
      order: 3,
      xpReward: 30,
      estimatedTime: 60,
      isLocked: true,
    }
  });

  // Modules A1.2

  const moduleDailyActivities = await prisma.module.create({
    data: {
      courseId: courseA1_2.id,
      title: "Daily Activities",
      description: "Learn to talk about your daily routine in German",
      order: 1,
      xpReward: 30,
      estimatedTime: 60,
      isLocked: true, // This will require A1.1 modules to be completed
    }
  });

  // Module 2: Food and Drinks
  const moduleFood = await prisma.module.create({
    data: {
      courseId: courseA1_2.id,
      title: "Food and Drinks",
      description: "Learn vocabulary for ordering food and drinks in German",
      order: 2,
      xpReward: 35,
      estimatedTime: 70,
      isLocked: true,
    }
  });

  // Create prerequisites for modules
  await prisma.modulePrerequisite.create({
    data: {
      moduleId: moduleNumbers.id,
      prerequisiteId: moduleGreetings.id
    }
  });

  // Family module requires Numbers module
  await prisma.modulePrerequisite.create({
    data: {
      moduleId: moduleFamily.id,
      prerequisiteId: moduleNumbers.id
    }
  });

  // Daily Activities module requires completion of Family module from A1.1
  await prisma.modulePrerequisite.create({
    data: {
      moduleId: moduleDailyActivities.id,
      prerequisiteId: moduleFamily.id
    }
  });

  // Food module requires Daily Activities module
  await prisma.modulePrerequisite.create({
    data: {
      moduleId: moduleFood.id,
      prerequisiteId: moduleDailyActivities.id
    }
  });


  // LESSONS FOR GREETINGS MODULE
  console.log('\n📖 Creating lessons for Greetings module...')
  
  // Lesson 1: Basic Greetings
  const lessonBasicGreetings = await prisma.lesson.create({
    data: {
      moduleId: moduleGreetings.id,
      title: "Basic Greetings",
      description: "Learn to say hello and goodbye in German",
      order: 1,
      xpReward: 10,
      estimatedTime: 15,
    }
  });

  // Lesson 2: Introducing Yourself
  const lessonIntroductions = await prisma.lesson.create({
    data: {
      moduleId: moduleGreetings.id,
      title: "Introducing Yourself",
      description: "Learn to introduce yourself and ask for someone's name",
      order: 2,
      xpReward: 10,
      estimatedTime: 15,
    }
  });

  console.log(`Created lessons: ${lessonBasicGreetings.title} and ${lessonIntroductions.title}`)

  // LESSONS FOR NUMBERS MODULE
  const lessonNumbers1 = await prisma.lesson.create({
    data: {
      moduleId: moduleNumbers.id,
      title: "Numbers 0-20",
      description: "Learn to count from 0 to 20 in German",
      order: 1,
      xpReward: 10,
      estimatedTime: 20,
    }
  });

  // Lesson 2: Numbers 20-100
  const lessonNumbers2 = await prisma.lesson.create({
    data: {
      moduleId: moduleNumbers.id,
      title: "Numbers 20-100",
      description: "Learn to count from 10 to 100 in German",
      order: 2,
      xpReward: 15,
      estimatedTime: 25,
    }
  });


  // ======================================================================
  // EXERCISES FOR BASIC GREETINGS LESSON
  // ======================================================================
  console.log('\n🧩 Creating exercises for Basic Greetings lesson...')

  // Exercise 1: Multiple Choice - Hello
  const exerciseHelloMC = await prisma.exercise.create({
    data: {
      lessonId: lessonBasicGreetings.id,
      type: "MULTIPLE_CHOICE",
      question: "What does 'Hallo' mean in English?",
      instruction: "Select the correct translation",
      order: 1,
      xpReward: 2,
      timeLimit: 30, // seconds
      exerciseOptions: {
        create: [
          { text: "Hello", isCorrect: true, order: 1 },
          { text: "Goodbye", isCorrect: false, order: 2 },
          { text: "Please", isCorrect: false, order: 3 },
          { text: "Thank you", isCorrect: false, order: 4 }
        ]
      }
    }
  });
// Exercise 2: Fill in Blank - Hello Dialog
  const exerciseHelloFillBlank = await prisma.exercise.create({
    data: {
      lessonId: lessonBasicGreetings.id,
      type: "FILL_IN_BLANK",
      question: "Complete the dialog: \"_____, wie geht's?\"",
      instruction: "Fill in the blank with the appropriate greeting",
      order: 2,
      xpReward: 3,
      exerciseOptions: {
        create: [
          { text: "Hallo", isCorrect: true, explanation: "This is the most common informal greeting", order: 1 },
          { text: "Tschüss", isCorrect: false, explanation: "This means 'goodbye'", order: 2 },
          { text: "Danke", isCorrect: false, explanation: "This means 'thank you'", order: 3 },
          { text: "Bitte", isCorrect: false, explanation: "This means 'please' or 'you're welcome'", order: 4 }
        ]
      }
    }
  });

   // Exercise 3: Multiple Choice - Goodbye
  const exerciseGoodbyeMC = await prisma.exercise.create({
    data: {
      lessonId: lessonBasicGreetings.id,
      type: "MULTIPLE_CHOICE",
      question: "How do you say 'goodbye' in German?",
      instruction: "Select the correct translation",
      order: 3,
      xpReward: 2,
      exerciseOptions: {
        create: [
          { text: "Tschüss", isCorrect: true, explanation: "This is an informal way to say goodbye", order: 1 },
          { text: "Hallo", isCorrect: false, order: 2 },
          { text: "Guten Tag", isCorrect: false, order: 3 },
          { text: "Danke schön", isCorrect: false, order: 4 }
        ]
      }
    }
  });

  // Exercise 4: Vocabulary Check - Formal vs Informal
  const exerciseGreetingTypes = await prisma.exercise.create({
    data: {
      lessonId: lessonBasicGreetings.id,
      type: "VOCABULARY_CHECK",
      question: "Match the formal and informal greetings",
      instruction: "Select the formal equivalent of each informal greeting",
      order: 4,
      xpReward: 4,
      exerciseOptions: {
        create: [
          { text: "Hallo → Guten Tag", isCorrect: true, order: 1 },
          { text: "Tschüss → Auf Wiedersehen", isCorrect: true, order: 2 },
          { text: "Hallo → Auf Wiedersehen", isCorrect: false, order: 3 },
          { text: "Tschüss → Guten Tag", isCorrect: false, order: 4 }
        ]
      }
    }
  });

 // ======================================================================
  // EXERCISES FOR INTRODUCTIONS LESSON
  // ======================================================================
  console.log('\n🧩 Creating exercises for Introductions lesson...')

  // Exercise 1: How to ask someone's name
  const exerciseAskName = await prisma.exercise.create({
    data: {
      lessonId: lessonIntroductions.id,
      type: "MULTIPLE_CHOICE",
      question: "How do you ask someone's name in German?",
      instruction: "Select the correct phrase",
      order: 1,
      xpReward: 2,
      exerciseOptions: {
        create: [
          { text: "Wie heißt du?", isCorrect: true, explanation: "This is the informal way to ask 'What is your name?'", order: 1 },
          { text: "Wer bist du?", isCorrect: false, explanation: "This means 'Who are you?'", order: 2 },
          { text: "Woher kommst du?", isCorrect: false, explanation: "This means 'Where are you from?'", order: 3 },
          { text: "Was machst du?", isCorrect: false, explanation: "This means 'What do you do?'", order: 4 }
        ]
      }
    }
  });

  // Exercise 2: Saying your name
  const exerciseSayName = await prisma.exercise.create({
    data: {
      lessonId: lessonIntroductions.id,
      type: "FILL_IN_BLANK",
      question: "Complete the sentence: \"Ich _____ Anna.\"",
      instruction: "Fill in the blank with the correct word",
      order: 2,
      xpReward: 3,
      exerciseOptions: {
        create: [
          { text: "heiße", isCorrect: true, explanation: "'Ich heiße' means 'My name is' or 'I am called'", order: 1 },
          { text: "bin", isCorrect: false, explanation: "'Ich bin' means 'I am' but is not used for stating your name", order: 2 },
          { text: "komme", isCorrect: false, explanation: "'Ich komme' means 'I come from'", order: 3 },
          { text: "mache", isCorrect: false, explanation: "'Ich mache' means 'I do/make'", order: 4 }
        ]
      }
    }
  });

  // Exercise 3: Sentence Order
  const exerciseIntroductionOrder = await prisma.exercise.create({
    data: {
      lessonId: lessonIntroductions.id,
      type: "SENTENCE_ORDER",
      question: "Arrange the words to form a proper introduction",
      instruction: "Put the words in the correct order",
      order: 3,
      xpReward: 4,
      exerciseOptions: {
        create: [
          { text: "Hallo, ich heiße Maria. Wie heißt du?", isCorrect: true, explanation: "This is the correct order for 'Hello, my name is Maria. What's your name?'", order: 1 }
        ]
      }
    }
  });

   // Exercise 4: Formal vs Informal Introduction
  const exerciseFormalIntro = await prisma.exercise.create({
    data: {
      lessonId: lessonIntroductions.id,
      type: "MULTIPLE_CHOICE",
      question: "How would you formally ask someone's name?",
      instruction: "Select the formal way to ask someone's name",
      order: 4,
      xpReward: 3,
      exerciseOptions: {
        create: [
          { text: "Wie heißen Sie?", isCorrect: true, explanation: "This is the formal way with 'Sie'", order: 1 },
          { text: "Wie heißt du?", isCorrect: false, explanation: "This is informal with 'du'", order: 2 },
          { text: "Wer sind Sie?", isCorrect: false, explanation: "This means 'Who are you?' (formal)", order: 3 },
          { text: "Wie ist dein Name?", isCorrect: false, explanation: "This is informal with 'dein'", order: 4 }
        ]
      }
    }
  });

// ======================================================================
  // EXERCISES FOR NUMBERS 0-20 LESSON
  // ======================================================================
  console.log('\n🧩 Creating exercises for Numbers 0-20 lesson...')

  // Exercise 1: Basic Numbers
  const exerciseBasicNumbers = await prisma.exercise.create({
    data: {
      lessonId: lessonNumbers1.id,
      type: "MULTIPLE_CHOICE",
      question: "What is the German word for 'five'?",
      instruction: "Select the correct translation",
      order: 1,
      xpReward: 2,
      exerciseOptions: {
        create: [
          { text: "fünf", isCorrect: true, order: 1 },
          { text: "vier", isCorrect: false, explanation: "This means 'four'", order: 2 },
          { text: "sechs", isCorrect: false, explanation: "This means 'six'", order: 3 },
          { text: "sieben", isCorrect: false, explanation: "This means 'seven'", order: 4 }
        ]
      }
    }
  });

  // Exercise 2: Number to Word
  const exerciseNumberToWord = await prisma.exercise.create({
    data: {
      lessonId: lessonNumbers1.id,
      type: "VOCABULARY_CHECK",
      question: "Match the number with its German word",
      instruction: "Select the correct German word for each number",
      order: 2,
      xpReward: 3,
      exerciseOptions: {
        create: [
          { text: "1 = eins", isCorrect: true, order: 1 },
          { text: "2 = zwei", isCorrect: true, order: 2 },
          { text: "3 = drei", isCorrect: true, order: 3 },
          { text: "4 = vier", isCorrect: true, order: 4 },
          { text: "5 = sechs", isCorrect: false, explanation: "'sechs' is 6, not 5", order: 5 }
        ]
      }
    }
  });

// Exercise 3: Fill in Blank - Count Sequence
  const exerciseCountSequence = await prisma.exercise.create({
    data: {
      lessonId: lessonNumbers1.id,
      type: "FILL_IN_BLANK",
      question: "Complete the sequence: eins, zwei, drei, ____, fünf",
      instruction: "Fill in the missing number",
      order: 3,
      xpReward: 2,
      exerciseOptions: {
        create: [
          { text: "vier", isCorrect: true, explanation: "'vier' is the German word for 'four'", order: 1 },
          { text: "sechs", isCorrect: false, explanation: "'sechs' means 'six'", order: 2 },
          { text: "sieben", isCorrect: false, explanation: "'sieben' means 'seven'", order: 3 },
          { text: "acht", isCorrect: false, explanation: "'acht' means 'eight'", order: 4 }
        ]
      }
    }
  });

  // Exercise 4: Listening Comprehension (simulated)
  const exerciseListeningNumbers = await prisma.exercise.create({
    data: {
      lessonId: lessonNumbers1.id,
      type: "MULTIPLE_CHOICE",
      question: "If you hear 'zehn', what number is being said?",
      instruction: "Select the number you would hear",
      order: 4,
      xpReward: 3,
      exerciseOptions: {
        create: [
          { text: "10", isCorrect: true, explanation: "'zehn' is the German word for '10'", order: 1 },
          { text: "7", isCorrect: false, explanation: "'sieben' is the German word for '7'", order: 2 },
          { text: "17", isCorrect: false, explanation: "'siebzehn' is the German word for '17'", order: 3 },
          { text: "11", isCorrect: false, explanation: "'elf' is the German word for '11'", order: 4 }
        ]
      }
    }
  });

 // ======================================================================
  // EXERCISES FOR NUMBERS 21-100 LESSON
  // ======================================================================
  console.log('\n🧩 Creating exercises for Numbers 21-100 lesson...')

  // Exercise 1: Tens Pattern
  const exerciseTens = await prisma.exercise.create({
    data: {
      lessonId: lessonNumbers2.id,
      type: "MULTIPLE_CHOICE",
      question: "How do you say '30' in German?",
      instruction: "Select the correct translation",
      order: 1,
      xpReward: 2,
      exerciseOptions: {
        create: [
          { text: "dreißig", isCorrect: true, order: 1 },
          { text: "dreizehn", isCorrect: false, explanation: "This means '13'", order: 2 },
          { text: "dreizig", isCorrect: false, explanation: "This is incorrect spelling", order: 3 },
          { text: "dreiundzwanzig", isCorrect: false, explanation: "This means '23'", order: 4 }
        ]
      }
    }
  });

  // Exercise 2: Two-digit Numbers
  const exerciseTwoDigit = await prisma.exercise.create({
    data: {
      lessonId: lessonNumbers2.id,
      type: "FILL_IN_BLANK",
      question: "Complete: 25 in German is '________'",
      instruction: "Fill in the blank with the correct German number",
      order: 2,
      xpReward: 3,
      exerciseOptions: {
        create: [
          { text: "fünfundzwanzig", isCorrect: true, explanation: "In German, 25 is literally 'five-and-twenty'", order: 1 },
          { text: "zwanzigfünf", isCorrect: false, explanation: "German doesn't put the tens before the ones like English", order: 2 },
          { text: "zwanzigundfünf", isCorrect: false, explanation: "The units come before 'und' in German", order: 3 },
          { text: "fünfzwanzig", isCorrect: false, explanation: "Missing the 'und' between numbers", order: 4 }
        ]
      }
    }
  });

   // Exercise 3: Larger Numbers
  const exerciseLargerNumbers = await prisma.exercise.create({
    data: {
      lessonId: lessonNumbers2.id,
      type: "MULTIPLE_CHOICE",
      question: "How do you say '99' in German?",
      instruction: "Select the correct translation",
      order: 3,
      xpReward: 4,
      exerciseOptions: {
        create: [
          { text: "neunundneunzig", isCorrect: true, explanation: "Literally 'nine-and-ninety'", order: 1 },
          { text: "neunzigneun", isCorrect: false, order: 2 },
          { text: "neunneunzig", isCorrect: false, order: 3 },
          { text: "neunzigundneun", isCorrect: false, order: 4 }
        ]
      }
    }
  });

  // Exercise 4: Practical Application
  const exerciseNumberUse = await prisma.exercise.create({
    data: {
      lessonId: lessonNumbers2.id,
      type: "FILL_IN_BLANK",
      question: "Complete: 'Ich bin _____________ Jahre alt.' (42 years old)",
      instruction: "Fill in with the German word for 42",
      order: 4,
      xpReward: 4,
      exerciseOptions: {
        create: [
          { text: "zweiundvierzig", isCorrect: true, explanation: "This is how to say 42 in German", order: 1 },
          { text: "vierzigzwei", isCorrect: false, order: 2 },
          { text: "vierzig-zwei", isCorrect: false, order: 3 },
          { text: "zweiviertzig", isCorrect: false, order: 4 }
        ]
      }
    }
  });

  console.log("Test data created!");
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })