# Web Chat

Chat application built with Next.js, Supabase, and Tailwind CSS

## Features

- Real-time chat functionalities
- Responsive design for a seamless experience on all devices
- Secure authentication and data handling with Supabase
- Elegant UI with Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker
- Docker Compose

## Getting Started

To get the application running on your local machine, follow these steps:

### Step 1: Clone the Repository

Clone this repository to your local machine using:

```bash
git clone https://github.com/aleksandercie/web-chat.git
cd web-chat
```

### Step 2: Setup Environment Variables

Create a .env file in the root directory of the project and add the following lines:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ybstemsllzxyxwckxwex.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlic3RlbXNsbHp4eXh3Y2t4d2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5NzI0NDUsImV4cCI6MjAyMjU0ODQ0NX0.dUBcQE_cLbuwHqbZQkdxH9UCrNaRJcs-1piteugohl4
```

### Step 3: Running with Docker

To run the application using Docker, execute the following command in the root directory of the project:

```bash
docker-compose up --build
```

This command will build the Docker image and start the container. The first build might take some time as it needs to install all dependencies.

### Step 4: Accessing the Application

Once the build process is complete and the containers are up and running, open your web browser and go to:

```bash
http://localhost:3000
```

You should now be able to see the Web Chat application running.

## Development

To develop the application further or make any changes, you can use the following npm scripts:

- npm run dev - Starts the development server.
- npm run build - Builds the application for production.
- npm run start - Runs the built application in production mode.
- npm run lint - Lints the codebase for potential errors.
