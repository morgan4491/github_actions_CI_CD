import db from '../config/connection.js';
import { Question } from '../models/index.js';
import cleanDB from './cleanDb.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pythonQuestionsPath = path.resolve(__dirname, './pythonQuestions.json');
const questionData = JSON.parse(fs.readFileSync(pythonQuestionsPath, 'utf-8'));
async function seedDatabase() {
    try {
        await db.openUri(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname');
        await cleanDB();
        // bulk create each model
        await Question.insertMany(questionData);
        console.log('Seeding completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
