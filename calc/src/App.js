import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  var sort = true;
  const [result, setResult] = useState([]);

  const [showTable, setShowTable] = useState(false);

  const [addFormData, setAddformData] = useState({
    id: Math.random(),
    operand1: "",
    operand2: "",
    operator: "",
  });

  function submitHandler(event) {
    event.preventDefault();

    let ans;
    if (addFormData.operator === "+") {
      if (addFormData.operand1 % 1 != 0 || addFormData.operand2 % 1 != 0) {
        var l1 = addFormData.operand1.toString().split(".")[1].length;
        var l2 = addFormData.operand2.toString().split(".")[1].length;
        var fixed;
        if (l1 > l2) {
          fixed = l1;
        } else {
          fixed = l2;
        }
      }

      ans = Number(addFormData.operand1) + Number(addFormData.operand2);
      ans = ans.toFixed(fixed);
    }
    if (addFormData.operator === "-") {
      if (addFormData.operand1 % 1 != 0 || addFormData.operand2 % 1 != 0) {
        var l1 = addFormData.operand1.toString().split(".")[1].length;
        var l2 = addFormData.operand2.toString().split(".")[1].length;
        var fixed;
        if (l1 > l2) {
          fixed = l1;
        } else {
          fixed = l2;
        }
      }
      ans = Number(addFormData.operand1) - Number(addFormData.operand2);
      ans = ans.toFixed(fixed);
    }
    if (addFormData.operator === "*") {
      ans = Number(addFormData.operand1) * Number(addFormData.operand2);
    }
    if (addFormData.operator === "/") {
      if (
        Number(addFormData.operand1) == "" ||
        Number(addFormData.operand2) == "" ||
        Number(addFormData.operand2) == "0"
      ) {
        alert("numbers not valid");
      } else {
        ans = Number(addFormData.operand1) / Number(addFormData.operand2);
      }
    }
    if (addFormData.operator === "%") {
      ans = Number(addFormData.operand1) % Number(addFormData.operand2);
    }
    if (addFormData.operator === "AND") {
      ans = Number(addFormData.operand1) & Number(addFormData.operand2);
    }
    // if (addFormData.operator === "NOT") {
    //   ans = ~Number(addFormData.operand1);
    // }
    if (addFormData.operator === "XOR") {
      ans = Number(addFormData.operand1) ^ Number(addFormData.operand2);
    }
    if (addFormData.operator === "OR") {
      ans = Number(addFormData.operand1) | Number(addFormData.operand2);
    }
    if (ans) {
      let obj = {
        ...addFormData,

        result: ans,
      };
      setResult([...result, obj]);
    } else {
      alert("enter valid inputs");
    }

    setShowTable(false);
    setAddformData({
      id: Math.random(),
      operand1: "",
      operand2: "",
      operator: "",
    });
  }
  function handleChange(event) {
    setAddformData({
      ...addFormData,
      [event.target.name]: event.target.value,
    });
  }

  function deleteRowHandler(id) {
    console.log("works");
    console.log(result);
    var finalresult2 = result.filter((item) => item.id !== id);
    // var finalresult2=[]
    //     // for (let i = 0; i < result.length; i++) {
    //   if (result[i].id === id) {
    //     continue;
    //   }
    //   finalresult2.push(result[i]);
    // }
    console.log(finalresult2);
    setResult(finalresult2);
  }
  function sortOperand1handler() {
    if (sort === true) {
      var result2 = [];
      result2 = [...result];
      result2.sort((a, b) =>
        parseFloat(a.operand1) > parseFloat(b.operand1)
          ? 1
          : parseFloat(b.operand1) > parseFloat(a.operand1)
          ? -1
          : 0
      );
      setResult(result2);
      sort = !sort;
    }
    if ((sort = false)) {
      var result2 = [];
      result2 = [...result];
      result2.sort((b, a) =>
        parseFloat(a.operand1) > parseFloat(b.operand1)
          ? 1
          : parseFloat(b.operand1) > parseFloat(a.operand1)
          ? -1
          : 0
      );
      setResult(result2);
    }
    result2.sort(f);
  }
  function decendingSortOperand1handler() {
    var result2 = [];
    result2 = [...result];
    result2.sort((b, a) =>
      parseFloat(a.operand1) > parseFloat(b.operand1)
        ? 1
        : parseFloat(b.operand1) > parseFloat(a.operand1)
        ? -1
        : 0
    );
    setResult(result2);
  }
  function sortOperand2handler() {
    var result2 = [];
    result2 = [...result];
    result2.sort((a, b) =>
      parseFloat(a.operand2) > parseFloat(b.operand2)
        ? 1
        : parseFloat(b.operand2) > parseFloat(a.operand2)
        ? -1
        : 0
    );
    setResult(result2);
  }

  return (
    <div>
      <button onClick={() => setShowTable(!showTable)}>add</button>
      <button onClick={sortOperand1handler}>sortbyoperand1</button>
      <button onClick={sortOperand2handler}>sortbyoperand2</button>
      <button onClick={decendingSortOperand1handler}>decendingsort1</button>
      <table>
        <thead>
          <tr>
            <th>operand1</th>
            <th>operand2</th>
            <th>operator</th>
            <th>result</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {result.map((item) => (
            <tr>
              <td>{item.operand1}</td>
              <td>{item.operand2}</td>

              <td>{item.operator}</td>
              <td>{item.result}</td>
              <td>
                <button onClick={() => deleteRowHandler(item.id)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showTable && (
        <form onSubmit={submitHandler}>
          <input
            name="operand1"
            type="number"
            required="required"
            placeholder="enter num1"
            onChange={handleChange}
            value={addFormData.operand1}
          />
          <input
            name="operand2"
            type="number"
            required="required"
            placeholder="enter num2"
            onChange={handleChange}
            value={addFormData.operand2}
          />
          <select
            name="operator"
            type="text"
            required="required"
            placeholder="enter operand"
            onChange={handleChange}
            value={addFormData.operator}
          >
            <option value="value">operations</option>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
            <option value="%">%</option>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
            <option value="XOR">XOR</option>
          </select>
          {/* <input
            name="operator"
            type="text"
            required="required"
            placeholder="enter operand"
            onChange={handleChange}
            value={addFormData.operator}
          /> */}

          <button type="submit">addrow</button>
        </form>
      )}
    </div>
  );
}

export default App;
