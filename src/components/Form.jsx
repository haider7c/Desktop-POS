import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addFormData } from "../Redux/invoceReducer";
import { useSelector } from "react-redux";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Template2 from "../pages/Templates/Template2.jsx";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
const Form = () => {
  const { formDetails } = useSelector((state) => state.Invoice);

  const dispatch = useDispatch();
  // const [selectedImage, setSelectedImage] = useState(
  //   localStorage.getItem("selectedImage") || null
  // );
  const initialItems = JSON.parse(localStorage.getItem("items")) || [
    {
      description: "",
      riceRate: "1",
      safiWeight: "",
      emptyBag: "",
      quantity: "1",
      weight: "",
      kgWeight: "0",
      unit: "",
    },
  ];

  const [items, setItems] = useState(initialItems);

  const [notes, setNotes] = useState(formDetails.notes || "");
  const [terms, setTerms] = useState(formDetails.terms || "");
  // const [discount, setDiscount] = useState(formDetails.discount || "");
  // const [percentageDiscount, setPercentageDiscount] = useState(
  //   formDetails.percentageDiscount || ""
  // );
  const [vehicleReg, setvehicleReg] = useState(formDetails.vehicleReg || "");
  const [labourPerBag, setLabourPerBag] = useState(
    formDetails.labourPerBag || ""
  );
  const [transpAction, setTranspAction] = useState(
    localStorage.getItem("transpAction") || "+"
  ); // New state to track action (+ or -)
  const [transpExp, settranspExp] = useState(formDetails.transpExp || "");
  const [amountPaid, setAmountPaid] = useState(formDetails.amountPaid || "");
  const [serialNumb, setSerialNumb] = useState(formDetails.serialNumb || "");
  const [billTo, setBillTo] = useState(formDetails.billTo || "");
  const [phone, setPhone] = useState(formDetails.phone || "");
  const [date, setDate] = useState(formDetails.date || "");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        description: "",
        riceRate: "1",
        safiWeight: "",
        emptyBag: "",
        quantity: "1",
        weight: "",
        kgWeight: "0",
      },
    ]);
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;

    if (name === "quantity" || name === "weight") {
      const quantity = parseFloat(newItems[index].quantity || 0);
      const weight = parseFloat(newItems[index].weight || 0);

      newItems[index].kgWeight = (quantity * weight).toFixed(2);
    }

    setItems(newItems);
  };
  const calculateSubtotal = () => {
    // First, calculate the subtotal for all items
    const total = items.reduce((acc, item) => {
      const safiWeight =
        parseFloat(item.kgWeight || "0") - parseFloat(item.emptyBag);
      const unit = parseFloat(item.unit || "1"); // Default to 1 to avoid division by 0
      const riceRate = parseFloat(item.riceRate || "0");
      const quantity = parseFloat(item.quantity || "0");

      // Calculate the value for this item (safiWeight / unit) * riceRate
      return acc + (safiWeight / unit) * riceRate + quantity * labourPerBag;
    }, 0);

    // Then subtract the transportation expense from the total
    if (transpAction === "+") {
      return total + parseFloat(transpExp || "0");
    } else {
      return total - parseFloat(transpExp || "0");
    }
  };

  //REF FUNTION
  const ref = React.useRef(null);
  const handleClick = () => {
    ref.current.click();
  };

  React.useEffect(() => {
    if (ref.current) {
      // Access element properties here
      ref.current.click();
    }
  }, [ref]);

  const handleDownload = (e) => {
    e.preventDefault();
    const subtotal = calculateSubtotal();
    const total = subtotal;
    const balanceDue = total - parseFloat(amountPaid || "0");

    const formValues = {
      items: items,
      notes: notes,
      terms: terms,
      labourPerBag: labourPerBag,
      vehicleReg: vehicleReg,
      transpExp: transpExp,
      amountPaid: amountPaid,
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      balanceDue: balanceDue.toFixed(2),
      serialNumb: serialNumb,
      billTo: billTo,
      phone: phone,
      date: date,
    };
    dispatch(addFormData({ ...formValues }));
    handleClick();
  };

  return (
    <div>
      <NavBar />
      <div className="h-auto flex lg:flex-row flex-col justify-center mt-10 ml-10">
        <div className="flex flex-col border-2 px-3 md:px-10 md:py-10 w-full">
          <div className="flex md:flex-row flex-col justify-between">
            <div>
              <p className="md:text-5xl text-2xl mt-5 md:mt-0">Billing</p>
              <div className="rounded-md border-2 h-10 flex justify-start items-center mt-5">
                <div className="bg-gray-100 h-full w-8 flex items-center justify-center">
                  #
                </div>
                <input
                  value={serialNumb}
                  type="text"
                  className="h-full w-full focus:outline-none"
                  onChange={(e) => setSerialNumb(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex md:flex-row flex-col justify-between">
            <div>
              <div className="flex flex-row mt-5 gap-5">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="" className="ml-5">
                    Name
                  </label>
                  <div className="h-14 md:w-52 mt-5">
                    <input
                      required
                      value={billTo}
                      type="text"
                      className=" rounded-md border-2 focus:outline-none focus:shadow-md h-full w-full px-3"
                      placeholder="Bill to?"
                      onChange={(e) => setBillTo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="" className="ml-5">
                    Phone
                  </label>
                  <div className="h-14 md:w-52 mt-5">
                    <input
                      required
                      value={phone} // shipto to phone
                      type="tel"
                      className=" rounded-md border-2 focus:outline-none focus:shadow-md h-full w-full px-3"
                      placeholder="Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end md:items:end">
              <div className="flex md:flex-col flex-row items-end md:gap-1 gap-2 mt-5 md:mt-0">
                <div className="flex md:flex-row flex-col md:items-center gap-5 w-1/2 md:w-max">
                  <label htmlFor="">Date</label>
                  <div className="h-14 md:w-52 w-full">
                    <input
                      value={date}
                      type="date"
                      className="rounded-md border-2 focus:outline-none focus:shadow-md h-full w-full px-3"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div className="flex md:flex-row flex-col md:items-center gap-5 w-1/2 md:w-max">
                  <label htmlFor="">Payment Terms</label>
                  <div className="h-14 md:w-52 w-full">
                    <input
                      value={payTerms}
                      type="text"
                      className=" rounded-md border-2 focus:outline-none focus:shadow-md h-full w-full px-3"
                      onChange={(e) => setPayTerms(e.target.value)}
                    />
                  </div>
                </div> */}
              </div>
              <div className="flex md:flex-col flex-row items-end md:gap-1 gap-2 mt-5 md:mt-0">
                {/* <div className="flex md:flex-row flex-col md:items-center gap-5 w-1/2 md:w-max">
                  <label htmlFor="">Due Date</label>
                  <div className="h-14 md:w-52 w-full">
                    <input
                      value={dueDate}
                      type="date"
                      className="rounded-md border-2 focus:outline-none focus:shadow-md h-full w-full px-3"
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex md:flex-row flex-col md:items-center gap-5 w-1/2 md:w-max">
                  <label htmlFor="">PO Number</label>
                  <div className="h-14 md:w-52 w-full">
                    <input
                      value={poNumber}
                      type="text"
                      className=" rounded-md border-2 focus:outline-none focus:shadow-md h-full w-full px-3"
                      onChange={(e) => setPoNumber(e.target.value)}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex flex-row mt-10 w-full justify-between py-2 px-5 rounded-md bg-[#132144] text-white">
            <div className="flex-grow">
              <p>Item</p>
            </div>
            <div className="w-16">
              <p>Qty</p>
            </div>
            <div className="w-24">
              <p>Bharti</p>
            </div>
            <div className="text-center">
              <p>Weight</p>
            </div>
            <div className="w-20 ml-10">
              <p>Khali kat</p>
            </div>
            <div className="w-24 ">
              <p>Safi Weight</p>
            </div>
            <div className="w-16 ml-5">
              <p>Rate</p>
            </div>
            <div className="w-16 ml-4 mr-4  ">
              <p>Man/50</p>
            </div>
          </div>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap items-center mt-1 justify-center"
            >
              {/* <select
                name="ricetype"
                onChange={(e) => handleInputChange(index, e)}
                className="h-12 px-3 rounded-l-md border-2 focus:outline-none flex-grow"
              >
                <option value="" disabled selected>
                  Select Rice Type
                </option>
                <option value="basmati">Basmati</option>
                <option value="jasmine">Jasmine</option>
                <option value="sushi">Sushi Rice</option>
                <option value="brown">Brown Rice</option>
                <option value="wild">Wild Rice</option>

              </select> */}
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Description"
                className="h-12 px-3 rounded-l-md border-2 focus:outline-none w-20 flex-grow" // flex-grow allows it to take remaining space
              />
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? "" : Math.max(0, e.target.value);
                  handleInputChange(index, {
                    target: { name: e.target.name, value },
                  });
                }}
                className="h-12 px-3 border-2 focus:outline-none w-20" // Adjust width for responsive behavior
              />
              <input
                type="number"
                name="weight"
                value={item.weight}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? "" : Math.max(0, e.target.value);
                  handleInputChange(index, {
                    target: { name: e.target.name, value },
                  });
                }}
                className="h-12 px-3 border-2 focus:outline-none w-20" // Adjust width for responsive behavior
              />
              <input
                type="number"
                name="kgWeight"
                value={item.kgWeight}
                readOnly
                className="h-12 px-3 rounded-r-md border-2 focus:outline-none w-28" // Adjust width for responsive behavior
              />

              <input
                type="number"
                name="emptyBag"
                value={item.emptyBag}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? "" : Math.max(0, e.target.value);
                  handleInputChange(index, {
                    target: { name: e.target.name, value },
                  });
                }}
                className="h-12 px-3 rounded-l-md border-2 focus:outline-none w-20"
              />
              <input
                type="number"
                name="safiWeight"
                value={item.kgWeight - item.emptyBag} // Calculate the difference
                readOnly
                className="h-12 px-3 rounded-l-md border-2 focus:outline-none w-24"
              />

              <input
                type="number"
                name="riceRate"
                value={item.riceRate}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? "" : Math.max(0, e.target.value);
                  handleInputChange(index, {
                    target: { name: e.target.name, value },
                  });
                }}
                className="h-12 px-3 rounded-l-md border-2 focus:outline-none w-20"
              />
              <select
                name="unit"
                value={item.unit || ""} // Ensures the select field is controlled
                onChange={(e) => handleInputChange(index, e)}
                className="h-12 px-3 rounded-l-md border-2 focus:outline-none"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="40">40 kg</option>
                <option value="50">50 kg</option>
              </select>

              <div
                onClick={
                  items.length > 1 ? () => handleDeleteItem(index) : null
                } // Disable when only 1 item
                className={`bg-gray-100 ${
                  items.length > 1
                    ? "hover:bg-[#20ad77] hover:cursor-pointer hover:text-white"
                    : "cursor-not-allowed"
                } text-gray-600 h-12 w-8 flex justify-center items-center rounded-md`}
              >
                <FaTimes size={20} />
              </div>
            </div>
          ))}

          <div className="flex justify-start">
            <button
              onClick={handleAddItem}
              className="px-5 py-2 bg-[#20ad77] text-white rounded-md mt-5"
            >
              Add Item
            </button>
          </div>
          <div className="flex md:flex-row flex-col gap-10 mt-10">
            <div className="md:w-1/2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 rounded-md border-2 focus:outline-none focus:shadow-md px-3 py-2"
                placeholder="Additional Notes"
              ></textarea>
              <textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full h-32 mt-5 rounded-md border-2 focus:outline-none focus:shadow-md px-3 py-2"
                placeholder="Terms and Conditions"
              ></textarea>
            </div>
            <div className="md:w-1/2 flex flex-col gap-5">
              {/* <div className="flex justify-between items-center">
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40"
                />
              </div> */}
              {/* <div className="flex justify-between items-center">
                <label htmlFor="percentageDiscount">
                  Percentage Discount (%)
                </label>
                <input
                  type="number"
                  value={percentageDiscount}
                  onChange={(e) => setPercentageDiscount(e.target.value)}
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40"
                />
              </div> */}

              <div className="flex justify-between items-center">
                <label>Salae + Labour</label>
                <input
                  type="number"
                  value={labourPerBag}
                  onChange={(e) => setLabourPerBag(e.target.value)}
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40"
                />
              </div>
              <div className="flex justify-between items-center">
                <label>Vehicle No.</label>
                <input
                  type="number"
                  value={vehicleReg}
                  onChange={(e) => setvehicleReg(e.target.value)}
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40"
                />
              </div>
              <div className="flex justify-between items-center">
                <label>Transportation Expense</label>
                <select
                  value={transpAction}
                  onChange={(e) => setTranspAction(e.target.value)} // Update the action (+ or -)
                  className="h-9 rounded-md border-2 focus:outline-none"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="+">Add</option>
                  <option value="-">Subtract</option>
                </select>
                <input
                  type="number"
                  value={transpExp}
                  onChange={(e) => settranspExp(e.target.value)}
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="amountPaid">Amount Paid</label>
                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="subtotal">Subtotal</label>
                <input
                  type="text"
                  value={calculateSubtotal().toFixed(2)}
                  readOnly
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40 bg-gray-100"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="total">Total</label>
                <input
                  type="text"
                  value={calculateSubtotal().toFixed(2)}
                  readOnly
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40 bg-gray-100"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="balanceDue">Balance Due</label>
                <input
                  type="text"
                  value={(
                    calculateSubtotal() - parseFloat(amountPaid || "0")
                  ).toFixed(2)}
                  readOnly
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40 bg-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-10">
            <button
              type="button"
              onClick={handleDownload}
              className="px-10 py-3 bg-[#20ad77] text-white rounded-md"
            >
              Save
            </button>
          </div>
          <button ref={ref}>
            <PDFDownloadLink
              document={<Template2 data={formDetails} />}
              fileName="somename.pdf"
              className="px-10 py-3 bg-[#20ad77] text-white rounded-md"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download PDF!"
              }
            </PDFDownloadLink>
          </button>
        </div>
      </div>
      {/* Main form div  */}
      {/* <div>
        <PDFViewer height={650} width={500}>
          <Template2 />
        </PDFViewer>
      </div> */}
      {/* pdf viewer arzi div  */}
      <Footer />
    </div>
  );
};

export default Form;
