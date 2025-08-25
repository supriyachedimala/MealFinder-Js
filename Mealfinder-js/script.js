// API Links
const API_CATEGORIES = "https://www.themealdb.com/api/json/v1/1/categories.php";
const API_SEARCH = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const API_FILTER = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

const categoriesDiv = document.getElementById("categories");
const mealsDiv = document.getElementById("meals");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");




  const menuIcon = document.querySelector(".menu-icon");
  const menuList = document.getElementById("menuList");

  menuIcon.addEventListener("click", () => {
    if (menuList.style.display === "block") {
      menuList.style.display = "none";
    } else {
      menuList.style.display = "block";
    }
  });


fetch(API_CATEGORIES)
  .then(res => res.json())
  .then(data => {
    categoriesDiv.innerHTML = "";
    data.categories.forEach(cat => {
      let div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
        <div class="tag">${cat.strCategory}</div> 
      `;
      div.addEventListener("click", () => fetchMealsByCategory(cat.strCategory));
      categoriesDiv.appendChild(div);
    });
  });




// Fetch Meals by Category
function fetchMealsByCategory(category) {
  fetch(API_FILTER + category)
    .then(res => res.json())
    .then(data => {
      mealsDiv.innerHTML = "";
      data.meals.forEach(meal => {
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h4>${meal.strMeal}</h4>
        `;
        mealsDiv.appendChild(div);
      });
    });
}

// Search Meal by Name
searchBtn.addEventListener("click", () => {
  let query = searchInput.value.trim();
  if (query) {
    fetch(API_SEARCH + query)
      .then(res => res.json())
      .then(data => {
        mealsDiv.innerHTML = "";
        if (data.meals) {
          data.meals.forEach(meal => {
            let div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h4>${meal.strMeal}</h4>
            `;
            mealsDiv.appendChild(div);
          });
        } else {
          mealsDiv.innerHTML = "<p>No meals found!</p>";
        }
      });
  }
});

  document.getElementById("searchBtn").addEventListener("click", function() {
    let query = document.getElementById("searchInput").value.trim();
    if(query === "") {
      alert("Please enter a recipe name");
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(response => response.json())
      .then(data => {
        let resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        if(data.meals) {
          data.meals.forEach(meal => {
            resultsDiv.innerHTML += `
              <div style="border:1px solid #ccc; padding:10px; margin:10px;">
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" width="200">
                <p><b>Category:</b> ${meal.strCategory}</p>
                <p><b>Area:</b> ${meal.strArea}</p>
                <p><b>Instructions:</b> ${meal.strInstructions.substring(0,200)}...</p>
                <a href="${meal.strSource}" target="_blank">Read More</a>
              </div>
            `;
          });
        } else {
          resultsDiv.innerHTML = "<p>No results found. Try another recipe!</p>";
        }
      })
      .catch(error => console.error("Error:", error));
  });


  // load categories
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => {
      const categoriesDiv = document.getElementById("categories");
      categoriesDiv.innerHTML = "";

      data.categories.forEach(cat => {
        const catCard = document.createElement("div");
        catCard.classList.add("category-card");

        catCard.innerHTML = `
          <a href="meals.html?category=${cat.strCategory}" style="text-decoration:none; color:inherit;">
            <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
            <h3>${cat.strCategory}</h3>
          </a>
        `;

        categoriesDiv.appendChild(catCard);
      });
    })
    .catch(err => console.error("Error fetching categories:", err));

