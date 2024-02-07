import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { getOne } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="flex w-[95%] md:w-[400px] flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            value={email}
            placeholder="name@flowbite.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        <Button
          onClick={() => {
            getOne({ email }).then((res) => {
              if (res?._id) {
                navigate(`/${res?._id}`);
              }
            });
          }}
        >
          Login
        </Button>

        <center className="text-[17px]">
          <NavLink to="/register/1">Register Here</NavLink>
        </center>
      </form>
    </div>
  );
};
