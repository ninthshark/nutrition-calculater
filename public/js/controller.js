
var idArray = ['hello', 'world'];

var foodItem = document.querySelector('.list-group');
foodItem.addEventListener('click', (e) => {
    var item = e.target;
    //console.log(item);
    var id = item.getAttribute('data-id');
    console.log(id);
    idArray.push(id);
});

//module.exports = idArray;
//module.exports.getInputText = getInputText;