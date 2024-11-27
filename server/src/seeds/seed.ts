import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import fs from 'fs';
import path from 'path';

const pythonQuestionsPath = path.resolve(__dirname, './pythonQuestions.json');
const pythonQuestions = JSON.parse(fs.readFileSync(pythonQuestionsPath, 'utf-8'));

db.once('open', async () => {
  await cleanDB();

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});