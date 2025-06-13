import brezel from "../../assets/brezel.png";
import star from "../../assets/star.png";
import tipps from "../../assets/tipps.png";

export default function LessonData() {
    const lessons = [
        {
            id: 1,
            icon: brezel,
            title: "Lesson 1: Greetings",
            progress: 1,
            status: "practice",
            actionLabel: "Practice",
        },
        {
            id: 2,
            icon: star,
            title: "Lesson 2: Greetings",
            progress: 0.3,
            status: "continue",
            actionLabel: "Continue",
        },
        {
            id: 3,
            icon: tipps,
            title: "Lesson 3: Greetings",
            progress: 0,
            status: "locked",
            actionLabel: "Locked",
        },
        {
            id: 4,
            icon: tipps,
            title: "Lesson 4: Greetings",
            progress: 0,
            status: "locked",
            actionLabel: "Locked",
        },
        {
            id: 5,
            icon: tipps,
            title: "Lesson 5: Greetings",
            progress: 0,
            status: "locked",
            actionLabel: "Locked",
        },
        {
            id: 6,
            icon: tipps,
            title: "Lesson 6: Greetings",
            progress: 0,
            status: "locked",
            actionLabel: "Locked",
        },
    ];
      
    return lessons;
}