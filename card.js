console.log('check out');

let globalArr = [];
const cardDetails = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cardDetails);

const container2 = document.querySelector('.container-2'); // Corrected selector

// Fetch each product and add to globalArr
cardDetails.forEach((itemId) => {
  fetch(`https://dummyjson.com/products/${itemId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.quantity = 1; // Add quantity property
      globalArr.push(res); // Add product to global array
      renderItems(); // Re-render items
    })
    .catch((err) => {
      console.log('Error fetching product:', err);
    });
});

// Render all items from globalArr
function renderItems() {
  container2.innerHTML = ''; // Clear container before rendering
  globalArr.forEach((item, index) => {
    const imageUrl = item.images[0];
    container2.innerHTML += `
      <div class="card-div mb-3 h-100" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${imageUrl}" class="img-fluid rounded-start card-img-top" alt="${item.title}">
            </div>
            <div class="col-md-8 d-flex flex-column">
            <div class="card-body flex-grow-1">
            <button class="btn btn-danger mt-3" onclick="deleteItem(${index})">X</button>
            <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.description}</p>
              <p class="card-text"><small class="text-muted"><strong>Price:</strong>$${(item.price * item.quantity).toFixed(2)}</small></p>
            </div>
            <div class="d-flex gap-4 mx-3 ">
              <button class="btn btn-primary" onclick="add(${index})">+</button>
              <button class="btn btn-success" onclick="minus(${index})">-</button>
              </div>
          </div>
        </div>
      </div>
    `;
  });
}

function add(index) {
    console.log(index);
    globalArr[index].quantity++;
    updateLocalStorage();
    renderItems();
    
}

function minus(index) {
    console.log(index);
    if(globalArr[index].quantity > 1){
    globalArr[index].quantity--;
    updateLocalStorage();
    renderItems();
    }else (
        alert('Quantity wil not be less than 1')
    )
}

function updateLocalStorage() {
    let updateCardItems = globalArr.map((item) => item.id);
    localStorage.setItem('cart', JSON.stringify(updateCardItems))
}



function deleteItem(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-danger mx-2"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            globalArr.splice(index, 1);
            updateLocalStorage();
            renderItems();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your product is safe :)",
                icon: "error"
            });
        }
    });

}
