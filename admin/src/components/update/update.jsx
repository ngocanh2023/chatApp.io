import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./update.css";

const Update = () => {
  const [cate, setCate] = useState("");
  const [img1, setImages] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");

  console.log("cate", cate, img1, longDesc, name, price, shortDesc);

  const navigate = useNavigate();

  const updatePro = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      category: cate,
      img1: img1,
      long_desc: longDesc,
      name: name,
      price: price,
      short_desc: shortDesc,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/update", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="updateForm">
        <div className="updateTit">UPD@TE FORM</div>
        <div className="updateContent">
          <div className="categoryInb">
            <div className="cateTit">Category</div>
            <input
              onChange={(e) => {
                setCate(e.target.value);
              }}
            />
          </div>
          <div className="imgInb">
            <div className="imgTit">Image</div>
            <input
              type="src"
              onChange={(e) => {
                setImages(e.target.value);
              }}
            />
          </div>
          <div className="longInb">
            <div className="longTit">Long Desc</div>
            <input
              onChange={(e) => {
                setLongDesc(e.target.value);
              }}
            />
          </div>
          <div className="nameInb">
            <div className="nameTit">Name</div>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="priceInb">
            <div className="priceTit">Price</div>
            <input
              type="Number"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="shortInb">
            <div className="shortTit">Short Desc</div>
            <input
              onChange={(e) => {
                setShortDesc(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="submit">
          <button
            onClick={() => {
              updatePro();
              alert("Upgraded!");
            }}
          >
            Submit
          </button>
          <div className="return">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Update;
