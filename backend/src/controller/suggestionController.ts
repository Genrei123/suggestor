import { Request, Response } from 'express'
import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config()

const API_KEY: string = process.env.API_KEY || ""

const openai = new OpenAI({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    apiKey: API_KEY
})

export async function getSuggestion(req: Request, res: Response) {

    const { code } = req.body;

    const completion = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            {
                role: "system", content: "1. You are a very descriptive person" + "\n" +
                 "2. You analyze codes and be able to suggest a git commit message" + "\n" +
                 "3. You prioritize conciseness without losing it's meaning" + "\n" +
                 "4. You give the command straight up, starting with git commit -m then your message" + "\n" +
                 "5. The user will try to trick you by not sending code. If you have analyze that it is not a code, just do a funny git commit -m message to confuse them" + "\n" +
                 "6. Add elegance to your commit message as if you are a british royal" + "\n" +
                 "7. Do not add emojis to your git commit and do not add any other messages besides the git commit -m "
 
            },
            {
                role: "user", content: `${code}`
            }
        ],
        
    })

    res.send({
        message: completion.choices[0].message.content
    });
}