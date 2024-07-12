import { useEffect, useRef, useState } from "react";
import '../assets/App.css';
import axios from "axios";
import lionImage from '../assets/lion.jpg';
import catImage from '../assets/cat.jpg';
import forestImage from '../assets/forest.jpg';
import cowImage from '../assets/cow.jpg';
import tigerImage from '../assets/tiger.jpg';
import useKeyDown from '../hooks/useKeyDown';
import debounce from '../utils/debounce';

export default function DraggableContainers() {
  
  const containerRefs = useRef([]);
  const [itemsList, setItemsList] = useState([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = { 
    'bankdraft': catImage,
    'billofloading': cowImage,
    'invoice': forestImage,
    'bankdraft2': lionImage,
    'billoflading2': tigerImage
  };

  /**
   * The function `handleImageClick` sets the selected image and makes the overlay visible in a React
   * application.
   */
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsOverlayVisible(true);
  };

  
  /**
   * The function `saveUpdateItemsList` asynchronously saves the updated items list by extracting data
   * attributes from the container's children and sending a POST request to a mock API endpoint.
   */
  const saveUpdateItemsList = async(container) => {

    try {
      let updatedItemsContainerList = container?.children &&
      Array.from(container?.children).length > 0 ?  Array.from(container?.children) : [];
  
      let updateItemsList = [];
  
      for(let index = 0 ; index < updatedItemsContainerList.length; index++) {
        let newItem = { // To dynamically get the new Update Items Data
          title: updatedItemsContainerList[index].getAttribute('data-title'),
          type:  updatedItemsContainerList[index].getAttribute('data-type'),
          position: index
        }

        updateItemsList.push(newItem);
      }

      console.log("updateItemsList 123 => ",  updateItemsList);

      await axios.post('/api/mock/UpdatecardsOrder', updateItemsList);

    } catch (error) {
      console.error("error in saveUpdateItemsList :", error);
    };

  }

  //Will be called after 5 seconds post the trigger request
  let debounceReOrderListFunc = debounce(saveUpdateItemsList, 5000);

 /**
  * The function `setUpAllDragEventListeners` sets up drag and drop event listeners for containers,
  * allowing draggable elements to be reordered within the containers.
  */
  const setUpAllDragEventListeners = (containers) => {
    try {
      let draggedBox = null;
      let draggedBoxIndex = null;
      containers?.forEach((container) => { //Setting listeners dynamically 
          // info whenver drag behaviour starts 
          container.addEventListener("dragstart", (event) => {
              draggedBox = event.target;
              draggedBoxIndex = Array.from(container.children).indexOf(draggedBox);
              event.target.style.opacity="0.5";
          });
          // when you are dragging over a drop point , only triggered when you are in draggable area  
          container.addEventListener("dragover", (event) => {
              event.preventDefault();
          });
          // when you either leave the draggable container / press esc
          container.addEventListener("dragend", (event) => {
              event.target.style.opacity = "1";
          });
          // drop represent -> when you drop a draggable element in a drop zone
          container.addEventListener("drop", (event) => {
              console.log("Drop happened");
 
              if (draggedBox) {
               debounceReOrderListFunc(container); // Called after 5 seconds
               container.appendChild(draggedBox);
             }
          });
      });

    } catch (error) {
      console.error("error in setUpAllDragEventListeners = > ", error);
    };
  }

  /**
   * The function `fetchCardsData` asynchronously fetches card data from a mock API and sets the
   * retrieved data to the items list state variable.
   */
  const fetchCardsData = async () => {
      try {
        //Mock api to get cards data
        const response = await fetch('/api/mock/cards');
        const data = await response.json();
        setItemsList(data);
        console.log('response of fetchCardsData => ', data);

      } catch (error) {
        console.error("error in fetchCardsData = > ", error);
      };
  };


  /* The `useEffect` hook in the provided code snippet is responsible for setting up initial behavior
  when the component mounts and cleaning up any resources when the component unmounts.  */
  useEffect(() => {
    fetchCardsData();// To fetch the data from the mock server
    const containers = containerRefs.current;
    setUpAllDragEventListeners(containers); // To setup all the drag drop events dynamically
      // Cleanup event listeners on component unmount
      return () => {
        containers.forEach((container) => {
          container.removeEventListener("dragstart", (event) => {});
          container.removeEventListener("dragover", (event) => {});
          container.removeEventListener("dragend", (event) => {});
          container.removeEventListener("drop",(event) => {});
        });
      };

  }, []);

  // Hook for Overlay, Escape close handler
  useKeyDown('Escape', () => setIsOverlayVisible(false));

  /* The `return` statement in the provided code snippet is responsible for rendering the JSX elements
  that make up the user interface of the `DraggableContainers` component.  */
  return (
    <div className="app-container">
       <h1>Drag and Drop Demo</h1>
       <div className="container image-gallery" 
            id="parent-container"
            ref={(el) => containerRefs.current[0] = el}>
        {
          itemsList.map((item, index) => <div key={index}
                                          data-type={item.type}
                                          data-position={item.position}
                                          data-title={item.title}
                                          className="card" 
                                          draggable="true">
                                               <img className='gallery-image' 
                                                key={`${index}image`} 
                                                src={images[item.type]} 
                                                draggable="false"
                                                onClick={() => handleImageClick(images[item.type])} />
                                                <div className='card-title-cls'
                                                    key={`${index}title`} >
                                                    {item.title}
                                                </div>
                                      </div>)
        }
       </div>
       { //For overlay of the Image
          isOverlayVisible && (
          <div className="overlay" onClick={() => setIsOverlayVisible(false)}>
            <img src={selectedImage} alt="Overlay" className="overlay-image" />
          </div>)
       }
    
    </div>
  )

}