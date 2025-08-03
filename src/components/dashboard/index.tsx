"use client";
import { todayMeals } from "../../helper/data";
import Image from "next/image";
import { Header } from "@/components/header";
export default function Dashboard() {
  function getMealType(mealType: string) {
    if (mealType === "Breakfast") {
      return "bg-yellow-500 text-white";
    } else if (mealType === "Lunch") {
      return "bg-green-500 text-white";
    } else if (mealType === "Dinner") {
      return "bg-red-500 text-white";
    }
  }

  return (
    <>
    <Header/>
      <div className="mt-10 ml-30 flex flex-col items-start justify-start">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="bold text-2xl"></h1>
          </div>
        </div>
        <h2 className="bold mt-10 text-2xl">Your Planned Meals Today 🍳</h2>
        <div className="mt-6 grid grid-cols-3 place-items-center gap-9">
          {todayMeals.map((meals) => (
            <div
              key={meals.id}
              className="w-65 rounded-lg border-2 border-black bg-white p-4 shadow-md"
            >
              <Image
                src={meals.img}
                alt={meals.name}
                width={300}
                height={300}
                className="h-35 w-56 rounded-lg object-cover"
              />
              <h3 className="bold text-lg text-black">{meals.name}</h3>
              <p className="mt-3 text-gray-500">
                <span
                  className={`rounded-md bg-gray-200 px-2 py-1 text-black ${getMealType(meals.mealType)}`}
                >
                  {meals.mealType}{" "}
                </span>{" "}
              </p>
              <p className="mt-3 text-gray-500">{meals.reviews}</p>
            </div>
          ))}
        </div>
        {/* 
        <div className="grid grid-cols-3 gap-9 place-items-center mt-6 ">
        </div>
        <h2 className="text-2xl bold mt-10">🥐 Trending Meals</h2>
        <div className="grid grid-cols-3 gap-9 place-items-center mt-6 ">
   
        </div>

        <h2 className="text-2xl bold mt-10">
          📈 Trending Breakfast Recipes
        </h2>
        <div className="grid grid-cols-3 gap-9 place-items-center mt-6 ">

        </div> */}
        <div className="mt-30"></div>
      </div>
    </>
  );
}
