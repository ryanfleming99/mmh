import React, { useState } from "react";
import SubHeading from "./Typography/SubHeading";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const inputStyles =
    "leading-8 py-3 mt-1 bg-gray-600 block w-full rounded-sm border-gray-400 pl-7 pr-12 focus:border-black-500 focus:ring-black-500 sm:text-sm";

  return (
    <div>
      <div>
        <div className="lg:w-2/3 mx-auto">
          <SubHeading title="BY SIGNING UP, YOU HELP US, HELP PEOPLE." />
        </div>
        <form className="lg:w-2/3 mt-10  mx-auto text-white ">
          {/* Name Input */}
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-200"
          >
            {" "}
            Name
          </label>
          <input
            type="text"
            name="price"
            id="name"
            value={name}
            className={inputStyles}
            onChange={e => setName(e.target.value)}
            placeholder="John Doe"
          />

          {/* Email Input */}
          <label
            htmlFor="price"
            className="block text-lg font-medium text-gray-200 mt-2"
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            value={email}
            className={inputStyles}
            onChange={e => setEmail(e.target.value)}
            placeholder="JohnDoe@mail.com"
          />

          {/* Message Input */}
          <label
            htmlFor="message"
            className="block text-lg font-medium text-gray-200 mt-2"
          >
            Message
          </label>

          <textarea
            type="text"
            name="message"
            id="message"
            value={message}
            className={inputStyles}
            onChange={e => setMessage(e.target.value)}
            placeholder="Message here..."
          />

          {/* Submit Button */}
          <div className="flex mt-4">
            <button
              type="submit"
              className="mx-auto lg:w-1/2 w-3/4 h-12 bg-btngray text-black font-bold text-lg py-2 px-4 rounded hover:bg-mainbg hover:border-2 hover:border-white transition ease-in-out delay-50 hover:text-white "
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
