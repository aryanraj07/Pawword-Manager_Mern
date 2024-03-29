import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [paswdArray, setPaswdArray] = useState([]);
  const ref = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPaswdArray(JSON.parse(passwords));
    }
  }, []);
  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.innerHTML == "visibility") {
      ref.current.innerHTML = "visibility_off";
      passwordRef.current.type = "password";
    } else {
      ref.current.innerHTML = "visibility";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPaswdArray([...paswdArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...paswdArray, { ...form, id: uuidv4() }])
      );
      setForm({ site: "", username: "", password: "" });
      toast("Saved Password");
    } else {
      toast("Password not Saved");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: "Bounce",
    });
  };
  const deletePassword = (id) => {
    let c = confirm("Do you really want to delte this password");
    if (c) {
      setPaswdArray(paswdArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        paswdArray.filter((item) => item.id !== id)
      );
    }
    toast(" Password Deleted");
  };
  const editPassword = (id) => {
    setForm(paswdArray.filter((i) => i.id === id)[0]);
    setPaswdArray(paswdArray.filter((item) => item.id !== id));
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="container   mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-lg text-center text-green-900">
          Your own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website Url"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id=""
          />
          <div className="flex justify-between gap-8 w-full">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id=""
            />

            <div className="relative w-40">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="absolute  rounded-full border border-green-500 w-full p-6 py-1"
                type="password"
                name="password"
                id=""
              />
              <span
                ref={ref}
                className="material-symbols-outlined absolute top-1 cursor-pointer "
                onClick={showPassword}
              >
                visibility
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center justify-center bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit gap-4 border border-green-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <h2 className="font-bold text-2xl">Your Passowrds</h2>
        {paswdArray.length > 0 ? (
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {paswdArray.map((item, index) => (
                <tr key={index}>
                  <td className="border border-white py-2 text-center w-32">
                    <a href={item.site} target="_blank">
                      {item.site}{" "}
                    </a>{" "}
                    <span
                      className="material-symbols-outlined cursor-pointer active:text-green-600"
                      onClick={() => copyText(item.site)}
                    >
                      content_copy
                    </span>
                  </td>
                  <td className="border border-white py-2 text-center w-32">
                    {item.username}{" "}
                    <span
                      className="material-symbols-outlined cursor-pointer active:text-green-600"
                      onClick={() => copyText(item.username)}
                    >
                      content_copy
                    </span>
                  </td>
                  <td className="border border-white py-2 text-center w-32">
                    {item.password}
                    <span
                      className="material-symbols-outlined cursor-pointer active:text-green-600"
                      onClick={() => copyText(item.password)}
                    >
                      content_copy
                    </span>
                  </td>
                  <td className="border border-white py-2 text-center w-32">
                    <span
                      onClick={() => editPassword(item.id)}
                      className="material-symbols-outlined cursor-pointer"
                    >
                      edit
                    </span>
                    <span>
                      <lord-icon
                        onClick={() => deletePassword(item.id)}
                        className="cursor-pointer"
                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No Passowrds to show!</h2>
        )}
      </div>
    </>
  );
};

export default Manager;
