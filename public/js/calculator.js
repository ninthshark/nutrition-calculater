
var calculator = function(ingredients, quantity) {
    var totalFibre = 0 , totalSugars = 0, totalEnergyKJ = 0, totalEnergyKCal =0, totalCarbohydrate =0, totalSaturatedFat =0, totalFat=0, totalProtein=0;

    for (var i=0; i<ingredients.length; i++) {
        if ( ingredients[i].fibre === 'N') {
            ingredients[i].fibre = 0;
        } else if ( ingredients[i].fibre === 'Tr') {
            ingredients[i].fibre = 0.5
        } else {
            totalFibre += (parseFloat(ingredients[i].fibre)  * parseFloat(quantity[i]))/100;
        }

        if ( ingredients[i].sugars === 'N') {
            ingredients[i].sugars = 0;
        } else if ( ingredients[i].sugars === 'Tr') {
            ingredients[i].sugars = 0.5
        } else {
            totalSugars += (parseFloat(ingredients[i].sugars)  * parseFloat(quantity[i]))/100;
        }

        if ( ingredients[i].energy_kj === 'N') {
            ingredients[i].energy_kj = 0;
        } else if ( ingredients[i].energy_kj === 'Tr') {
            ingredients[i].energy_kj = 0.5
        } else {
            totalEnergyKJ += (parseFloat(ingredients[i].energy_kj)  * parseFloat(quantity[i]))/100;
        }

        if ( ingredients[i].energy_kcal === 'N') {
            ingredients[i].energy_kcal = 0;
        } else if ( ingredients[i].energy_kcal === 'Tr') {
            ingredients[i].energy_kcal = 0.5
        } else {
            totalEnergyKCal += (parseFloat(ingredients[i].energy_kcal)  * parseFloat(quantity[i]))/100;
        }

        if ( ingredients[i].carbohydrate === 'N') {
            ingredients[i].carbohydrate = 0;
        } else if ( ingredients[i].carbohydrate === 'Tr') {
            ingredients[i].carbohydrate = 0.5
        } else {
            totalCarbohydrate += (parseFloat(ingredients[i].carbohydrate)  * parseFloat(quantity[i]))/100;
        }

        if ( ingredients[i].saturated_fat === 'N') {
            ingredients[i].saturated_fat = 0;
        } else if ( ingredients[i].saturated_fat === 'Tr') {
            ingredients[i].saturated_fat = 0.5
        } else {
            totalSaturatedFat += (parseFloat(ingredients[i].saturated_fat)  * parseFloat(quantity[i]))/100;
        }

        if ( ingredients[i].fat === 'N') {
            ingredients[i].fat = 0;
        } else if ( ingredients[i].fat === 'Tr') {
            ingredients[i].fat = 0.5
        } else {
            totalFat += (parseFloat(ingredients[i].fat)  * parseFloat(quantity[i]))/100;
        }

        if ( ingredients[i].protein === 'N') {
            ingredients[i].protein = 0;
        } else if ( ingredients[i].protein === 'Tr') {
            ingredients[i].protein = 0.5
        } else {
            totalProtein += (parseFloat(ingredients[i].protein)  * parseFloat(quantity[i]))/100;
        }
    }
    return {energyKCal: totalEnergyKCal, energyKJ: totalEnergyKJ, protein: totalProtein, carbohydrate: totalCarbohydrate, sugars: totalSugars, fat: totalFat, saturatedFat: totalSaturatedFat, fibre: totalFibre}
}

exports.calculator = calculator;