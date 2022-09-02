import { priceFormater, priceFormaterDecimals } from './formatters.js';
const maxPrice = 100000000;

const inputCost=document.querySelector('#input-cost');
const inputDownPayment=document.querySelector('#input-downpayment');
const inputTerm=document.querySelector('#input-term');

const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const tottalMonthPayment = document.querySelector('#total-month-payment')


// Опции форматирования
const cleavePriceSetting =  {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter:' ',
}

// Запускаем форматирование 
const cleaveCost = new Cleave(inputCost, cleavePriceSetting)
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSetting);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);


calcMortgage();
   
// Отображение и рассчет суммы кредита
form.addEventListener('input', ()=> calcMortgage())

function calcMortgage(){

    let cost = +cleaveCost.getRawValue();
    if (cost > maxPrice) {
        cost = maxPrice;
    }

    //  общая сумма кредита
    const totalAmount =  +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
    totalCost.innerText =  priceFormater.format(totalAmount);

    // ставка по кредиту 
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const monthsRate = (creditRate * 100) / 12;

    // срок ипотеки в годах
    const years = +cleaveTerm.getRawValue()
    
    // срок в месяцах
    const months = years * 12

    // рассчет ежемесячного платежа
    const monthPayment = (totalAmount * monthsRate) / (1 - (1 + monthsRate) * (1 - months));
    tottalMonthPayment.innerText = priceFormaterDecimals.format(monthPayment);
  

}

// Slider Cost
const sliderCost = document.querySelector('#slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    tooltips:true,
    step:100000,
    range: {
        'min': 375000,
        '50%':[10000000, 1000000],
        'max': 100000000
    },

format: wNumb({
    decimals:0,
    thousand: ' ',
    suffix:'',

}),

});

sliderCost.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));
    inputCost.value = sliderValue;
    cleaveCost.setRawValue(sliderValue);
    calcMortgage()
})

// Slider Downpayment
const sliderDownpayment = document.querySelector('#slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 6000000,
    connect: 'lower',
     tooltips:true,
    step:100000,
    range: {
        'min': 0,
        'max': 10000000
    },

format: wNumb({
    decimals:0,
    thousand: ' ',
    suffix:'',

}),

});

sliderDownpayment.noUiSlider.on('update', function(){
    const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));
    cleaveDownPayment.setRawValue(sliderValue);
    calcMortgage()
})

// Slider Years
const sliderTerm = document.querySelector('#slider-term');

noUiSlider.create(sliderTerm, {
    start: 12,
    connect: 'lower',
    tooltips:true,
    step:1,
    range: {
        'min': 1,
        'max': 30
    },

});

sliderTerm.noUiSlider.on('upslidedate', function(){
    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));
    cleaveTerm.setRawValue(sliderValue);
    calcMortgage()
})

// Форматирование Инпута
inputCost.addEventListener('input', function(){

    const value = +cleaveCost.getRawValue();
// Обновляем range slider
    sliderCost.noUiSlider.set(value)
// Проверка на цену
    if(value > maxPrice){inputCost.closest('.param__details').classList.add('param__details--error')} 
    if(value <= maxPrice){inputCost.closest('.param__details').classList.remove('param__details--error')} 

    const percentMin = value * 0.15
    const percentMax = value * 0.90

    sliderDownpayment.noUiSlider.updateOptions({
        range: {
            'min': percentMin,
            'max': percentMax
        },
    })
    
})

inputCost.addEventListener('change', function(){

    const value = +cleaveCost.getRawValue();

    if(value > maxPrice){
     inputCost.closest('.param__details').classList.remove('param__details--error')
     cleaveCost.setRawValue(maxPrice)
    } 

})