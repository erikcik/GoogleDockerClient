import { setTimeout } from 'timers/promises';
import WebSocket from 'ws';
import fs from "fs"
import shell from "shelljs"
import { exec } from 'child_process';
import prisma from './prisma';

// const ws = new WebSocket('ws://localhost:8083');
 const ws = new WebSocket('ws://185.48.183.92:8083');

let receivedMessage: any

ws.on('open', async () => {
  console.log('Connected to server');

  // ws.send('Hello, server!');
  // await setTimeout(4000)
  // ws.send("second server")
});

ws.on('message', async (message: any) => {
  // const jsonObj = JSON.stringify(message) as any
  // console.log(jsonObj)
  // console.log(jsonObj.detailedTitle)
  // console.log(message)
  const parseObj = JSON.parse(message)
  // console.log(parseObj)
  // console.log(parseObj.detailedTitle)
  let {
    detailedTitle,
    restaurantTitle,
    ratingOverall,
    ratingOverallNumber,
    restaurantWebsiteLink,
    locationAddress,
    openDates,
    images,
    reviews,
  } = parseObj;

  let foundLocationString: any;
  let latRestaurant;
  let lngRestaurant;
  const fetchFilteredRestaurant = async (searchInput: string) => {
    if (searchInput) {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchInput}&types=geocode&language=tr&region=tr&key=AIzaSyDouV7VN1dE1QP-iHEmN_UUCTJ2LCItVkQ`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(JSON.stringify(data, null, "\t"));
        if (data.status === "OK") {
          const likelyIstanbul = data.predictions
            .filter((prediction: any) =>
              prediction.description
                .toLocaleLowerCase("tr-TR") // bu amına kodumun kodu yüzünden çalıştı tr nin amk
                .includes("istanbul")
            )
            .map((prediction: any) => ({
              name: prediction.description,
              placeId: prediction.place_id,
            }));

          foundLocationString = likelyIstanbul;
        } else {
          console.error("Error fetching street data:", data.error_message);
        }
      } catch (error) {
        console.error("Failed to fetch street data:", error);
      }
    } else {
      // Optionally reset filteredData if searchInput is empty
      foundLocationString = null;
    }
  };
  const handleLocationSelection = async (placeId: string, name: string) => {
    if (placeId) {
      const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=AIzaSyDouV7VN1dE1QP-iHEmN_UUCTJ2LCItVkQ`;
      try {
        const response = await fetch(placeDetailsUrl);
        const data = await response.json();
        console.log(JSON.stringify(data, null, "\t"));
        if (data.status === "OK") {
          const { lat, lng } = data.result.geometry.location;
          (latRestaurant = lat), (lngRestaurant = lng);
        } else {
          console.error("Error fetching street data:", data.error_message);
        }
      } catch (error) {
        console.error("Failed to fetch street data:", error);
      }
    } else {
      console.log("buraya mı girdin")
      latRestaurant = null;
      lngRestaurant = null;
    }
  };
  await fetchFilteredRestaurant(locationAddress);
  console.log("founded place id" + JSON.stringify(foundLocationString, null, 2));
  

  if (foundLocationString === undefined || foundLocationString === null || !foundLocationString) {
    latRestaurant = null;
    lngRestaurant = null;
  } else {
    console.log("durum vahim mi" + foundLocationString.slice(0,1).map((item: any) =>  {
      return item.placeId
    }) )
    const bruh = foundLocationString.slice(0,1).map((item: any) =>  {
      return item.placeId
    })
    await handleLocationSelection(
      bruh,
      foundLocationString.name
    );
    console.log("founded lat and lng" + latRestaurant, lngRestaurant);
  }


 
 
  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        detailedTitle,
        restaurantTitle,
        ratingOverall,
        ratingOverallNumber,
        restaurantWebsiteLink,
        locationAddress,

        restaurantLat: latRestaurant,
        restaurantLng: lngRestaurant,

         ...(openDates !== null
      ? { openDates: { create: openDates } }
      : {}),
    ...(reviews !== null ? { reviews: { create: reviews } } : {}),
    ...(images !== null ? { images: { create: images } } : {}),
        
      },
    });
    console.log(restaurant)
  } catch (error) {
    console.error(error);
  }

});

ws.on('close', () => {
  // const messageOrder = receivedMessage.restaurantTitle
  // console.log(messageOrder);
  // const navigatedMultiple = (Math.floor(messageOrder / 30)) * 30
  const navigatedMultiple = 30
  // exec(`sh bruh.sh ${navigatedMultiple}`, (error, stdout, stderr) => {
  //   console.log(stdout);
  //   console.log(stderr);
  //   if (error !== null) {
  //     console.log(`exec error: ${error}`);
  //   }
  // });



  console.log('Disconnected from server');
});

