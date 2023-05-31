document.addEventListener("DOMContentLoaded", () => {
  var searchInput = document.querySelector("#search");
  let games; // Declare 'games' variable without assignment

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    games.forEach((game) => {
      const isVisible =
        game.title.textContent.toLowerCase().includes(value) ||
        game.price.textContent.toLowerCase().includes(value);
      game.box.classList.toggle("hide", !isVisible);
    });
  });

  games = Array.from(document.querySelectorAll(".product-box")).map((box) => {
    const title = box.querySelector(".product-title");
    const price = box.querySelector(".price");
    return { title, price, box };
  });
});
let isSearching = false;

document.addEventListener("DOMContentLoaded", () => {
  let cartIcon = document.querySelector("#cart-icon");
  let cart = document.querySelector(".cart");
  let closeCart = document.querySelector("#close-cart");
  let dark = document.querySelector("#dark");
  let light = document.querySelector("#light");
  let toggleSearch = document.querySelector("#search-icon");
  let gameDesc = document.querySelectorAll(".product-description");
  let gameBox = document.querySelectorAll(".product-box");

  cartIcon.onclick = () => {
    cart.classList.add("active");
  };

  closeCart.onclick = () => {
    cart.classList.remove("active");
  };

  document.body.addEventListener("click", (event) => {
    if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
      cart.classList.remove("active");
    }
  });

  dark.onclick = () => {
    light.classList.remove("remove");
    dark.classList.remove("active");
    document.querySelector("body").classList.remove("dark");
  };

  light.onclick = () => {
    dark.classList.add("active");
    light.classList.add("remove");
    document.querySelector("body").classList.add("dark");
  };

  toggleSearch.onclick = () => {
    if (!isSearching) {
      document.querySelector("#search").classList.add("active");
      document.getElementById("search").focus();
      isSearching = true;
    } else {
      document.querySelector("#search").classList.remove("active");
      isSearching = false;
    }
  };

  gameBox.forEach((game, index) => {
    game.onclick = () => {
      gameDesc[index].classList.add("active");
    };
  });

  gameDesc.forEach((desc) => {
    let closeButton = desc.querySelector(".close-desc");
    closeButton.onclick = () => {
      closeGameDesc();
    };
  });

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      closeGameDesc();
    }
  };

  document.body.addEventListener("click", (event) => {
    for (var i = 0; i < gameDesc.length; i++) {
      if (
        !gameDesc[i].contains(event.target) &&
        !gameBox[i].contains(event.target)
      ) {
        gameDesc[i].classList.remove("active");
      }
    }
  });

  function closeGameDesc() {
    gameDesc.forEach((desc) => {
      desc.classList.remove("active");
    });
  }
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  alert("Your Order is Placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();

  function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemsNames.length; i++) {
      var cartProductName = cartItemsNames[i].innerText;
      if (cartProductName === title) {
        alert("You have already added this item to the cart.");
        return;
      }
    }

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img" />
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity" />
      </div>
      <!-- Remove Cart -->
      <i class="bx bxs-trash-alt cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);
    cartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);
  }
}
//Update Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
