# Auto Delete Todo List

A simple interactive list application built with Next.js, React, TypeScript, and Tailwind CSS. Items can be moved between columns, and they automatically return to the main list after a 5-second delay.

visit the site https://auto-delete-todo-mocha.vercel.app/

<img width="490" alt="image" src="https://github.com/user-attachments/assets/c6dc8c52-db11-4ae6-a7c5-937408e56edd" />


## Features

* Displays an initial list of available items (fruits and vegetables).
* Click an item in the main list to move it to its corresponding 'Fruit' or 'Vegetable' column.
* Items automatically return to the bottom of the main list 5 seconds after being moved.
* Click an item in the 'Fruit' or 'Vegetable' column to return it immediately to the bottom of the main list.
* Displays the current count of items in each column header.

## Tech Stack

* [Next.js](https://nextjs.org/) (using App Router)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)

## Project Structure

The project follows a standard Next.js structure with some added organization:

* `app/page.tsx`: The main page component responsible for rendering the UI layout.
* `hooks/useTodoList.ts`: A custom React hook encapsulating the core state management (item lists), timer logic (`useRef`, `setTimeout`), and event handlers (`handleMoveToSide`, `handleMoveBack`, `executeAutoReturn`).
* `lib/data.ts`: Contains the initial array of items.
* `lib/types.ts`: Defines the TypeScript `Item` interface.

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Yanatg/auto-delete-todo.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd auto-delete-todo
    ```
3.  **Install dependencies:**
    Choose one of the following depending on your package manager:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
5.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works (Briefly)

* The `useTodoList` hook manages three state arrays: `mainList`, `fruitList`, `vegetableList`.
* When an item is moved to a side column (`handleMoveToSide`), a `setTimeout` is created.
* A `useRef` stores a `Map` linking item names to their active `setTimeout` IDs.
* If the timer completes, its callback (`executeAutoReturn`) removes the item from the side list, deletes the timer ID from the ref, and adds the item back to the main list.
* If an item in a side column is clicked (`handleMoveBack`), the function looks up the timer ID in the ref, clears the `setTimeout`, deletes the ID from the ref, removes the item from the side list, and adds it back to the main list.
* A `useEffect` hook with an empty dependency array ensures that any active timers stored in the ref are cleared when the component unmounts, preventing memory leaks.
