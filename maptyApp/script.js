"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class App {
  #map;
  #mapE;
  #workouts = [];
  constructor() {
    this._getPosition();
    this._getLocalStorage();
    inputType.addEventListener("change", this._toggleElevationField);
    form.addEventListener("submit", this._newWorkout.bind(this));
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this));
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    // const url=`https://www.google.com/maps/@${latitude},${longitude}`
    // console.log(url);

    const coords = [latitude, longitude];
    if (!this.#map) this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
  }
  _showForm(e) {
    form.classList.remove("hidden");
    inputDistance.focus();
    this.#mapE = e;
    setTimeout(() => (form.style.display = "grid"), 1000);
  }
  _hiddenForm() {
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        "";
    form.style.display = "none";
    form.classList.add("hidden");
  }

  _toggleElevationField() {
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  }

  async _renderWorkoutMarker(workout) {
    if (this.#map == null) this.#map = L.map("map").setView(workout.coords, 13);
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidht: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        }),
      )
      .setPopupContent(`Workout`)
      .openPopup();
  }

  _renderWorkout(workout) {
    console.log(workout);
    form.insertAdjacentHTML(
      "afterend",
      `
    <li class="workout workout--${workout.type}" " data-id="${workout.id}">
          <h2 class="workout__title"> ${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
     

            ${
              workout.type === "running"
                ? `
                     <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(2)}</span>
            <span class="workout__unit">min/km</span>
          </div>
                
                <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>`
                : `
                    <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(2)}</span>
            <span class="workout__unit">km/h</span>
          </div>
                <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>`
            }
        </li>
    `,
    );
  }
  _newWorkout(e) {
    e.preventDefault();
    this._showForm(this.#mapE);

    const validInputs = (...inputs) =>
      inputs.every((e) => e > 0 && Number.isFinite(e));
    const { lat, lng } = this.#mapE.latlng;
    const type = inputType.value;
    let workout;
    if (type == "running") {
      if (
        !validInputs(
          +inputDistance.value,
          +inputCadence.value,
          +inputDuration.value,
        )
      )
        return alert("please enter valid numbers");
      workout = new Running(
        [lat, lng],
        +inputDistance.value,
        +inputDuration.value,
        +inputCadence.value,
      );
    }

    if (type == "cycling") {
      if (
        !validInputs(
          +inputDistance.value,
          +inputElevation.value,
          +inputDuration.value,
        )
      )
        return alert("please enter valid numbers");
      workout = new Cycling(
        [lat, lng],
        +inputDistance.value,
        +inputDuration.value,
        +inputElevation.value,
      );
    }

    this.#workouts.push(workout);
    this._renderWorkout(workout);
    this._renderWorkoutMarker(workout);
    this._hiddenForm();
    this._setLocalStorage();
  }
  _moveToPopup(e) {
    if (!this.#map) return;
    const workoutEl = e.target.closest(".workout");

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id,
    );

    this.#map.setView(workout.coords, 15, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach((e) => {
      this._renderWorkout(e);
      this._renderWorkoutMarker(e);
    });
  }
}

const app = new App();

class Workout {
  date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  id = (Date.now() + "").slice(-10);
  constructor(coords, distance, duration) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
  _setDescription() {
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${this.date}`;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.distance = distance;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = "cycling";

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling';
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// let map,mapE;
// if (navigator.geolocation){
//     navigator.geolocation.getCurrentPosition((position)=>{
//         const{latitude,longitude}=position.coords;
//         // const url=`https://www.google.com/maps/@${latitude},${longitude}`
//         // console.log(url);

//         const coords=[latitude,longitude];
//          map = L.map('map').setView(coords, 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// map.on('click',(e)=>{
//     form.classList.remove('hidden');
//     inputDistance.focus();
//     mapE=e;
// })
//     }
// )
// }
// =================================================================
// form.addEventListener('submit',(e)=>{
// e.preventDefault();
// form.classList.add('hidden');
//  const {lat,lng}=mapE.latlng;
//  const maybe= (document.querySelector('.form__row--hidden')).querySelector('.form__input--cadence');

// L.marker([lat,lng]).addTo(map)
//     .bindPopup(L.popup({
//         maxWidth:250,
//         minWidht:100,
//         autoClose:false,
//         closeOnClick:false,
//         className:maybe===null?'running-popup':'cycling-popup'
//     }))
//     .setPopupContent(`${(maybe===null)?'🏃‍♂️ Running':'🚴‍♀️ Cycling'} on ${new Date().toLocaleString('en-US',{month:'long'})} ${new Date().getDate()}`)
//     .openPopup();

// containerWorkouts.insertAdjacentHTML('beforeend',`
//     <li class="workout ${maybe===null?'workout--running':'workout--cycling'}" data-id="1234567890">
//           <h2 class="workout__title">Running on ${new Date().toLocaleString('en-US',{month:'long'})} ${new Date().getDate()}</h2>
//           <div class="workout__details">
//             <span class="workout__icon">${maybe===null?'🏃‍♂️':'🚴‍♀️'}</span>
//             <span class="workout__value">${inputDistance.value}</span>
//             <span class="workout__unit">km</span>
//           </div>
//           <div class="workout__details">
//             <span class="workout__icon">⏱</span>
//             <span class="workout__value">${inputDuration.value}</span>
//             <span class="workout__unit">min</span>
//           </div>
//           <div class="workout__details">
//             <span class="workout__icon">⚡️</span>
//             <span class="workout__value">${(inputDuration.value/inputDistance.value).toFixed(2)}</span>
//             <span class="workout__unit">min/km</span>
//           </div>

//             ${maybe===null?`<div class="workout__details">
//             <span class="workout__icon">🦶🏼</span>
//             <span class="workout__value">${inputCadence.value}</span>
//             <span class="workout__unit">spm</span>
//           </div>`:`<div class="workout__details">
//             <span class="workout__icon">⛰</span>
//             <span class="workout__value">${inputElevation.value}</span>
//             <span class="workout__unit">m</span>
//           </div>`}
//         </li>
//     `);

//   inputCadence.value=inputDistance.value=inputDuration.value=inputElevation.value='';
// inputDistance.focus();
// });

// inputType.addEventListener('change',(e)=>{
//     console.log(e);
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
// })
