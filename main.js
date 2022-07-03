class Car {
    constructor (id, carModel, dayprice, passengers, fuel, transmission, abs){
        this.id = parseInt(id);
        this.name = carModel;
        this.dayprice = parseInt(dayprice);
        this.passengers = parseInt(passengers);
        this.fuel = fuel;
        this.transmission = transmission;
        this.abs = abs;
    }
}

const arrayCars = [];
arrayCars.push(new Car (nextIndexOf(arrayCars),"Etios", 2000,4,"Nafta","Manual",false));
arrayCars.push(new Car (nextIndexOf(arrayCars),"Corolla", 3000,5,"Nafta","Automatico",true));
arrayCars.push(new Car (nextIndexOf(arrayCars),"Hilux", 4000,5,"Diesel","Manual",true)); 
console.log(arrayCars);

class Reservation {
    constructor (id, carname, quantity, rentedDays, dayPrice, total){
        this.id = parseInt(id);
        this.carname = carname;
        this.quantity = parseInt(quantity);
        this.renteddays = parseInt(rentedDays);
        this.dayprice = Number(dayPrice);
        this.total = Number(total); 
    }
}

const arrayReservations = [];
let keepBuying;

function buy(){
    do {
    let reserveThis;
    let modelInput = prompt("Que modelo desea reservar?");

    if (modelInput && isNaN(modelInput)){
        modelInput = modelInput.toLowerCase();
        reserveThis = arrayCars.find(model => (model.name).toLowerCase() === modelInput);
    } else {
        alert('No encontramos el modelo solicitado');
    }

    let quantityInput;
    if(reserveThis){
        quantityInput = prompt(`Cuantos ${modelInput} precisa reservar?`);
        while (!quantityInput || isNaN(quantityInput) || quantityInput < 1){
            quantityInput = prompt(`Ingrese un número válido. Cuantos ${modelInput} precisa reservar?`);
        } 
    } else {
        break;
    }

    let daysInput;
    if(quantityInput){
        daysInput = prompt(`Por cuantos días precisa los ${quantityInput} ${modelInput}?`);
        while (!daysInput || isNaN(daysInput) || daysInput < 1){
            daysInput = prompt(`Ingrese un número válido. Por cuantos días precisa los ${quantityInput} ${modelInput}?`);
        } 
    } else {
        break;
    }

    if(reserveThis && quantityInput && daysInput) {
        
        let name = reserveThis.name;
        let dayprice = reserveThis.dayprice;
        let total = Number(reserveThis.dayprice) * daysInput * quantityInput;
        console.log(total);
        arrayReservations.push(new Reservation (nextIndexOf(arrayReservations), name, quantityInput, daysInput, dayprice, total));
        sum('total');

    } else {
        alert('Algo salio mal');
    }

    keepBuying = confirm('Quiere seguir comprando?');

    } while(keepBuying);
}

function nextIndexOf(array) {
    return array.length +1;
};

function sum (key){
    const finaltotal = arrayReservations.reduce((a, b) => a + b[key], 0);
    const msj = document.getElementById("msj");
    const msjtitle = document.getElementById("msjtitle");
    const msjmsj = document.getElementById("msjmsj");
    msjmsj.innerText = finaltotal;
    msjtitle.innerText = 'Su compra se realizó con exito';
    

    console.log(finaltotal);
}

console.log(arrayReservations);


// Cargar contenido
function removeContent(){
    content = document.getElementById("cards");
    content.innerHTML = '';
}

function loadCards(){
    removeContent();
    let destination = document.getElementById("cards");
    for (const car of arrayCars) {
        let card = document.createElement("section");
        card.classList.add("text-gray-600");
        card.classList.add("body-font");

    card.innerHTML =    `
                        <div class="container max-w-7xl my-10 mx-auto px-4 sm:px-6 lg:px-8 card" id="${car.id}">
                            
                            <div class="p-5 flex items-center mx-auto bg-white border-b border-gray-200 rounded-lg sm:flex-row flex-col min-width-360">
                                <!-- Imagen principal tarjeta -->
                                <div class="w-80 h-auto pr-10 pr-0 sm:pr-10 sm:w-60 inline-flex items-center justify-center flex-shrink-0">
                                    <img src="https://rently.blob.core.windows.net/hertz/CarModel/26756080-0e17-4e05-8e6a-fa67489347fe.jpg"/>
                                </div>
                                
                                <!-- Caracteristicas del vehiculo -->
                                <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                    <h1 class="text-black text-2xl title-font font-bold mb-2">${car.name}</h1>
                                    <div class="inline-flex space-x-2">
                                        <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-speedometer-cars-components-those-icons-lineal-color-those-icons.png" class="inline-flex "/>
                                        <p> Kilometraje ilimitado</p>
                                    </div>
                                    <div class="py-4 characteristics">
                                        <div class=" inline-block mr-2">
                                            <div class="flex pr-2 h-full items-center space-x-2">
                                                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-safety-seat-cars-components-those-icons-lineal-color-those-icons.png"/>
                                                <p class="title-font font-medium">${car.passengers}</p>
                                            </div>
                                        </div>
                                        <div class="inline-block mr-2">
                                            <div class="flex  pr-2 h-full items-center space-x-2">
                                                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-fuel-cars-components-those-icons-lineal-color-those-icons.png"/>
                                                <p class="title-font font-medium">${car.fuel}</p>
                                            </div>
                                        </div>
                                        <div class="inline-block mr-2">
                                            <div class="flex  pr-2 h-full items-center space-x-2">
                                                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-gearshift-cars-components-those-icons-lineal-color-those-icons-3.png"/>
                                                <p class="title-font font-medium">${car.transmission}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="sm:text-right text-center ml-0 mt-6 sm:mt-0 space-x-2 w-15 max-w-sm">
                                    <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-500 text-base font-medium text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200 sm:ml-3 sm:w-auto sm:text-sm">Alquilar</button>
                                    <a class="mt-3 text-indigo-500 inline-flex items-center">Mas info
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                        </a>
                                </div>

                            </div>
                        </div>
                        `;
        destination.appendChild(card);
    }

    let cards = document.getElementsByClassName("card");

    for (let card of cards) {
        for (let car of arrayCars) {
            if(card.id == car.id && car.abs == true){
                const characteristics = card.querySelector('.characteristics');
                characteristics.innerHTML += `
                                        <div class="inline-block mr-2">
                                            <div class="flex pr-2 h-full items-center space-x-2">
                                                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-abs-cars-components-those-icons-lineal-color-those-icons.png"/>
                                                <p class="title-font font-medium">ABS</p>
                                            </div>
                                        </div>
                                        `;
            }
        }
    }
}   

