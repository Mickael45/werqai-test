# Task Manager

## Summary

Here's you'll find the code for the task manager.
There are 2 versions of it living in 2 different branches:

1. **Main**: The code produced in the 2h time limit
2. **Full**: A more polished version produced in 4h.

## Features

### Main

- Task creation
- Task title and description edition using an edition modal
- Status update through 3 buttons

### Full

- More polished UI
- Task list filter by status
- Task list filter by search term
- Task list sorting by:
  - Title a-z
  - Title z-a
  - Latest
  - Oldest
  - Last updated
- Task soft deletion
- Task history with modal
- Pagination

## How to run the project

**Given the time limit I didn't take the time to set up .env static PORT values.
So in order for everything to work nicely make sure to follow this order:**

1. Run the server first and make sure it runs on port 3000
2. Run the client and make sure it runs on the port 3001

If you run the projects in this order, you shouldn't have to do anything, the ports should be assigned properly by default.

### How to run the backend

```bash
cd backend
yarn install
touch .env
echo DATABASE_URL="postgresql://postgres:postgres@localhost:5432/werqai-test-db" >> .env
npx prisma migrate dev
yarn start
```

### How to run the frontend

```bash
cd frontend
yarn install
yarn dev
```

## How to check the full version:

Go to the full branch

```
git checkout full
```

Run the migrations

```
npx prisma migrate dev
```

Rerun the server first

```
yarn start
```

Then the client

```
yarn dev
```

You should be all set, don't hesitate to ping me if you have any issues
