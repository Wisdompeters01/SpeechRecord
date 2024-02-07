import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { sendMails } from "../api/userAPI";
import { Speech } from "./auth/Speech";
import { useSelector } from "react-redux";

export const HomeScreen = () => {
  const { id } = useParams();

  const transcript = useSelector((state: any) => state?.transcript);

  return (
    <>
      <div className="w-full justify-center flex items-center pt-20 h-[70px] ">
        <center className="text-[40px] font-bold">Record to send mail</center>
      </div>
      <div className="flex w-full justify-center pt-32">
        <Speech id={id!} />
      </div>
    </>
  );
};
