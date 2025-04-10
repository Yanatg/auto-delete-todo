// app/page.tsx
'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { initialItems } from '../lib/data';
import { useTodoList } from '../hooks/useTodoList';


interface Item {
  type: 'Fruit' | 'Vegetable';
  name: string;
}

export default function HomePage() {
  const {
    mainList,
    fruitList,
    vegetableList,
    handleMoveToSide,
    handleMoveBack,
  } = useTodoList(initialItems);

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Auto-Delete Todo List</h1>
      {/* Outer container */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {/* Main List Column */}
        <div className="border border-gray-300 p-4 rounded-md bg-gray-50 min-w-[200px] flex-shrink-0 min-h-[500px]">
          <h2 className="text-lg font-semibold mb-3">
            Available Items ({mainList.length})
          </h2>
          {mainList.length === 0 && <p className="text-sm text-gray-500">No items available.</p>}
          {mainList.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMoveToSide(item)}
              className="block w-full mb-2 px-3 py-2 text-left cursor-pointer border border-gray-300 bg-white rounded hover:bg-gray-100 transition-colors duration-150"
            >
              {item.name} <span className="text-xs text-gray-500">({item.type})</span>
            </button>
          ))}
        </div>

        {/* Right Columns Container */}
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Fruit Column */}
          <div className="border border-blue-300 p-4 rounded-md bg-blue-50 min-w-[200px] flex flex-col">
            <h2 className="text-lg font-semibold mb-3 text-blue-800">
                Fruit ({fruitList.length})
            </h2>
             <div className="flex-grow">
                {fruitList.length === 0 && <p className="text-sm text-gray-500">-</p>}
                {fruitList.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleMoveBack(item)}
                    className="block w-full mb-2 px-3 py-2 text-left cursor-pointer border border-blue-400 bg-blue-200 rounded hover:bg-blue-300 transition-colors duration-150"
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          </div>

          {/* Vegetable Column */}
          <div className="border border-green-300 p-4 rounded-md bg-green-50 min-w-[200px] flex flex-col"> 
            <h2 className="text-lg font-semibold mb-3 text-green-800">
                Vegetable ({vegetableList.length})
            </h2>
             <div className="flex-grow">
                {vegetableList.length === 0 && <p className="text-sm text-gray-500">-</p>}
                {vegetableList.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleMoveBack(item)}
                    className="block w-full mb-2 px-3 py-2 text-left cursor-pointer border border-green-400 bg-green-200 rounded hover:bg-green-300 transition-colors duration-150"
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}