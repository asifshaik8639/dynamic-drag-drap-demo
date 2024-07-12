// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

const defaultCardItems = [
  { 
    "type": "bankdraft", 
    "title": "Kitty", 
    "position": 0
  },
  { 
    "type": "billofloading",
    "title": "Cow", 
    "position": 1
  }, 
  {
    "type": "invoice", 
    "title":"Forest", 
    "position": 2
  }, 
  {
    "type": "bankdraft2", 
    "title": "Lion", 
    "position": 3
  }, 
  {
    "type":"billoflading2", 
    "title":"Tiger", 
    "position": 4
  }
];

/* The `export const handlers` in the provided code block is an array of request handlers for mocking
API calls using MSW (Mock Service Worker) in a JavaScript environment. Here's a breakdown of what
each handler is doing: */
export const handlers = [
  http.get('/api/mock/cards', () => {
    let result = [];
    if (!localStorage.getItem('localCardItems')) {
      localStorage.setItem('localCardItems', JSON.stringify(defaultCardItems));
      console.log('Data set in local storage');
      result = defaultCardItems;
    } else {
      let data = localStorage.getItem('localCardItems');
      console.log('in else case', data);
      if (data) {
        result = JSON.parse(data);
      }

    }
    return HttpResponse.json(result);
  }),
  http.post('/api/mock/UpdatecardsOrder', async ({ request }) => {
    const updateItemsList = await request.json();
    console.log('Received payload:', updateItemsList);

    localStorage.removeItem("localCardItems");
    localStorage.setItem('localCardItems', JSON.stringify(updateItemsList));

    return HttpResponse.json({
     status: 200,
     data: updateItemsList
    });    
  })
];
