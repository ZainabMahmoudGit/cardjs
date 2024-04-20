let title = document.getElementById('title');
let price = document.getElementById('price');
let lettaxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = 'create';
let globalI;

//Get Total
function gettotal() {

    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = ' rgb(157, 50, 32)';
    }

}

//create prodect


let datapro;

if (localStorage.prodect != null) {
    datapro = JSON.parse(localStorage.prodect)

} else {
    datapro = [];
}
submit.onclick = function() {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count < 1000) {
        if (mode === 'create') {
            if (newpro.count > 1) {
                for (let c = 0; c < newpro.count; c++) { datapro.push(newpro); }
            } else { datapro.push(newpro); }
        } else {
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            datapro[globalI] = newpro;
            mode = 'create';
        }
        cleardata()
    }


    localStorage.setItem('prodect', JSON.stringify(datapro))

    Showdata()

}

//clear data

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//

function Showdata() {
    let table = ''
    for (let i = 0; i < datapro.length; i++)

    {
        gettotal();
        table += ` 
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatafun(${i})" id="update">Update</button></td>
        <td><button onclick="deleteItems(${i})" id="delete">Delete</button></td>
        </tr>
     `;


    }
    document.getElementById("tbody").innerHTML = table;
    let btndeleteAll = document.getElementById("deleteAll");
    if (datapro.length > 0) {
        btndeleteAll.innerHTML = `<button onclick="deleteallfun()" >Delete All (${datapro.length})</button>`
    } else {
        btndeleteAll.innerHTML = '';
    }

}
Showdata()

//delete
function deleteItems(index) {
    datapro.splice(index, 1)
    localStorage.prodect = JSON.stringify(datapro)
    Showdata()

}

//deleteall

function deleteallfun() {
    localStorage.clear();
    datapro.splice(0);
    Showdata();
}

//updata

function updatafun(index) {

    title.value = datapro[index].title;
    price.value = datapro[index].price;
    taxes.value = datapro[index].taxes;
    ads.value = datapro[index].ads;
    discount.value = datapro[index].discount;
    category.value = datapro[index].category;
    gettotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    globalI = index;
    mode = 'update';
    scroll({
        top: 0,
        behavior: 'smooth'
    })

}

///search

let searchmode = 'Title';

function getsearchmode(id) {
    let searchinput = document.getElementById('search');

    if (id == 'searchtitle') {
        searchmode = 'Title';

    } else {
        searchmode = 'Category';

    }

    searchinput.placeholder = 'Search by ' + searchmode;


    searchinput.focus()
    searchinput.value = '';
    Showdata();
}


function searchdata(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {

        if (searchmode == 'Title') {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += ` 
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatafun(${i})" id="update">Update</button></td>
        <td><button onclick="deleteItems(${i})" id="delete">Delete</button></td>
        </tr>
     `;



            }

        } else {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += ` 
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatafun(${i})" id="update">Update</button></td>
        <td><button onclick="deleteItems(${i})" id="delete">Delete</button></td>
        </tr>
     `;



            }

        }
    }

    document.getElementById("tbody").innerHTML = table;

}