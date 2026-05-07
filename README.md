# Ethara Feedback Playground

A full-stack RLHF-inspired evaluation platform built to simulate human feedback collection workflows used in modern AI alignment systems.

## Live Demo

- [Live Application](https://ethara-feedback-playground.vercel.app/)
- [GitHub Repository](https://github.com/Yashu082/ethara-feedback-playground)

## Project Overview

Ethara Feedback Playground is a lightweight AI evaluation interface where users compare two AI-generated responses and provide preference feedback.

The project is inspired by Reinforcement Learning from Human Feedback (RLHF) workflows used in large language model alignment and evaluation systems.

Instead of building a generic CRUD-based management system, this project focuses on:

- Human-in-the-loop evaluation
- AI response ranking
- Audit logging
- Persistent evaluation tracking

## Features

- Compare two AI-generated outputs
- Select preferred response
- Equal-quality evaluation option
- Persistent audit logging
- Dynamic evaluation history loading
- Production deployment with Supabase + Vercel
- Dark themed evaluation workspace
- Unique RLHF-style evaluation IDs
- Responsive UI

## Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend / Database

- Supabase
- PostgreSQL

### Deployment

- Vercel

### Development Tools

- GitHub Copilot
- Cursor AI
- ChatGPT

## System Architecture

```text
Frontend (Next.js)
       ↓
Evaluation Actions
       ↓
Supabase Client
       ↓
PostgreSQL Database
       ↓
Persistent Audit Log
```

## Database Schema

### `evaluations`

| Column        | Type |
|---------------|------|
| `id`          | text |
| `timestamp`   | text |
| `evaluation_id` | text |
| `choice`      | text |

## Core Workflow

1. User reviews two AI-generated responses
2. User selects:
   - Variant Orion Better
   - Variant Nova Better
   - Comparable Outputs
3. Evaluation entry is generated
4. Data is persisted into Supabase
5. Audit history updates instantly
6. Evaluation history reloads on refresh

## Local Setup

### Clone Repository

```bash
git clone https://github.com/Yashu082/ethara-feedback-playground.git
```

### Navigate Into Project

```bash
cd ethara-feedback-playground
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Development Server

```bash
npm run dev
```

## Deployment

The application is deployed using Vercel.

Production deployment includes:

- Environment variable configuration
- Supabase database integration
- Dynamic rendering configuration
- Production build optimization

## Challenges Solved

- Turbopack runtime instability
- Next.js deployment configuration
- Supabase RLS policies
- TypeScript build issues
- Dynamic rendering configuration
- Environment variable deployment issues
- Persistent audit synchronization

## Future Improvements

- Authentication system
- Real AI model integrations
- Evaluation analytics dashboard
- Response quality scoring
- Multi-user support
- Evaluation filtering
- Admin moderation panel

## Author

**Yaswanth Koppanathi**

Built as an RLHF-inspired evaluation platform for AI alignment workflow simulation.
