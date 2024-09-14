# TodoApp

TodoApp is a simple task management web application where users can register, log in, and manage their tasks. Users can create, update, delete, and mark tasks as complete. The app is built using React for the frontend, and localStorage is used to save the tasks per user session.

You can view and use the deployed version of this app at:  
**[TodoApp Live Demo](https://todo-list-with-react-js-two.vercel.app/)**

## Features

- **User Authentication**: 
  - Users can register with their email and password.
  - Log in with credentials to access their personalized tasks.
  - Log out functionality to protect user sessions.

- **Task Management**:
  - **Add Tasks**: Users can add new tasks with a title and description.
  - **Edit Tasks**: Existing tasks can be edited for updates or changes.
  - **Delete Tasks**: Users can remove tasks from their list.
  - **Mark Tasks as Completed**: Tasks can be marked as completed and will appear as "Completed" in the UI.

- **Persistent Storage**: Tasks are saved per user in `localStorage` so users can return to their task list even after refreshing the page.

## Tech Stack

- **Frontend**: React, CSS
- **Storage**: localStorage (for saving tasks per user session)


## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/todoapp.git
 

2. Install Dependencies: Install the required dependencies using npm or yarn.
   npm install
   
3.Start the Development Server
npm start

