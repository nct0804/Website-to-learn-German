Ý tưởng xây dựng Database ()

Core Data Structure:
A1.1 → A1.2 → A2.1 → A2.2
Course(A1.1,...) > Module() -> Lesson -> Exercise

Example (Vi Du)
Course (A1.1) 
└── Module ("Family, Food, Animals, Shopping") 
    └── Lesson ("Animals - Tiere") - Tương đương với với level của Course
        └── Exercise (Multiple Choice: "Wie heisst deine Katze?")
            ├── Options: "Mein Katze heisst..."
            └── Vocabulary: "die Katze" (die, "die Katzen"),...

#### Exercise
-   Multiple choices
-   Fill in Blank (điền vào chỗ trống)
-   Sentences Arrangments (Sắp xếp câu)
-   Vocabulary check (Kiểm trả nghĩa của từ mới)

**Nice to Have:**
-   Vocabulary exercises with pictures
-   Text to speech, speech to text

```
@ Todo
Gamification System
-   User's Process : level, points , heart, XP, hearts, streak system,...
-   Level requirement: for example, must reach this level to unlock new stuffs
```

```
@Learning Flow:
1.  Start at level 1/ start at A1.1: basic modules unlocked.
2.  Complete excersices/quiz -> gain XP -> unlock lesson/modules (Gamification)
3.  Earn enough XP -> gain access to higher courses/level (A1.1, A1.2,..)
.....

```
