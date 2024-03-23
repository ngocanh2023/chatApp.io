import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Table from "./table";

import "./admin.css";

const Admin = () => {
  const [proData, setProData] = useState([]);
  const [searchInp, setSearchInp] = useState("");

  const navigate = useNavigate();

  function searchBtn(arr, query) {
    return arr.filter((data) =>
      data.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  console.log("search", searchBtn(proData, searchInp));

  const fetchProducts = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("http://localhost:5000/product", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setProData(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  };


  const deleteById = async () => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    
    await fetch(`http://localhost:5000/adProduct`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("resultDelete", result))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  // console.log("proData", proData);

  return (
    <>
      <nav className="adminNav">
        <div className="adminTit">@dmin</div>
        <div className="adminMenu">
          <div
            className="adminHome"
            onClick={() => {
              window.location.href = "http://localhost:3000/";
            }}
          >
            Home
          </div>
          <div className="chatApp" onClick={() =>{navigate("/chatApp")}}>Chat App</div>
        </div>
      </nav>
      <div className="searchTool">
        <div className="searchInp">
          <input
            type="text"
            placeholder="please search..."
            onChange={(e) => {
              setSearchInp(e.target.value);
            }}
          />
        </div>
        <div className="searchBtn">
          <button
          type="button"
          className="btnSearch"
            onClick={() => {
              searchBtn(proData, searchInp);
            }}
          >
            Search
          </button>
        </div>
      </div>
      {/* MODAL */}
      <div id="id01" className="modal">
        <span
          onClick={() => {
            document.getElementById("id01").style.display = "none";
          }}
          className="close"
          title="Close Modal"
        >
          &times;
        </span>
        <form className="modal-content" action="/action_page.php">
          <div className="container">
            <h1>Delete Product</h1>
            <p>Are you sure you want to delete your product?</p>

            <div className="clearfix">
              <button
                type="button"
                className="cancelbtn"
                onClick={() => {
                  document.getElementById("id01").style.display = "none";
                }}
              >
                Cancel
              </button>
              <button type="button" className="deletebtn" onClick={() => {
                console.log('clicked!'); 
                deleteById();
                document.getElementById("id01").style.display = "none";
                window.location.reload();
            }}>
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>

      {/*  */}

      <div className="tableAdmin">
        <table className="tableMenu">
          <thead className="headTable">
            <tr className="menuAdmin">
              <th>NO</th>
              <th>ID PRODUCT</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>IMAGE</th>
              <th>CATEGORY</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <Table datas={searchBtn(proData, searchInp)}/>
        </table>
      </div>
    </>
  );
};
export default Admin;
