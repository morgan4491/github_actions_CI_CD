import { Question } from '../models/index.js';
export default async () => {
    try {
        await Question.deleteMany({});
    }
    catch (err) {
        throw err;
    }
};
