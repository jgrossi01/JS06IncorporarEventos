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
let keepBuying = true;


/*
HTMLmodelInput.addEventListener("click", () => {
console.log(HTMLmodelInput.value);
})
*/
const HTMLsearchForm = document.getElementById('searchForm'); 
//const HTMLsearchForm = document.getElementById('searchForm'); 

const HTMLquantityInput = document.getElementById('quantityInput');
const HTMLdaysInput = document.getElementById('daysInput');
const HTMLclearFormBtn = document.getElementById('clearForm');
HTMLsearchForm.addEventListener("submit", formValidate);

HTMLclearFormBtn.addEventListener("click", () => {
    HTMLsearchForm.reset();
    })

function formValidate(event){
    event.preventDefault();
    const search = {
        model: HTMLquantityInput.value,
        quantity: edad.value,
        days: 
    }
}



do {
    let reserveThis;
    let modelInput = prompt("Que modelo desea reservar? Podemos ofrecerle los siguientes:\n" + availableCars());

    if (modelInput){
        modelInput = modelInput.toLowerCase();
        reserveThis = arrayCars.find(model => model.name.toLowerCase() === modelInput);
        console.log(reserveThis)
        while(!reserveThis && keepBuying) {
            keepBuying = confirm('No encontramos el modelo solicitado. Desea seguir comprando?')
            if(keepBuying){
                modelInput = prompt("Que modelo desea reservar?");
                modelInput = modelInput.toLowerCase();
                reserveThis = arrayCars.find(model => model.name.toLowerCase() === modelInput);
            } else {
                break;
            }
        }
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
        saveThis(name, quantityInput, daysInput, dayprice, total);   

    } else {
        alert('Algo salio mal');
    }

    keepBuying = confirm('Quiere seguir comprando?');
} while(keepBuying);

let hasVoucher;
let cuponError;
let voucherReturn;
let totalDiscount;
let finalQty;
let finalTotal;

if (arrayReservations.length > 0){
    finalQty = arrayReservations.reduce((a, b) => a + b['quantity'], 0);
    finalTotal = arrayReservations.reduce((a, b) => a + b['total'], 0);

    hasVoucher = confirm("Tiene un cupón de descuento?");
    while (hasVoucher) {
        if (cuponError) {
          hasVoucher = confirm("No encontramos el cupón. Desea volver a intentar?");
          if (hasVoucher) {
            voucherCode = prompt(`Ingrese su cupón`);
          }
        } else {
            voucherCode = prompt(`Ingrese su cupón`);
        }

        if (voucherCode) {
          voucherReturn = applyVoucher(voucherCode.toLowerCase());
        }
    }
    
    console.log('Reservó correctamente '+ finalQty +' vehiculos por un total de $'+ finalTotal);
    addMsj('Reservó correctamente '+ finalQty +' vehiculos por un total de $'+ finalTotal, true);
    
    if(voucherReturn) {
        console.log(voucherReturn);
        addMsj(voucherReturn,true);
    }
} else {
    console.log('No realizó ninguna reserva.');
    addMsj('No realizó ninguna reserva.',true);
}

console.log(arrayReservations);

function nextIndexOf(array) {
    return array.length +1;
}

function availableCars() {
    return arrayCars.map(u => u.name).join(`\n`);
}

function saveThis(name, quantityInput, daysInput, dayprice, total){
    let id = nextIndexOf(arrayReservations);
    arrayReservations.push(new Reservation (id, name, quantityInput, daysInput, dayprice, total));
    console.log('Se agregó a tu carrito '+ quantityInput +' '+ name +' por '+ daysInput +' días. Total parcial: $'+ total);
    addMsj('Se agregó a tu carrito '+ quantityInput +' '+ name +' por '+ daysInput +' días. Total parcial: $'+ total);
}

function applyVoucher(voucherCode) {
    switch (voucherCode) {
      case "bariloche":
        totalDiscount = finalTotal - Number(finalTotal) * 0.1;
        hasVoucher = false;
        return `Se le aplicó el descuento "bariloche" del 10% sobre $${finalTotal}. Su monto a pagar es de $${totalDiscount}`;
      case "rentit2022":
        totalDiscount = finalTotal - Number(finalTotal) * 0.15;
        hasVoucher = false;
        return `Se le aplicó el descuento "rentit" del 15% sobre $${finalTotal}. Su monto a pagar es de $${totalDiscount}`;
      default:
        cuponError = true;
        return false;
    }
}

/* NUEVO */

function addMsj (msj, final = null){
    const msjbox = document.getElementById('msj');
    const msjmsj = document.getElementById('msjmsj');
    const msjfinal = document.getElementById('msjfinal');    
    
    if (msjbox.classList.contains('hidden')) {
        msjbox.classList.remove("hidden");
    }

    if (final){
        msjfinal.innerHTML += '<p>'+msj+'</p>';
    } else {
        msjmsj.innerHTML += '<p>'+msj+'</p>';
    }
}

function createLi (){
    for (const car of arrayCars){
        const selected = document.getElementById('modelInput');
        selected.innerHTML += `<option>${car.name}</option>`;
    }
}
createLi();

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

    //Agregamos la caracteristica ABS si corresponde

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
loadCards();

