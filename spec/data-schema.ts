
// users/users.json
interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: UserRole;
    token: string,
    tokenExpiry: number,
}

enum UserRole {
    Student = "student",
    Admin = "admin",
}

// quizzes/quizzes.json
interface Quizz {
    id: number;
    name: string;
    code: string;
    numberOfQuestions: number;
    available: boolean;
}

// quizzes/:code/questions.json
interface Question {
    id: number;
    title: string;
    choices: Choice[];
}

interface Choice {
    title: string;
    correct: boolean;
}

// users/:id/answers.json
interface Answer {
    quizz_id: number;
    question_id: number;
    answer: AnswerType;
}

enum AnswerType {
    None = "none",
    Yes = "yes",
    No = "no",
}

// users/:id/progress.json
interface Progress {
}
