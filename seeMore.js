let cardDetail = JSON.parse(localStorage.getItem('cardDetails'));
let container1 = document.querySelector('.container-1');


fetch(`https://dummyjson.com/products/${cardDetail}`)
.then(res => res.json())
.then((items) =>{
    console.log(items);
    
    let imageUrl = items.images[0]
    container1.innerHTML += `
    <div class="card shadow-lg rounded-3">
      <div class="row g-0">
        <!-- Product Image -->
        <div class="col-md-4">
          <img src="${imageUrl}" class="img-fluid rounded-start p-3" alt="${items.title}">
        </div>
        <!-- Product Details -->
        <div class="col-md-8 d-flex flex-column">
          <div class="card-body">
            <h3 class="card-title fw-bold">${items.title}</h3>
            <p class="card-text text-muted fw-bold">Category: ${items.category}</p>
            <p class="card-text text-muted">${items.description}</p>
            <p class="card-text">
              <span class="text-muted">$${items.price}</span>
            </p>
             <p class="card-text">
              <span class="text-muted">${items.returnPolicy}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
`
})
