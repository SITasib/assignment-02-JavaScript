var count = 0;

window.onload = function () {
  loadDefault();
};

function loadDefault() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
    .then(res => res.json())
    .then(data => {
      displayDrinks(data.drinks.slice(0, 8));
    });
}

function searchDrink() {
  var input = document.getElementById("searchInput").value;

  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + input)
    .then(res => res.json())
    .then(data => {
      var container = document.getElementById("drinkContainer");
      container.innerHTML = "";

      if (data.drinks == null) {
        container.innerHTML = "<h3>Not Found</h3>";
      } else {
        displayDrinks(data.drinks);
      }
    });
}

function displayDrinks(drinks) {
  var container = document.getElementById("drinkContainer");
  container.innerHTML = "";

  for (var i = 0; i < drinks.length; i++) {
    var drink = drinks[i];

    var card = `
      <div class="card">
        <h4>${drink.strDrink}</h4>
        <p>${drink.strCategory}</p>
        <p>${drink.strInstructions.slice(0, 15)}...</p>
        <button onclick="addToGroup('${drink.strDrink}')">Add to Group</button>
        <button onclick="showDetails('${drink.idDrink}')">Details</button>
      </div>
    `;

    container.innerHTML += card;
  }
}

function addToGroup(name) {
  if (count >= 7) {
    alert("Cannot add more than 7 drinks");
    return;
  }

  var list = document.getElementById("groupList");

  var item = document.createElement("p");
  item.innerText = name;

  list.appendChild(item);

  count++;
  document.getElementById("count").innerText = count;
}

function showDetails(id) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
    .then(res => res.json())
    .then(data => {
      var drink = data.drinks[0];

      var modal = document.getElementById("modalBody");

      modal.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <p><b>Category:</b> ${drink.strCategory}</p>
        <p><b>Alcoholic:</b> ${drink.strAlcoholic}</p>
        <p><b>Glass:</b> ${drink.strGlass}</p>
        <p><b>Instructions:</b> ${drink.strInstructions}</p>
      `;

      document.getElementById("modal").style.display = "block";
    });
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}