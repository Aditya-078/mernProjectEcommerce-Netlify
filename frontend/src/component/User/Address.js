import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, editAddress, removeAddress } from "../../actions/userAction";
import { useAlert } from "react-alert";
import './Address.css'

const Address = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);

  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });

  const [editMode, setEditMode] = useState(false); 
  const [editAddressId, setEditAddressId] = useState("");

  useEffect(() => {
    if (editMode) {
      const selectedAddress = user.addresses.find(address => address._id === editAddressId);
      if (selectedAddress) {
        setNewAddress(selectedAddress);
      }
    } else {
      setNewAddress({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: "",
      });
    }
  }, [editMode, editAddressId, user.addresses]);

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newAddress.address ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.country ||
      !newAddress.pinCode ||
      !newAddress.phoneNo
    ) {
      alert.error("Please fill in all address fields");
      return;
    }
    if (editMode) {
      dispatch(editAddress(editAddressId, newAddress));
      setEditMode(false);
      alert.success("Address edited successfully");
    } else {
      dispatch(addAddress(newAddress));
      alert.success("Address added successfully");
    }
  };

  const handleEdit = (addressId) => {
    setEditMode(true);
    setEditAddressId(addressId);
  };

  const handleDelete = (addressId) => {
    dispatch(removeAddress(addressId));
    alert.success("Address deleted successfully");
    window.location.reload();

  };
  
  const handleButtonClick = () => {
    window.location.reload();
  };
  

  return (
    <div className="address-container">
      <div className="form-container">
        <h2>{editMode ? "Edit Address" : "Add New Address"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>{editMode ? "EDIT ADDRESS" : "ADD ADDRESS"}</h2>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={newAddress.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={newAddress.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={newAddress.state}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={newAddress.country}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="pinCode">Pin Code:</label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={newAddress.pinCode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phoneNo">Phone Number:</label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={newAddress.phoneNo}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" onClick={handleButtonClick}>{editMode ? "Edit Address" : "Add Address"}</button>
        </form>
      </div>
      <div className="saved-addresses-container">
        <h2>Saved Addresses</h2>
        <ul>
  {user.addresses.map((address) => (
    <li key={address._id}>
      <p>
        <strong>Address:</strong> {address.address}
        <br />
        <strong>City:</strong> {address.city}
        <br />
        <strong>State:</strong> {address.state}
        <br />
        <strong>Country:</strong> {address.country}
        <br />
        <strong>Pin Code:</strong> {address.pinCode}
        <br />
        <strong>Phone Number:</strong> {address.phoneNo}
      </p>
      <button onClick={() => handleEdit(address._id)}>Edit</button>
      <button onClick={() => handleDelete(address._id)}>Delete</button>
    </li>
  ))}
</ul>
      </div>
    </div>
  );
};

export default Address;
