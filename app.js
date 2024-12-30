const productsArr = [];

const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const container = document.querySelector(".container");
const icon = document.querySelector('.icon-count');
let iconCount = 0;

fetch('https://dummyjson.com/products')
  .then(res =>
    res.json())
  .then((res) => {
    console.log(res);

    res.products.map((item, index) => {

      let imageUrl = item.images[0]
      container.innerHTML += `<div class="card-div mb-3 zoom-effect h-100" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${imageUrl}" class="img-fluid rounded-start card-img-top" alt="${item.title}">
    </div>
    <div class="col-md-8 d-flex flex-column">
      <div class="card-body flex-grow-1">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description}</p>
        <p class="card-text"><small class="text-muted">$${item.price}</small></p>
      </div>
      <div class="mt-auto">
          <button class="btn btn-primary" onclick="seeMore(${item.id})">See More</button>
          <button class="btn btn-success" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
    </div>
  </div>
</div>

`
    })
  })
.catch(err =>{
  console.log(err);
  
})




function seeMore(id) {
  let data = JSON.stringify(id);
  localStorage.setItem('cardDetails', data);
  window.location = './seeMore.html'
}

function addToCart(id) {
  console.log("Adding Product ID to Cart:", id);

  if (productsArr.includes(id)) {
    Swal.fire({
      text: "Already in the cart!",
      icon: "success",
    });
    return;
  }

  iconCount++;
  productsArr.push(id);
  localStorage.setItem('iconCount', iconCount);

  console.log("Updated Products Array:", productsArr);

  // Update cart icon
  icon.innerHTML = `
    <div class="icon-count me-3">
      <a href="card.html">
        <i class="fa-solid fa-cart-shopping icon-size"></i> <span>${iconCount}</span>
      </a>
    </div>
  `;

  Swal.fire({
    text: "Item added to cart!",
    icon: "success",
  });
}

function checkOut() {
  console.log("Storing cart in localStorage...");
  localStorage.setItem('cart', JSON.stringify(productsArr));
  window.location = './card.html';
}
