import { Header } from "@/components/header";
import React from "react";
import { api } from "@/utils/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Pantry = () => {
  const { data: ingredients } = api.ingredients.getIngredients.useQuery();
  const uniqueCategories = [
    ...new Set(ingredients?.map((item) => item.category)),
  ];
  return (
    <div>
      <Header />
      <h1 className="text-4xl font-bold ml-10 mt-10">Your Pantry </h1>
      <h3 className="text-md text-gray-500 ml-10 mt-2">Manage your pantry and create meals based on your available items</h3>
      <div className="flex flex-row items-center justify-center gap-5 ml-10 mt-10">
        
    <div className=" rounded-md p-2 bg-white text-black flex flex-col items-start border-2 border-blue-500 w-1/3 shadow-md hover:bg-green-500 hover:text-black">
        <h2 className="text-md font-bold">Add Item</h2> 
        <span className="text-sm text-gray-500">Add an item to your pantry</span>
        </div>
        <div className="border-2 rounded-md p-2 bg-white text-black flex flex-col items-start w-1/3 shadow-md border-blue-500 hover:bg-green-500 hover:text-black">
        <h2 className="text-md font-bold">Create Meal</h2>
        <span className="text-sm text-gray-500">Create a meal based on available items in your pantry</span>
        </div>

      </div>
      {/* Map Unique Categories */}
      {uniqueCategories.map((category) => (
        <div key={category} className="mt-10 ml-10 flex items-start flex-col">
          <h2 className="text-2xl font-bold">{category}</h2>
          <div className="flex flex-row items-start gap-5">
            {ingredients
              ?.filter((item) => item.category === category)
              .map((item) => (
                <div key={item.id} className="flex flex-col items-start border-2 border-black rounded-md p-2 mt-4 w-65  bg-white shadow-md">
                    <Image src={item.imageUrl || ""} alt={item.name} width={100} height={100} className="h-35 w-56 rounded-lg object-cover items-center ml-2" />
                  <h2 className="text-md font-bold mt-2">{item.name}</h2>
                  <div className="flex flex-col items-start mt-2">
                  <h2 className="text-md">Purchase Date: {item.purchaseDate?.toLocaleDateString()}</h2>
                    <h2 className="text-md text-red-500 mt-2"> Estimated Expiry Date: {item.expiryDate?.toLocaleDateString()}</h2>
                  </div>
                  <Button className="mt-2 border-2 border-black rounded-md p-2 bg-white text-black" variant="outline">Add to Grocery List</Button>
                </div>
              ))}
          </div>
        </div>
      ))}
      <div className="mt-20"/>
    </div>

  );
};

export default Pantry;
