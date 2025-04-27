# Hugo
Building Hugo - the Procurement AI Agent for Voltway for Dryft AI Hacktech 2025

# About the project
## Inspiration
When we first learned that the Dryft challenge goal was to create an AI assistant named Hugo, we immediately envisioned an interactive, pop-up agent, similar to those found on shopping websites. Since Hugo is a main portion of our Voltway platform, we decided to dedicate a tab on the website to it, allowing users to chat back and forth with the assistant in a conversational style, much like ChatGPT or Microsoft Copilot. 

## What it does
Our procurement AI agent, Hugo, is designed to propel our startup forward 24/7 by micromanaging our inventory. Being picky about what is happening behind the scenes leads to high demands being met while being effective in time and cost. The seamless integration of Hugo lets our startup keep up with the competitive nature of the retail world and unexpected disruptions, where a startup comprised of human employees is subject to its harsh reality.

## How we built it
Training a Gemini AI to read and analyze data and communicate it without being over-convoluted through manual training. Have the AI do multiple tasks within the website, ranging from interacting with the client, analyzing total data, and reading through emails to see what needs to be done by suggestion. We had two people work on the backend by slowly learning what we needed first, eventually expanding into what we could apply (learning and applying fast). Meanwhile, two people worked on the front end by creating a design on Figma and translating it into a full-fledged front-end application.

## Challenges we ran into
We started with Gemini, hoping to get it up and running within the first hour of the event, reading multiple files and a text input. However, we couldn't and spent more than we hoped reading documentation on the API until we finally figured out how to get the API to take in multiple files to analyze. We also had various Windows devices, but most were programmed only on Windows or Mac. This resulted in mixed results because when we ran the frontend and backend of the website on Windows, it worked flawlessly, but on a Mac, the backend closed cleanly for no reason. It was because it was listening on port 5000, and something was already using port 5000 on Mac devices. Getting the frontend and backend to work together via hosting is another issue we fixed.

## Accomplishments that we're proud of
Adapting to various situations quickly, especially when using an API we haven't touched before (e.g., Gemini, SQLite, and Express). Debugging issues that will not occur on one platform, but on the other (Mac vs. Windows issue). Ultimately, we figured out how to get the backend and frontend to work simultaneously on our registered domain without interference.

## What we learned
As a group, we managed to create an application that takes in an LLM (Gemini) via API, which has been running through numerous tests to develop a reasonable answer given said data for most of the time. Our backend developers had experience using JavaScript, but through the event, learned how to create an unpolished but effective backend that the frontend can communicate with. Finding out how Gemini works was fascinating as well because it made Python scripts on its own and ran them within itself to determine the relationships of what was in the data provided.

## What's next for Voltway Scooter Co.
As Gemini is a simple LLM currently in everyday use, we aim to advance and develop a better agent with a more targeted approach to procurement AI that will receive more attention as it slowly outperforms the average startup.
