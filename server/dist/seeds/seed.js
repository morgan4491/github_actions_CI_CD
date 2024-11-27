import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rawData = await fs.readFile(join(__dirname, './pythonQuestions.json'), 'utf8');
db.once('open', async () => {
    await cleanDB();
    await Question.insertMany(JSON.parse(rawData));
    console.log('Questions seeded!');
    process.exit(0);
});
