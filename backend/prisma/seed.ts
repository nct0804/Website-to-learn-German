import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

async function main() {
// Testing creation of a lesson
      const courseA11 = await prisma.course.create({
    data: {
      title: "German A1.1",
      description: "Beginner German course - first level",
      level: "A1_1",
      order: 1,
    }
  });
  const courseA12 = await prisma.course.create({
    data: {
      title: "German A1.2",
      description: "Beginner German course - second level",
      level: "A1_2",
      order: 2,
    }
  });

  const moduleGreetings = await prisma.module.create({
    data: {
      courseId: courseA11.id,
      title: "Greetings and Introductions",
      description: "Learn how to greet people and introduce yourself",
      order: 1,
      xpReward: 20,
      estimatedTime: 30,
    }
  });

  const moduleNumbers = await prisma.module.create({
    data: {
      courseId: courseA11.id,
      title: "Numbers and Counting",
      description: "Learn numbers from 0 to 100 and how to use them",
      order: 2,
      xpReward: 25,
      estimatedTime: 45,
    }
  });

  const moduleDailyActivities = await prisma.module.create({
    data: {
      courseId: courseA12.id,
      title: "Daily Activities",
      description: "Talk about your daily routine",
      order: 1,
      xpReward: 30,
      estimatedTime: 60,
      isLocked: true, // Will be unlocked when prerequisite is completed
    }
  });

  await prisma.modulePrerequisite.create({
    data: {
      moduleId: moduleDailyActivities.id,
      prerequisiteId: moduleGreetings.id
    }
  });
  
   // Create lessons for Greetings module
  const lessonBasicGreetings = await prisma.lesson.create({
    data: {
      moduleId: moduleGreetings.id,
      title: "Basic Greetings",
      description: "Learn how to say hello and goodbye",
      order: 1,
      xpReward: 10,
      estimatedTime: 15,
    }
  });

  const lessonIntroductions = await prisma.lesson.create({
    data: {
      moduleId: moduleGreetings.id,
      title: "Introducing Yourself",
      description: "Learn how to introduce yourself and ask someone's name",
      order: 2,
      xpReward: 15,
      estimatedTime: 20,
    }
  });

    // Create vocabulary items
  const vocabHello = await prisma.vocabularyItem.create({
    data: {
      german: "Hallo",
      english: "Hello",
      pronunciation: "ha-loh",
      partOfSpeech: "interjection",
      level: "A1_1",
      frequency: 5,
      audioSrc: "/audio/hallo.mp3",
      exampleSentence: "Hallo, wie geht's?"
    }
  });

  const vocabGoodbye = await prisma.vocabularyItem.create({
    data: {
      german: "Tschüss",
      english: "Goodbye",
      pronunciation: "chooss",
      partOfSpeech: "interjection",
      level: "A1_1",
      frequency: 4,
      audioSrc: "/audio/tschuess.mp3",
      exampleSentence: "Tschüss, bis morgen!"
    }
  });

  const vocabName = await prisma.vocabularyItem.create({
    data: {
      german: "Name",
      english: "Name",
      pronunciation: "nah-meh",
      partOfSpeech: "noun",
      gender: "masculine",
      plural: "Namen",
      level: "A1_1",
      frequency: 3,
      exampleSentence: "Mein Name ist Anna."
    }
  });
  
  // Create exercises for Basic Greetings lesson
  const exerciseGreetingsMC = await prisma.exercise.create({
    data: {
      lessonId: lessonBasicGreetings.id,
      type: "MULTIPLE_CHOICE",
      difficulty: "BEGINNER",
      question: "What does 'Hallo' mean in English?",
      instruction: "Select the correct translation",
      order: 1,
      xpReward: 2,
      exerciseOptions: {
        create: [
          { text: "Hello", isCorrect: true, order: 1 },
          { text: "Goodbye", isCorrect: false, order: 2 },
          { text: "Please", isCorrect: false, order: 3 },
          { text: "Thank you", isCorrect: false, order: 4 }
        ]
      },
      vocabularyItems: {
        create: [
          { vocabularyId: vocabHello.id }
        ]
      }
    }
  });

  const exerciseGreetingsFill = await prisma.exercise.create({
    data: {
      lessonId: lessonBasicGreetings.id,
      type: "FILL_IN_BLANK",
      difficulty: "BEGINNER",
      question: "Complete the greeting: '_____, wie geht's?'",
      instruction: "Fill in the blank with the correct greeting",
      order: 2,
      xpReward: 3,
      exerciseOptions: {
        create: [
          { text: "Hallo", isCorrect: true, explanation: "This is the most common greeting" }
        ]
      },
      vocabularyItems: {
        create: [
          { vocabularyId: vocabHello.id }
        ]
      }
    }
  });

   // Create exercises for Introductions lesson
  const exerciseIntroductionsVocab = await prisma.exercise.create({
    data: {
      lessonId: lessonIntroductions.id,
      type: "VOCABULARY_CHECK",
      difficulty: "BEGINNER",
      question: "Match the German words with their English translations",
      instruction: "Drag and drop to match the pairs",
      order: 1,
      xpReward: 3,
      vocabularyItems: {
        create: [
          { vocabularyId: vocabHello.id },
          { vocabularyId: vocabGoodbye.id },
          { vocabularyId: vocabName.id }
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