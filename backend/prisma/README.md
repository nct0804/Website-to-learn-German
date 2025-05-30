# README FOR STRUCTURES AND DATABASE

Ý tưởng xây dựng Database ()

Core Data Structure:
A1.1 → A1.2 → A2.1 → A2.2
Course(A1.1,...) > Module() -> Lesson -> Exercise

Example (Vi Du)
```
Course (A1.1) 
└── Module ("Family, Food, Animals, Shopping") 
    └── Lesson ("Animals - Tiere") - Tương đương với với level của Course
        └── Exercise (Multiple Choice: "Wie heisst deine Katze?")
            ├── Options: "Mein Katze heisst..."
            └── Vocabulary: "die Katze" (die, "die Katzen"),...
```

#### Exercise
-   Multiple choices
-   Fill in Blank (điền vào chỗ trống)
-   Sentences Arrangments (Sắp xếp câu)
-   Vocabulary check (Kiểm trả nghĩa của từ mới)

**Nice to Have:**
-   Vocabulary exercises with pictures
-   Text to speech, speech to text

Organize Template Data in JSON (Duolingo templates)


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

```
Create new migrate(s) : npx prisma migrate dev --name init
npx prisma generate : (Apply for Clients after updateing schema.prisma)
Drop the database, reapply all migrate: npx prisma migrate reset (Only if there aren't important data)
(manually in pgadmin safer): 
```

```
Manually editing database using pgAdmin (After running Docker)
1.  Open pgAdmin
2.  Clicks on "Add New Server"
3.  Name: random
4.  Host: localhost
    port:5432
    Maintaince Database : germangainsdb
    Username: germangains
    Passwort germangains
```

## Insert, Delete, Update,.. data for models
Run the command to manipulate the database
```
npx prisma db seed
```
When the models start growing larger
-> Organize the script into sections or break it into multiple files OR EVEN BETTER JSON FILES!!

```

