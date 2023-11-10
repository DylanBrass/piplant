import Navbar from "./NavigationBar";
import './HomePage.css';
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import plant2 from './Plant2.png'
import lightBulb2 from './light-bulb.png'
import lightBulb1 from './light-bulb2.png'


function MainPage() {
  const[recentValues, setRecentValues] = useState()
  const[selectedLight, setSelectedLight] = useState(1)
  const[numberOfLights, setNumberOfLights] = useState(0)
  const [isLightOn, setIsLightOn] = useState(false);

  
  const getRecent = () =>{
    axios
          .get('http://'+window.location.hostname+':5000/getCurrentValues')
          .then(function (response) {
          
            setRecentValues(response.data.allValues)
            console.log(response.data.allValues)
          })
          .catch((error) => {
            console.log(error);
        })
  }

  const toggleLight = () => {
    axios.post('http://' + window.location.hostname + ':5000/toggleLight/' + selectedLight)
      .then(function (response) {
        console.log(response)
        setIsLightOn(!isLightOn);
      })
      .catch(function (error) {
        console.log(error)
      });


  }
  useEffect(() => {
    axios.get('http://' + window.location.hostname + ':5000/numberOfLights')
    .then(function (response) {
      setNumberOfLights(response.data.numberOfLights)
    }).catch(function (error) {
      console.log(error);
    })

    getRecent()

  },[]) 
  return (
    <div>
      <Navbar />

      <h1>Home Page</h1>
      <div className="plant-details-container">
        <select
          onChange={(e) => setSelectedLight(e.target.value)}
          defaultValue={selectedLight}>
          {
            Array.from(Array(numberOfLights).keys()).map((i) => {
              return <option value={i + 1}>{i + 1}</option>
            })
          }
        </select>

        <button class="toggle-button" onClick={() => toggleLight()}>
          <img src={isLightOn ? lightBulb2 : lightBulb1}  alt="Lightbulb Image" className="toggle-img" />
        </button>

        <img src={plant2} alt="Plant Image" className="img" />

        <button class="button" role="button" onClick={() => getRecent()}>Get Current Value</button>
      <h2>Recent Values</h2>
      {
      Array.from(Array(recentValues).keys()).map((i) => {
        console.log(recentValues)
        console.log(i)
      })      
      }
    </div>
    </div>
  );
}

export default MainPage;