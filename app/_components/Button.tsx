"use client";

import { addToQueue } from "@/actions/add";
import { AddQueueProps } from "@/types";
import React from "react";
import { redirectToSignIn } from "@/actions/auth";
import { removeQueue } from "@/actions/remove";

export const AddButton = ({ id, label, name }: AddQueueProps) => {
  const handleClick = async () => {
    if (!name) {
      alert("Please log in first");
      return redirectToSignIn();
    }
    const res = await addToQueue(id, name);
    alert(res.message);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 shadow-md transition duration-300 transform hover:-translate-y-1"
      >
        {label}
      </button>
    </>
  );
};

export const FinishButton = ({ id }: { id: string }) => {
  const handleClick = async () => {
    const q = await removeQueue(id);

    if (q) alert(q.message);
  };
  return (
    <button
      onClick={handleClick}
      className="py-2 px-5 rounded-xl border border-green-500/60 font-semibold text-sm transform transition-all hover:bg-green-500/60 hover:text-white"
    >
      Finish
    </button>
  );
};
