# Drag and Drop Demo Application

## Overview
This is a simple full-stack application that demonstrates drag-and-drop functionality using React for the front-end, a mocked service for the backend, and browsers local storage for persistence. The application allows users to reorder cards, view images in an overlay, and persist changes across reloads/refresh of the browser.

## Features
- Display cards based on static JSON data.
- Reorder cards via drag and drop.
- View card images in an overlay 
- Save the order of cards locally and update every five seconds if changes are made.

## Pending
 - Displaying a placeholder spinner during loading.

## Technologies Used
- **Frontend:** React, JavaScript, CSS
- **Backend:** Mock Service Worker (MSW)
- **Persistence:** Local Storage
- **Miscellaneous:** Axios, Debounce

## Installation

1. **Follow the Instructions**
   
   - This project is created on top Vite + React + SWC for simplicity and for demo purposes.

   ```sh
   - git clone https://github.com/asifshaik8639/dynamic-drag-drap-demo.git
   - cd dynamic-drag-drap-demo
   - run => npm install or if permission required run => sudo npm install
   - run => sudo npm install axios@latest --save-dev
   - run => npm run dev or if permission required run => sudo run dev
   - Application is ready to run on the given host and port.
   - Launch the application in the browser
   -End

## File Structure and Important Files

drag-drop-demo
│
├── public
│ ├── index.html
│ └── mockServiceWorker.js
│
├── src
│ ├── assets
│ │ ├── cat.jpg
│ │ ├── cow.jpg
│ │ ├── forest.jpg
│ │ ├── lion.jpg
│ │ └── tiger.jpg
│ │
│ ├── components
│ │ └── DraggableContainers.js
│ │
│ ├── hooks
│ │ └── useKeyDown.js
│ │
│ ├── mocks
│ │ ├── handlers.js
│ │ └── browser.js
│ │
│ ├── utils
│ │ └── debounce.js
│ │
│ ├── App.css
│ ├── index.js
│ └── setupTests.js
│
├── .gitignore
├── README.md
├── package.json
└── ...

## Thought Process and Approach

### Frontend
1. **Data Loading and Display**
   - Used React's `useEffect` to fetch data from the mocked API and store it in the state.
   - Used useState wherever required to re-render the component
   - Mapped the JSON data to render cards in a grid layout.

2. **Drag and Drop**
   - Dynamically set up drag and drop event listeners to handle reordering of cards.
   - Used a debounced function to save the updated order to the backend every five seconds.

3. **Image Overlay**
   - Implemented an overlay to display the clicked image.
   - Added an event listener to close the overlay on `ESC` key press.

### Backend
1. **Mock Service Worker (MSW)**
   - Created handlers to mock the API endpoints for fetching and updating cards.
   - Stored the initial data in local storage and updated it based on API requests.

## Conclusion
The project demonstrates a simple drag-and-drop functionality with data persistence. The code follows simple react and Javascript style with modern practices with React Hooks, functional components, and debouncing techniques. The backend is mocked for simplicity, making it easy to extend or replace with a real backend in the future.

## Note: 
 - When you are playing with the data, make sure to clear browser's local storage to reflect the latest data 
 - To reflect the latest changes after drag and drop, we need to wait for 5 seconds as we had applied debounce to improve performance and avoid unnecessary calling expensive calls.

## Contact
For any questions or issues, please contact [Asif Shaik](mailto:asif.shaik9199@gmail.com).
