RAG-Powered News Chatbot - Frontend
Overview

This is the frontend for a RAG (Retrieval-Augmented Generation) powered chatbot over news articles.
It handles:

Displaying chat messages for each session

Sending user queries to the backend API

Streaming responses from the chatbot (typed-out reply)

Resetting chat sessions

Tech Stack

Frontend: React

Styling: SCSS

Chat communication: REST API (Node.js backend)

Session handling: Redis (via backend)

Prerequisites

Node.js >= 18.x

NPM >= 9.x

Getting Started (Local)

Clone the repository:

git clone https://github.com/Ujjwalverma2803/rag-news-chatbot-frontend.git
cd rag-news-chatbot-frontend


Install dependencies:

npm install



Run the frontend:

npm start


Open http://localhost:3000
 in your browser.

Features

Chat screen: Shows past messages per session

Input box: Allows users to type queries

Streaming responses: Chatbot replies appear gradually

Reset session: Clears the current session’s history

Notes

Ensure your backend is running (docker-compose up --build) before starting the frontend.
