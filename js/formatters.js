export const percentFormatter = new Intl.NumberFormat('ru-Ru', 
{
    style:'percent',
    maximumFractionDigits:3
}); //4.752%

export const priceFormater = new Intl.NumberFormat('ru-Ru',
{
    style:'currency',
    currency: 'RUB',
    maximumFractionDigits:0
 
});

export const priceFormaterDecimals = new Intl.NumberFormat('ru-Ru',
{
    style:'currency',
    currency: 'RUB',
    maximumFractionDigits:2
 
});



