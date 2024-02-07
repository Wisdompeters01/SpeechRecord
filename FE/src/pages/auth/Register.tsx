import {
  Button,
  CustomFlowbiteTheme,
  Flowbite,
  Label,
  TextInput,
} from "flowbite-react";
import { useState } from "react";

import { FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../global/reduxState";
import { useLocation, useNavigate } from "react-router-dom";
import { Speech } from "./Speech";
import { createUser } from "../../api/userAPI";

export const Register = () => {
  const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        primary:
          "bg-red-500 hover:bg-red-600 text-white transition-all duration-300",
      },
    },
  };

  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const transcript = useSelector((state: any) => state.transcript);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {pathname.includes("1") ? (
        <Flowbite theme={{ theme: customTheme }}>
          <div className="w-[400px]">
            <div className="flex  flex-col gap-5">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  id="password1"
                  type="password"
                  required
                />
              </div>

              <Button
                onClick={() => {
                  dispatch(register({ email, password }));

                  navigate("/register/2");
                }}
                color="primary"
                className="flex gap-4 items-center"
                type="submit"
              >
                <div>Next</div>
                <FaAngleRight />
              </Button>
            </div>
          </div>
        </Flowbite>
      ) : pathname?.includes("2") ? (
        <Flowbite theme={{ theme: customTheme }}>
          <div className="md:w-[400px] w-[95%]">
            <div className="flex  flex-col gap-5">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email1"
                    value="Input your 10 emails and separate by ','"
                  />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="name@flowbite.com,abcd@test.com..."
                  required
                />
              </div>

              <div>
                <Speech />
              </div>

              <Button
                onClick={() => {
                  dispatch(register({ email, password }));

                  createUser({
                    email,
                    password,
                    emails: emails.split(","),
                    voiceKey: transcript,
                  }).then(() => {
                    navigate(`/login`);
                  });
                }}
                color="primary"
                className="flex gap-4"
              >
                Continue
              </Button>
            </div>
          </div>
        </Flowbite>
      ) : (
        ""
      )}
    </div>
  );
};
