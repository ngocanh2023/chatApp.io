import React from "react";
import {useNavigate} from "react-router-dom";

const Table = ({datas}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    thousandSeparator: ".",
    currency: "VND",
  });

  const navigate = useNavigate();
  
  const sendId = async (sendId) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    await fetch(`http://localhost:5000/sendId?id=${sendId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("sendId", result))
      .catch((error) => console.error(error));
  }

  
  return (
    <>
      {datas.map((data, i) => {
        return (
          <tbody key={i}>
            <tr>
              <td>{i + 1}</td>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{formatter.format(data.price) + " VND"}</td>
              <td className="imgPhoto">
                <div className="photoImg">
                  <img src={data.img1} alt="" />
                </div>
              </td>
              <td>{data.category}</td>
              <td>
                <div className="editUpdate">
                  <div className="editBtn">
                    <button onClick={() => {navigate("/update")}}>Update</button>
                  </div>
                  <div className="updateBtn">
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('id01').style.display='block';
                        sendId(data._id)
                        console.log('clicked1', data._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        );
      })}
    </>
  );
};
export default Table;
