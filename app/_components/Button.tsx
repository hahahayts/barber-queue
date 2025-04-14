"use client";

import { addToQueue } from "@/actions/add";
import { AddQueueProps } from "@/types";
import React from "react";

const Button = ({ label, name }: AddQueueProps) => {
  return (
    <button
    onClick={()=> addToQueue(name)}
    className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 shadow-md transition duration-300 transform hover:-translate-y-1">
      {label} 
    </button>
  );
};

export default Button;
