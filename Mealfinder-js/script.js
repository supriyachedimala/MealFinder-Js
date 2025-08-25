const API_CATEGORIES = "https://www.themealdb.com/api/json/v1/1/categories.php";
const API_FILTER = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

// Make sure these elements exist in your HTML
const categoriesDiv = document.getElementById("categories"); 
const mealsDiv = document.getElementById("meals");
const menuIcon = document.querySelector(".menu-icon");
const menuList = document.getElementById("menuList");

// Toggle menu
if (menuIcon && menuList) {
  menuIcon.addEventListener("click", () => {
    menuList.style.display = menuList.style.display === "block" ? "none" : "block";
  });
}

const closeMenu = document.querySelector(".close-menu");
if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    menuList.style.display = "none";
  });
}

// Mapping categories to pages
const categoryPages = {
  beef: "beef.html",
  chicken: "chicken.html",
  dessert: "dessert.html",
  lamb: "lamb.html",
  pasta: "pasta.html",
  pork: "pork.html",
  seafood: "seafood.html",
  side: "side.html",
  vegan: "vegan.html",
  vegetarian: "vegetarian.html",
  breakfast: "breakfast.html",
  goat: "goat.html"
};

// Fetch categories
fetch(API_CATEGORIES)
  .then(res => res.json())
  .then(data => {
    if (!categoriesDiv) return; // safety check
    categoriesDiv.innerHTML = "";

    data.categories.forEach(cat => {
      const div = document.createElement("div");
      div.classList.add("card");

      // Category image + tag
      div.innerHTML = `
        <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}" width="200">
        <div class="tag">${cat.strCategory}</div>
      `;

      // Click navigation
      div.addEventListener("click", () => {
        const page = categoryPages[cat.strCategory.toLowerCase()];
        if (page) {
          window.location.href = page; // go to static page
        } else {
          fetchMealsByCategory(cat.strCategory); // dynamic fallback
        }
      });

      categoriesDiv.appendChild(div);
    });
  })
  .catch(err => console.error("Error fetching categories:", err));

// Fetch meals by category
function fetchMealsByCategory(category) {
  fetch(API_FILTER + category)
    .then(res => res.json())
    .then(data => {
      if (!mealsDiv) return; // safety check
      mealsDiv.innerHTML = "";
      data.meals.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">
          <h4>${meal.strMeal}</h4>
        `;
        mealsDiv.appendChild(div);
      });
    })
    .catch(err => console.error("Error fetching meals:", err));
}
