import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
  
  const [error, setError] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:8000/customer/register', {
      method: 'POST',
      body: JSON.stringify({firstName, lastName, email,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('Registration successful! You can login now.');
      navigate('/signin');
    } else {
      setError('Registration failed! Try againz');
    }
  }

  return (
    <>
      <div className="min-h-full h-screen flex mt-16 items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div class="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-white sm:px-6 md:px-8 lg:px-10">
            <div class="self-center mb-2 text-xl font-semibold text-black sm:text-2xl dark:text-black">
              Create a new account
            </div>
            <span class="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
              Already have an account ?
              <Link
                to="/signin"
                class="text-sm text-blue-500 underline hover:text-blue-700"
              >
                Sign in
              </Link>
            </span>
            <div class="p-6 mt-8">
              <form action="#">
                
                <div class="flex gap-4 mb-2">
                  <div class=" relative ">
                    <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      id="create-account-first-name"
                      class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="First name"
                      placeholder="First name"
                    />
                  </div>
                  <div class=" relative ">
                    <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      id="create-account-last-name"
                      class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="Last name"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div class="flex flex-col mb-2">
                  <div class=" relative ">
                    <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      id="create-account-email"
                      class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div class="flex flex-col mb-2">
                  <div class=" relative ">
                    <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="create-account-pseudo"
                      class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="pseudo"
                      placeholder="Password"
                    />
                  </div>
                </div>
                {error && <div>{error}</div>}
                <div class="flex w-full my-4">
                  <button
                  onClick={register}
                    type="submit"
                    class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Register
                  </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
