import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import DraggableContainers from './components/DraggableContainers';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  console.log('in development mode');
 
  const { worker } = await import('./mocks/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

//For demo purposes only as it is pointing to Mock server
enableMocking().then(() => {

  console.log('in enableMocking then success => ');
  
  ReactDOM.createRoot(document.getElementById('root'))
  .render(<React.StrictMode>
            <DraggableContainers />
          </React.StrictMode>)
})


