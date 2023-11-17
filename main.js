

const categoryList = document.querySelector("#category-list");
const productsList = document.getElementById("products");


//açma butonu
const openButton = document.querySelector("#open-button");
//console.log(openButton)
//kapama butonu
const closeButton = document.querySelector("#close-button");
//console.log(closeButton)
//sepet modalı
const modal = document.getElementById("modal");
//console.log(modal)
const modalList = document.querySelector(".modal-list");
//console.log(modalList)
const totalPrice = document.getElementById("total-price");
//console.log(totalPrice)

function fetchCategories() {
 



  //apiye veri çekme isteği atma
  fetch("https://fakestoreapi.com/products")
 
    .then((response) => response.json())
    
    .then((data) =>
     
      data.slice(0, 5).map((categoryy) => {
     
        const { category, image } = categoryy;

      

        const categoryDiv = document.createElement("div");
        
        categoryDiv.classList.add("category");
        
        categoryDiv.innerHTML = `    <img
    src=${image}    alt=""
  />
  <span>${category}</span>`;

    
        categoryList.appendChild(categoryDiv);
      })
    )
    
    .catch((error) => console.log(error));
}

fetchCategories();

function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) =>
      data.map((product) => {
        //console.log(product);

        const { title, price, category, image, id } = product;
        //div oluştur
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
<img src=${image} alt="">
<p>${title}</p>
<p>${category}</p>
<div class="product-action">
  <p>${price}₺</p>
  <button onclick="addToBasket({id:${id},title:'${title}',price:${price},image:'${image}',amount:1})">Sepete Ekle</button>

</div>



`;
        productsList.appendChild(productDiv);
        //  console.log(productDiv)
      })
    )
    .catch((error) => console.log("api hatası", error));
}

fetchProducts();

let basket = [];
let total = 0;

//Sepete Ekleme İşlemleri

function addToBasket(product) {
 

  const idsiaynieleman = basket.find(
    (sepettekiEleman) => sepettekiEleman.id === product.id
  );
  

  if (idsiaynieleman) {
    idsiaynieleman.amount++;
  } else {
    basket.push(product);
  }

 
}


function showBasketItems() {

  basket.map((basketProduct) => {
   
    const listItem = document.createElement("div");
    
    listItem.classList.add("list-item");

    
    const {image,title,price,amount,id,}=basketProduct

    
    listItem.innerHTML = `

<img
src=${image}
alt=""
/>
<h4>${title}</h4>
<h4 class="price">${price}₺</h4>
<p>Miktar: ${amount}</p>
<button class="delete-button"  onclick='deleteItem({id:${id},price:${price},amount:${amount}})' >Sil</button>
`;


    modalList.appendChild(listItem);

    

    total += price * amount;
  });
}


openButton.addEventListener("click", () => {
  
  showBasketItems();
  
  modal.classList.add("active");
  totalPrice.innerText = total;
});


closeButton.addEventListener("click", () => {
  
  modal.classList.remove("active");
  modalList.innerHTML='';
  total=0;
});


modal.addEventListener("click", (event) => {
  
  if (event.target.classList.contains("modal-wrapper")) {
   
    modal.classList.remove("active");
  }
  
});



function deleteItem(willDeleteItem) {
  
  console.log('silmeden önce',basket)

  basket=basket.filter((eleman)=>eleman.id !==willDeleteItem.id)
  console.log('sildikten sonra',basket)

  total -= willDeleteItem.price * willDeleteItem.amount
 
  totalPrice.innerText=total
}

modalList.addEventListener('click', (tiklamaOlayiBilgileri) => {

 
  if (tiklamaOlayiBilgileri.target.classList.contains('delete-button')) {

    
    tiklamaOlayiBilgileri.target.parentElement.remove();
  }

  if (basket.length === 0) {

    modal.classList.remove('active');
  }
});