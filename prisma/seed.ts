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

  // Create sample ingredients
  const ingredients = await Promise.all([
    // Proteins
    prisma.ingredient.upsert({
      where: { name: "Chicken Breast" },
      update: {},
      create: { name: "Chicken Breast", category: "Protein", unit: "lbs" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Ground Beef" },
      update: {},
      create: { name: "Ground Beef", category: "Protein", unit: "lbs" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Salmon Fillet" },
      update: {},
      create: { name: "Salmon Fillet", category: "Protein", unit: "pieces" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Eggs" },
      update: {},
      create: { name: "Eggs", category: "Protein", unit: "pieces" },
    }),

    // Vegetables
    prisma.ingredient.upsert({
      where: { name: "Onion" },
      update: {},
      create: { name: "Onion", category: "Vegetable", unit: "pieces" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Garlic" },
      update: {},
      create: { name: "Garlic", category: "Vegetable", unit: "cloves" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Bell Pepper" },
      update: {},
      create: { name: "Bell Pepper", category: "Vegetable", unit: "pieces" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Tomato" },
      update: {},
      create: { name: "Tomato", category: "Vegetable", unit: "pieces" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Spinach" },
      update: {},
      create: { name: "Spinach", category: "Vegetable", unit: "cups" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Carrots" },
      update: {},
      create: { name: "Carrots", category: "Vegetable", unit: "pieces" },
    }),

    // Grains & Starches
    prisma.ingredient.upsert({
      where: { name: "Rice" },
      update: {},
      create: { name: "Rice", category: "Grain", unit: "cups" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Pasta" },
      update: {},
      create: { name: "Pasta", category: "Grain", unit: "cups" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Bread" },
      update: {},
      create: { name: "Bread", category: "Grain", unit: "slices" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Potatoes" },
      update: {},
      create: { name: "Potatoes", category: "Vegetable", unit: "pieces" },
    }),

    // Dairy
    prisma.ingredient.upsert({
      where: { name: "Milk" },
      update: {},
      create: { name: "Milk", category: "Dairy", unit: "cups" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Cheese" },
      update: {},
      create: { name: "Cheese", category: "Dairy", unit: "cups" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Butter" },
      update: {},
      create: { name: "Butter", category: "Dairy", unit: "tbsp" },
    }),

    // Pantry Staples
    prisma.ingredient.upsert({
      where: { name: "Olive Oil" },
      update: {},
      create: { name: "Olive Oil", category: "Oil", unit: "tbsp" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Salt" },
      update: {},
      create: { name: "Salt", category: "Seasoning", unit: "tsp" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Black Pepper" },
      update: {},
      create: { name: "Black Pepper", category: "Seasoning", unit: "tsp" },
    }),
    prisma.ingredient.upsert({
      where: { name: "Basil" },
      update: {},
      create: { name: "Basil", category: "Herb", unit: "tsp" },
    }),
  ]);

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
