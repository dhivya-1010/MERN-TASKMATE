# Taskmate Backend

This is the backend API for the Taskmate task management application.

## Installation

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Server

To start the development server with auto-reload:

```
npm run dev
```

To start the production server:

```
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Data Structure

Each task has the following structure:

```json
{
  "id": "uuid",
  "name": "Task name",
  "time": "ISO timestamp",
  "completed": false
}
```
