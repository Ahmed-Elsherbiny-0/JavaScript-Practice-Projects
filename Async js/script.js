"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// const show = function (name) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${name}`);
//   request.send();

//   request.addEventListener("load", () => {
//     const data = JSON.parse(request.responseText)[0];
//     console.log(data);
//     render(data);
//   });
// };

// show("egypt");
// show("syria");
// show("usa");
// show("sudan");

const render = function (data) {
  countriesContainer.insertAdjacentHTML(
    "beforeend",
    `
       <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
    `,
  );
  countriesContainer.style.opacity = 1;
};

const dowrok = function (name) {
  return fetch(`https://restcountries.com/v2/name/${name}`)
    .then((e) => getJson(e))
    .then((e) => {
      render(e[0]);
      console.log(e);
      if (!e[0]?.borders) {
        throw new Error("there is no borders");
      }
      return e[0].borders?.[0];
    })
    .then((e) => fetch(`https://restcountries.com/v2/name/${e}`))
    .then((e) => getJson(e))
    .then((e) => render(e[0]))
    .catch((err) =>
      countriesContainer.insertAdjacentText(
        "beforeend",
        `something went worng ${err.message}`,
      ),
    );
};

// dowrok("usa");
// ======================================================
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const errorHelper = function (msg) {
  throw new Error(msg);
};
const getJson = function (e, msg = "location not found") {
  if (!e.ok) {
    throw new Error(`${msg} ${e.status}`);
  }
  return e.json();
};

const whereAmI = function (...coords) {
  const [lat, lng] = coords;
  const request = fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
  )
    .then((e) => {
      return getJson(e);
    })
    .then((e) => e.countryName)
    .then((e) => dowrok(e))
    .catch((err) => {
      countriesContainer.insertAdjacentText(
        "beforeend",
        `something went wrong ${err.message}`,
      );
      countriesContainer.style.opacity = 1;
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(40.933, 40.474);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input.
 This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path.
  When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. 
  The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and
 load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab,
 otherwise images load too fast.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

// let currentImg;

// createImage("img1.jpg")
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage("img2.jpg");
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((err) => console.error(err));

// const photos = document.querySelector(".images");

// const createImage = function (url) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement("img");
//     img.src = url;
//     img.addEventListener("load", () => {
//       photos.prepend(img);
//       resolve(img);
//     });
//     img.addEventListener("error", () => {
//       reject(new Error("cant upload the photo"));
//     });
//   })
//     .then((e) => {
//       return wait(2).then(() => e);
//     })
//     .then((e) => {
//       e.style.display = "none";
//       e.src = "img1.jpg";
//       e.addEventListener("load", (k) => {
//         e.style.display = "block";
//         wait(2).then(() => (e.style.display = "none"));
//       });
//     })
//     .catch((err) => console.error(`something went wrong ${err.message}`));
// };
// createImage("img2.jpg");

// const where = async function (country) {
//   const res = await fetch(`https://restcountries.com/v2/name/${country}`);
//   console.log("hello");
//   console.log(res);
// };
// where("egypt");
// console.log("hi ahmed");

const loadNPause = async function () {
  let img = await createImage("img1.jpg");
  await wait(2);
  img.style.display = "none";

  img = await createImage("img2.jpg");
  await wait(2);
  img.style.display = "none";
};
// loadNPause();

const loadAll = async function (imges) {
  const imgs = imges.map((e) => createImage(e));
  const data = await Promise.all(imgs);
  console.log(data);
};
// loadAll(['img2.jpg','img1.jpg']);
