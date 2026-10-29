const skinForm = document.getElementById("skinForm");
const result = document.getElementById("result");
const year = document.getElementById("year");

// Display the current year in the footer.
year.textContent = new Date().getFullYear();

const skinAdvice = {
  oily: "Consider a gentle cleanser and a lightweight, non-comedogenic moisturizer.",
  dry: "Consider a gentle cleanser and a richer moisturizer to support hydration.",
  combination: "Try a gentle cleanser and a moisturizer suited to different areas of your face.",
  normal: "Maintain a gentle routine with cleanser, moisturizer, and sunscreen.",
  sensitive: "Choose fragrance-free, gentle products and introduce new products slowly."
};

const concernAdvice = {
  acne: "Avoid harsh scrubbing. Consider non-comedogenic products and seek professional advice for persistent acne.",
  dryness: "Use a gentle cleanser and moisturizer. Avoid very hot water.",
  dullness: "Use daily sunscreen and maintain a consistent, gentle routine.",
  sensitivity: "Avoid products that irritate your skin. Patch-test new products.",
  maintenance: "Focus on gentle cleansing, moisturizing, and daily sun protection."
};

const budgetAdvice = {
  low: "Budget-friendly: Start with a few basic products that meet your needs.",
  medium: "Mid-range: Compare ingredient lists and choose suitable products.",
  high: "Flexible budget: Prioritize suitability and ingredients rather than price alone."
};

skinForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const skinType = document.getElementById("skinType").value;
  const concern = document.getElementById("concern").value;
  const budget = document.getElementById("budget").value;

  if (!skinType || !concern || !budget) {
    result.hidden = false;
    result.textContent = "Please complete all fields.";
    return;
  }

  result.replaceChildren();

  const heading = document.createElement("h3");
  heading.textContent = "Your Suggested Skincare Guide ✨";
  result.appendChild(heading);

  const adviceList = [
    ["Skin type", skinAdvice[skinType]],
    ["Main concern", concernAdvice[concern]],
    ["Budget", budgetAdvice[budget]]
  ];

  adviceList.forEach(function (item) {
    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = item[0] + ": ";
    paragraph.appendChild(strong);
    paragraph.appendChild(document.createTextNode(item[1]));
    result.appendChild(paragraph);
  });

  const routineHeading = document.createElement("h3");
  routineHeading.textContent = "Simple Daily Routine";
  result.appendChild(routineHeading);

  const routineList = document.createElement("ul");
  [
    "Morning: Gentle cleanser, moisturizer, and broad-spectrum SPF 30+ sunscreen.",
    "Evening: Gentle cleanser and moisturizer.",
    "Introduce new products one at a time and stop using anything that causes irritation."
  ].forEach(function (step) {
    const listItem = document.createElement("li");
    listItem.textContent = step;
    routineList.appendChild(listItem);
  });

  result.appendChild(routineList);
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
/* FEATURE 1: PRODUCT SUGGESTION */

const suggestButton = document.getElementById("suggestButton");
const suggestionResults = document.getElementById("suggestionResults");

if (suggestButton && suggestionResults) {
  suggestButton.addEventListener("click", function () {
    const selectedSkinType =
      document.getElementById("suggestSkinType").value;

    const selectedConcern =
      document.getElementById("suggestConcern").value;

    const products = [
      {
        name: "Gentle Cleanser",
        category: "Cleanser",
        skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
        concerns: ["acne", "dryness", "dullness", "sensitivity", "maintenance"],
        description: "A gentle cleanser for everyday use."
      },
      {
        name: "Lightweight Moisturizer",
        category: "Moisturizer",
        skinTypes: ["oily", "combination", "normal"],
        concerns: ["acne", "dullness", "maintenance"],
        description: "Helps keep skin hydrated without a heavy feel."
      },
      {
        name: "Hydrating Moisturizer",
        category: "Moisturizer",
        skinTypes: ["dry", "sensitive", "normal"],
        concerns: ["dryness", "sensitivity", "maintenance"],
        description: "Helps support skin hydration."
      },
      {
        name: "Broad-Spectrum Sunscreen",
        category: "Sunscreen",
        skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
        concerns: ["acne", "dryness", "dullness", "sensitivity", "maintenance"],
        description: "Choose a suitable broad-spectrum SPF 30+ sunscreen."
      }
    ];

    const matchedProducts = products.filter(function (product) {
      const skinMatches =
        selectedSkinType === "all" ||
        product.skinTypes.includes(selectedSkinType);

      const concernMatches =
        selectedConcern === "all" ||
        product.concerns.includes(selectedConcern);

      return skinMatches && concernMatches;
    });

    suggestionResults.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "Your Product Suggestions ✨";
    suggestionResults.appendChild(heading);

    if (matchedProducts.length === 0) {
      suggestionResults.textContent =
        "No matching products found. Try different options.";
      return;
    }

    matchedProducts.forEach(function (product) {
      const card = document.createElement("div");
      card.className = "suggested-product";

      const name = document.createElement("h3");
      name.textContent = product.name;

      const category = document.createElement("p");
      category.textContent = "Category: " + product.category;

      const description = document.createElement("p");
      description.textContent = product.description;

      card.appendChild(name);
      card.appendChild(category);
      card.appendChild(description);

      suggestionResults.appendChild(card);
    });
  });
}