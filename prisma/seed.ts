import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create sample user
  const user = await prisma.user.upsert({
    where: { email: "demo@mealpantry.com" },
    update: {},
    create: {
      email: "demo@mealpantry.com",
      name: "Demo User",
      image: "https://avatars.githubusercontent.com/u/1?v=4",
    },
  });

  console.log("👤 Created user:", user.name);

  // Helper function to calculate expiry dates based on ingredient type
  const getExpiryDate = (
    purchaseDate: Date,
    category: string,
    name: string,
  ): Date => {
    const expiry = new Date(purchaseDate);

    switch (category) {
      case "Protein":
        if (
          name.includes("Chicken") ||
          name.includes("Beef") ||
          name.includes("Salmon")
        ) {
          expiry.setDate(expiry.getDate() + 5); // Fresh meat: 5 days
        } else if (name === "Eggs") {
          expiry.setDate(expiry.getDate() + 21); // Eggs: 3 weeks
        }
        break;
      case "Dairy":
        if (name === "Milk") {
          expiry.setDate(expiry.getDate() + 7); // Milk: 1 week
        } else if (name === "Cheese") {
          expiry.setDate(expiry.getDate() + 14); // Cheese: 2 weeks
        } else if (name === "Butter") {
          expiry.setDate(expiry.getDate() + 30); // Butter: 1 month
        }
        break;
      case "Vegetable":
        if (name === "Spinach") {
          expiry.setDate(expiry.getDate() + 5); // Leafy greens: 5 days
        } else if (name === "Bell Pepper" || name === "Tomato") {
          expiry.setDate(expiry.getDate() + 7); // Fresh peppers/tomatoes: 1 week
        } else if (name === "Onion" || name === "Potatoes") {
          expiry.setDate(expiry.getDate() + 21); // Root vegetables: 3 weeks
        } else if (name === "Carrots") {
          expiry.setDate(expiry.getDate() + 14); // Carrots: 2 weeks
        } else if (name === "Garlic") {
          expiry.setDate(expiry.getDate() + 90); // Garlic: 3 months
        }
        break;
      case "Grain":
        if (name === "Bread") {
          expiry.setDate(expiry.getDate() + 5); // Bread: 5 days
        } else {
          expiry.setDate(expiry.getDate() + 730); // Dry grains: 2 years
        }
        break;
      case "Oil":
        expiry.setDate(expiry.getDate() + 365); // Oils: 1 year
        break;
      case "Seasoning":
      case "Herb":
        expiry.setDate(expiry.getDate() + 1095); // Spices/herbs: 3 years
        break;
      default:
        expiry.setDate(expiry.getDate() + 30); // Default: 1 month
    }

    return expiry;
  };

  // Generate realistic purchase dates (within last 2 weeks)
  const generatePurchaseDate = () => {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 14); // 0-14 days ago
    const purchaseDate = new Date(now);
    purchaseDate.setDate(purchaseDate.getDate() - daysAgo);
    return purchaseDate;
  };

  // Create sample ingredients with purchase and expiry dates and images
  const ingredientData = [
    // Proteins
    {
      name: "Chicken Breast",
      category: "Protein",
      unit: "lbs",
      imageUrl:
        "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop",
    },
    {
      name: "Ground Beef",
      category: "Protein",
      unit: "lbs",
      imageUrl:
        "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=300&fit=crop",
    },
    {
      name: "Salmon Fillet",
      category: "Protein",
      unit: "pieces",
      imageUrl:
        "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=300&fit=crop",
    },
    {
      name: "Eggs",
      category: "Protein",
      unit: "pieces",
      imageUrl:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
    },

    // Vegetables
    {
      name: "Onion",
      category: "Vegetable",
      unit: "pieces",
      imageUrl:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
    },
    {
      name: "Garlic",
      category: "Vegetable",
      unit: "cloves",
      imageUrl:
        "https://images.unsplash.com/photo-1583137635226-2e9787b73834?w=400&h=300&fit=crop",
    },
    {
      name: "Bell Pepper",
      category: "Vegetable",
      unit: "pieces",
      imageUrl:
        "https://images.unsplash.com/photo-1525607551734-4a5f3dea3794?w=400&h=300&fit=crop",
    },
    {
      name: "Tomato",
      category: "Vegetable",
      unit: "pieces",
      imageUrl:
        "https://images.unsplash.com/photo-1546470427-e0175d60cd58?w=400&h=300&fit=crop",
    },
    {
      name: "Spinach",
      category: "Vegetable",
      unit: "cups",
      imageUrl:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
    },
    {
      name: "Carrots",
      category: "Vegetable",
      unit: "pieces",
      imageUrl:
        "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
    },

    // Grains & Starches
    {
      name: "Rice",
      category: "Grain",
      unit: "cups",
      imageUrl:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    },
    {
      name: "Pasta",
      category: "Grain",
      unit: "cups",
      imageUrl:
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    },
    {
      name: "Bread",
      category: "Grain",
      unit: "slices",
      imageUrl:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    },
    {
      name: "Potatoes",
      category: "Vegetable",
      unit: "pieces",
      imageUrl:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
    },

    // Dairy
    {
      name: "Milk",
      category: "Dairy",
      unit: "cups",
      imageUrl:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
    },
    {
      name: "Cheese",
      category: "Dairy",
      unit: "cups",
      imageUrl:
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop",
    },
    {
      name: "Butter",
      category: "Dairy",
      unit: "tbsp",
      imageUrl:
        "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop",
    },

    // Pantry Staples
    {
      name: "Olive Oil",
      category: "Oil",
      unit: "tbsp",
      imageUrl:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop",
    },
    {
      name: "Salt",
      category: "Seasoning",
      unit: "tsp",
      imageUrl:
        "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=300&fit=crop",
    },
    {
      name: "Black Pepper",
      category: "Seasoning",
      unit: "tsp",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
    {
      name: "Basil",
      category: "Herb",
      unit: "tsp",
      imageUrl:
        "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=300&fit=crop",
    },
  ];

  const ingredients = await Promise.all(
    ingredientData.map(async (item) => {
      const purchaseDate = generatePurchaseDate();
      const expiryDate = getExpiryDate(purchaseDate, item.category, item.name);

      return prisma.ingredient.upsert({
        where: { name: item.name },
        update: {
          purchaseDate,
          expiryDate,
          imageUrl: item.imageUrl,
        },
        create: {
          name: item.name,
          category: item.category,
          unit: item.unit,
          imageUrl: item.imageUrl,
          purchaseDate,
          expiryDate,
        },
      });
    }),
  );

  console.log(`🥕 Created ${ingredients.length} ingredients`);

  // Create sample recipes
  const chickenStirFry = await prisma.recipe.create({
    data: {
      name: "Chicken Stir Fry",
      description:
        "A quick and healthy chicken stir fry with colorful vegetables",
      instructions: `1. Heat olive oil in a large pan over medium-high heat
2. Season chicken breast with salt and pepper, then cook until golden brown (6-8 minutes)
3. Remove chicken and set aside
4. Add onion and bell pepper to the same pan, cook for 3-4 minutes
5. Add garlic and cook for another minute
6. Return chicken to pan, toss everything together
7. Serve over rice`,
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500",
      createdById: user.id,
      ingredients: {
        create: [
          {
            quantity: 1,
            unit: "lbs",
            ingredient: { connect: { name: "Chicken Breast" } },
          },
          {
            quantity: 1,
            unit: "pieces",
            ingredient: { connect: { name: "Onion" } },
          },
          {
            quantity: 2,
            unit: "pieces",
            ingredient: { connect: { name: "Bell Pepper" } },
          },
          {
            quantity: 3,
            unit: "cloves",
            ingredient: { connect: { name: "Garlic" } },
          },
          {
            quantity: 2,
            unit: "tbsp",
            ingredient: { connect: { name: "Olive Oil" } },
          },
          {
            quantity: 2,
            unit: "cups",
            ingredient: { connect: { name: "Rice" } },
          },
          {
            quantity: 1,
            unit: "tsp",
            ingredient: { connect: { name: "Salt" } },
          },
          {
            quantity: 0.5,
            unit: "tsp",
            ingredient: { connect: { name: "Black Pepper" } },
          },
        ],
      },
    },
  });

  const spaghettiAndMeatballs = await prisma.recipe.create({
    data: {
      name: "Spaghetti and Meatballs",
      description: "Classic Italian comfort food with homemade meatballs",
      instructions: `1. Cook pasta according to package directions
2. Mix ground beef with egg, salt, and pepper, form into meatballs
3. Heat olive oil in a large pan and brown meatballs on all sides
4. Add diced tomatoes and garlic, simmer for 15 minutes
5. Serve meatballs over pasta with cheese`,
      prepTime: 20,
      cookTime: 30,
      servings: 6,
      imageUrl:
        "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=500",
      createdById: user.id,
      ingredients: {
        create: [
          {
            quantity: 1,
            unit: "lbs",
            ingredient: { connect: { name: "Ground Beef" } },
          },
          {
            quantity: 1,
            unit: "lbs",
            ingredient: { connect: { name: "Pasta" } },
          },
          {
            quantity: 1,
            unit: "pieces",
            ingredient: { connect: { name: "Eggs" } },
          },
          {
            quantity: 4,
            unit: "pieces",
            ingredient: { connect: { name: "Tomato" } },
          },
          {
            quantity: 3,
            unit: "cloves",
            ingredient: { connect: { name: "Garlic" } },
          },
          {
            quantity: 0.5,
            unit: "cups",
            ingredient: { connect: { name: "Cheese" } },
          },
          {
            quantity: 2,
            unit: "tbsp",
            ingredient: { connect: { name: "Olive Oil" } },
          },
          {
            quantity: 1,
            unit: "tsp",
            ingredient: { connect: { name: "Salt" } },
          },
          {
            quantity: 0.5,
            unit: "tsp",
            ingredient: { connect: { name: "Black Pepper" } },
          },
          {
            quantity: 1,
            unit: "tsp",
            ingredient: { connect: { name: "Basil" } },
          },
        ],
      },
    },
  });

  const bakedSalmon = await prisma.recipe.create({
    data: {
      name: "Herb-Crusted Baked Salmon",
      description:
        "Healthy and flavorful baked salmon with herbs and vegetables",
      instructions: `1. Preheat oven to 400°F (200°C)
2. Season salmon with salt, pepper, and basil
3. Place on baking sheet with carrots and potatoes
4. Drizzle with olive oil
5. Bake for 15-20 minutes until fish flakes easily
6. Serve immediately`,
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
      createdById: user.id,
      ingredients: {
        create: [
          {
            quantity: 4,
            unit: "pieces",
            ingredient: { connect: { name: "Salmon Fillet" } },
          },
          {
            quantity: 4,
            unit: "pieces",
            ingredient: { connect: { name: "Carrots" } },
          },
          {
            quantity: 3,
            unit: "pieces",
            ingredient: { connect: { name: "Potatoes" } },
          },
          {
            quantity: 2,
            unit: "tbsp",
            ingredient: { connect: { name: "Olive Oil" } },
          },
          {
            quantity: 1,
            unit: "tsp",
            ingredient: { connect: { name: "Salt" } },
          },
          {
            quantity: 0.5,
            unit: "tsp",
            ingredient: { connect: { name: "Black Pepper" } },
          },
          {
            quantity: 1,
            unit: "tsp",
            ingredient: { connect: { name: "Basil" } },
          },
        ],
      },
    },
  });

  console.log("🍽️ Created sample recipes:", [
    chickenStirFry.name,
    spaghettiAndMeatballs.name,
    bakedSalmon.name,
  ]);

  // Create sample pantry items
  const pantryItems = await Promise.all([
    prisma.pantryItem.create({
      data: {
        quantity: 2,
        unit: "lbs",
        location: "freezer",
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        ingredientId: ingredients.find((i) => i.name === "Chicken Breast")!.id,
        userId: user.id,
      },
    }),
    prisma.pantryItem.create({
      data: {
        quantity: 5,
        unit: "cups",
        location: "pantry",
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        ingredientId: ingredients.find((i) => i.name === "Rice")!.id,
        userId: user.id,
      },
    }),
    prisma.pantryItem.create({
      data: {
        quantity: 12,
        unit: "pieces",
        location: "fridge",
        expiryDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
        ingredientId: ingredients.find((i) => i.name === "Eggs")!.id,
        userId: user.id,
      },
    }),
    prisma.pantryItem.create({
      data: {
        quantity: 3,
        unit: "pieces",
        location: "pantry",
        expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        ingredientId: ingredients.find((i) => i.name === "Onion")!.id,
        userId: user.id,
      },
    }),
    prisma.pantryItem.create({
      data: {
        quantity: 1,
        unit: "cups",
        location: "fridge",
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        ingredientId: ingredients.find((i) => i.name === "Milk")!.id,
        userId: user.id,
      },
    }),
  ]);

  console.log(`🏠 Created ${pantryItems.length} pantry items`);

  // Create a sample shopping list
  const shoppingList = await prisma.shoppingList.create({
    data: {
      name: "Weekly Groceries",
      userId: user.id,
      items: {
        create: [
          {
            quantity: 1,
            unit: "lbs",
            ingredient: { connect: { name: "Ground Beef" } },
          },
          {
            quantity: 2,
            unit: "pieces",
            ingredient: { connect: { name: "Bell Pepper" } },
          },
          {
            quantity: 4,
            unit: "pieces",
            ingredient: { connect: { name: "Tomato" } },
          },
          {
            quantity: 1,
            unit: "cups",
            ingredient: { connect: { name: "Cheese" } },
          },
          {
            quantity: 2,
            unit: "cups",
            ingredient: { connect: { name: "Spinach" } },
          },
        ],
      },
    },
  });

  console.log("🛒 Created shopping list:", shoppingList.name);

  // Create some meal plans
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const mealPlans = await Promise.all([
    prisma.mealPlan.create({
      data: {
        date: today,
        mealType: "dinner",
        servings: 4,
        recipeId: chickenStirFry.id,
        userId: user.id,
      },
    }),
    prisma.mealPlan.create({
      data: {
        date: tomorrow,
        mealType: "dinner",
        servings: 6,
        recipeId: spaghettiAndMeatballs.id,
        userId: user.id,
      },
    }),
    prisma.mealPlan.create({
      data: {
        date: dayAfter,
        mealType: "dinner",
        servings: 4,
        recipeId: bakedSalmon.id,
        userId: user.id,
      },
    }),
  ]);

  console.log(`📅 Created ${mealPlans.length} meal plans`);

  console.log("✅ Database seeding completed successfully!");
  console.log(`
🎉 Sample data created:
   • 1 demo user
   • ${ingredients.length} ingredients
   • 3 recipes with ingredients
   • ${pantryItems.length} pantry items
   • 1 shopping list with 5 items
   • ${mealPlans.length} meal plans

🔗 Visit Prisma Studio at http://localhost:5556 to explore your data!
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
