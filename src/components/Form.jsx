import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addFormData } from "../Redux/invoceReducer";
import { useSelector } from "react-redux";
// import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
// import Template2 from "../Pages/invoice-builder/Templates/Template2";
const Form = () => {
  const { formDetails } = useSelector((state) => state.Invoice);

  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem("selectedImage") || null
  );
  const initialItems = JSON.parse(localStorage.getItem("items")) || [
    { description: "", quantity: "1", rate: "0", amount: "0" },
  ];

  const [items, setItems] = useState(initialItems);

  const [notes, setNotes] = useState(formDetails.notes || "");
  const [terms, setTerms] = useState(formDetails.terms || "");
  const [discount, setDiscount] = useState(formDetails.discount || "");
  const [percentageDiscount, setPercentageDiscount] = useState(
    formDetails.percentageDiscount || ""
  );
  const [tax, setTax] = useState(formDetails.tax || "");
  const [shipping, setShipping] = useState(formDetails.shipping || "");
  const [amountPaid, setAmountPaid] = useState(formDetails.amountPaid || "");
  const [currency, setCurrency] = useState("USD");
  const [serialNumb, setSerialNumb] = useState(formDetails.serialNumb || "");
  const [addressFrom, setAddressFrom] = useState(formDetails.addressFrom || "");
  const [billTo, setBillTo] = useState(formDetails.billTo || "");
  const [shipTo, setShipTo] = useState(formDetails.shipTo || "");
  const [date, setDate] = useState(formDetails.date || "");
  const [payTerms, setPayTerms] = useState(formDetails.payTerms || "");
  const [dueDate, setDueDate] = useState(formDetails.dueDate || "");
  const [poNumber, setPoNumber] = useState(formDetails.poNumber || "");
  const [companyName, setCompanyName] = useState(formDetails.companyName || "");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a PNG image.");
    }
  };
  //
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  //

  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("selectedImage", selectedImage);
    }
  }, [selectedImage]);
  //

  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { description: "", quantity: "1", rate: "0", amount: "0" },
    ]);
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;

    if (name === "quantity" || name === "rate") {
      const quantity = parseFloat(newItems[index].quantity || 0);
      const rate = parseFloat(newItems[index].rate || 0);
      newItems[index].amount = (quantity * rate).toFixed(2);
    }

    setItems(newItems);
  };
  const calculateSubtotal = () => {
    return items.reduce(
      (total, item) =>
        total + parseFloat(item.quantity || "0") * parseFloat(item.rate || "0"),
      0
    );
  };

  const calculateTotalDiscount = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = parseFloat(discount || "0");
    const percentageDiscountAmount =
      (parseFloat(percentageDiscount || "0") / 100) * subtotal;
    return discountAmount + percentageDiscountAmount;
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
    const totalDiscount = calculateTotalDiscount();
    const total =
      subtotal +
      parseFloat(tax || "0") +
      parseFloat(shipping || "0") -
      totalDiscount;
    const balanceDue = total - parseFloat(amountPaid || "0");

    const formValues = {
      image: selectedImage,
      items: items,
      notes: notes,
      terms: terms,
      discount: discount,
      percentageDiscount: percentageDiscount,
      tax: tax,
      shipping: shipping,
      amountPaid: amountPaid,
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      balanceDue: balanceDue.toFixed(2),
      currency: currency,
      serialNumb: serialNumb,
      addressFrom: addressFrom,
      billTo: billTo,
      shipTo: shipTo,
      date: date,
      payTerms: payTerms,
      dueDate: dueDate,
      poNumber: poNumber,
      companyName: companyName,
    };
    dispatch(addFormData({ ...formValues }));
    // console.log(formValues);
    handleClick();
  };

  return (
    <div className="my-10 flex lg:flex-row flex-col justify-center md:mx-5">
      <div className="flex flex-col border-2 px-3 md:px-10 md:py-10 w-full">
        <form onSubmit={handleDownload}>
          <div className="flex md:flex-row flex-col justify-between">
            <div>
              {selectedImage ? (
                <div className="relative md:h-36 md:w-36 h-24 w-28">
                  <img
                    src={selectedImage}
                    alt="Profile"
                    className="shadow-md md:h-36 md:w-36 h-24 w-28"
                  />
                  <div className="bg-gray-700 hover:bg-[#20ad77] rounded-md absolute bottom-2 right-2 h-8 p-1 flex justify-center items-center">
                    <MdDelete
                      size={25}
                      className=" hover:cursor-pointer text-white"
                      onClick={handleImageDelete}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="md:h-36 md:w-36 h-24 w-28 bg-[#FAFAFA] hover:bg-[#edeaea] text-gray-600 flex items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  Add your logo
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/png"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
            <div>
              <p className="md:text-5xl text-2xl mt-5 md:mt-0">INVOICE</p>
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
              <div className=" flex md:flex-row flex-col gap-5">
                <input
                  required
                  value={companyName}
                  type="text"
                  className=" rounded-md border-2 focus:outline-none focus:shadow-md h-14 md:w-52 w-full px-3"
                  placeholder="Your Company Name?"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                  required
                  value={addressFrom}
                  type="text"
                  className=" rounded-md border-2 focus:outline-none focus:shadow-md h-14 md:w-52 w-full px-3"
                  placeholder="Who is this from?"
                  onChange={(e) => setAddressFrom(e.target.value)}
                />
              </div>
              <div className="flex flex-row mt-5 gap-5">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="" className="ml-5">
                    Bill To
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
                    Ship To
                  </label>
                  <div className="h-14 md:w-52 mt-5">
                    <input
                      required
                      value={shipTo}
                      type="text"
                      className=" rounded-md border-2 focus:outline-none focus:shadow-md h-full w-full px-3"
                      placeholder="Ship to?"
                      onChange={(e) => setShipTo(e.target.value)}
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
                <div className="flex md:flex-row flex-col md:items-center gap-5 w-1/2 md:w-max">
                  <label htmlFor="">Payment Terms</label>
                  <div className="h-14 md:w-52 w-full">
                    <input
                      value={payTerms}
                      type="text"
                      className=" rounded-md border-2 focus:outline-none focus:shadow-md h-full w-full px-3"
                      onChange={(e) => setPayTerms(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col flex-row items-end md:gap-1 gap-2 mt-5 md:mt-0">
                <div className="flex md:flex-row flex-col md:items-center gap-5 w-1/2 md:w-max">
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
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row mt-10 w-full justify-between py-2 px-5 rounded-md bg-[#132144] text-white">
            <div>
              <p>Item</p>
            </div>
            <div className="flex flex-row gap-10 sm:gap-1 smd:gap-10 lmd:gap-2">
              <div className="text-center">
                <p>Qty</p>
              </div>
              <div className="mx-1 md:mx-20 text-center">
                <p>Rate</p>
              </div>
              <div className="md:mr-5 text-center">
                <p>Amount</p>
              </div>
            </div>
          </div>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap items-center mt-1 w-full justify-center"
            >
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Item Description"
                className="h-12 px-3 rounded-l-md border-2 focus:outline-none flex-grow w-20" // flex-grow allows it to take remaining space
              />
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleInputChange(index, e)}
                className="h-12 px-3 w-12 md:w-20 border-2 focus:outline-none" // Adjust width for responsive behavior
              />
              <input
                type="number"
                name="rate"
                value={item.rate}
                onChange={(e) => handleInputChange(index, e)}
                className="h-12 px-3 w-16 md:w-28 border-2 focus:outline-none" // Adjust width for responsive behavior
              />
              <input
                type="number"
                name="amount"
                value={item.amount}
                readOnly
                className="h-12 px-3 w-20 md:w-28 rounded-r-md border-2 focus:outline-none bg-gray-100" // Adjust width for responsive behavior
              />
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
              <div className="flex justify-between items-center">
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="percentageDiscount">
                  Percentage Discount (%)
                </label>
                <input
                  type="number"
                  value={percentageDiscount}
                  onChange={(e) => setPercentageDiscount(e.target.value)}
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="tax">Tax</label>
                <input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="shipping">Shipping</label>
                <input
                  type="number"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
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
                  value={(
                    calculateSubtotal() +
                    parseFloat(tax || "0") +
                    parseFloat(shipping || "0") -
                    calculateTotalDiscount()
                  ).toFixed(2)}
                  readOnly
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40 bg-gray-100"
                />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="balanceDue">Balance Due</label>
                <input
                  type="text"
                  value={(
                    calculateSubtotal() +
                    parseFloat(tax || "0") +
                    parseFloat(shipping || "0") -
                    calculateTotalDiscount() -
                    parseFloat(amountPaid || "0")
                  ).toFixed(2)}
                  readOnly
                  className="rounded-md border-2 focus:outline-none focus:shadow-md h-10 px-3 w-40 bg-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-10">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-2 py-2 bg-white border-2 rounded-md mr-3"
            >
              <option value="$">USD</option>
              <option value="€">EUR</option>
              <option value="£">GBP</option>
            </select>
            <button
              type="submit"
              className="px-10 py-3 bg-[#20ad77] text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
        <button ref={ref}>
          {/* <PDFDownloadLink
            document={<Template2 data={formDetails} />}
            fileName="somename.pdf"
            className="px-10 py-3 bg-[#20ad77] text-white rounded-md"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF!"
            }
          </PDFDownloadLink> */}
        </button>
      </div>

      {/* <PDFViewer height={650} width={500}>
        <Template2 />
      </PDFViewer> */}
    </div>
  );
};

export default Form;
