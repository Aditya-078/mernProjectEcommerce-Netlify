import React, { Fragment, useState, useEffect } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(shippingInfo);
   
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });


  useEffect(() => {
    if (user && user.addresses) {
      setAddresses(user.addresses);
    }
  }, [user]);

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };
  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const addNewAddress = () => {
    if (!newAddress.address || !newAddress.city || !newAddress.state || !newAddress.country || !newAddress.pinCode || !newAddress.phoneNo) {
      alert.error("Please fill in all address fields");
      return;
    }
    setAddresses([...addresses, newAddress]);
    setNewAddress({
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      phoneNo: "",
    });
  };

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (selectedAddress.phoneNo.length < 10 || selectedAddress.phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(saveShippingInfo(selectedAddress));
    history.push("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
  
      <CheckoutSteps activeStep={0} />
  
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
  
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            {addresses.map((address, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`address${index}`}
                  name="shippingAddress"
                  checked={selectedAddress === address}
                  onChange={() => handleAddressChange(address)}
                />
                <label htmlFor={`address${index}`}>
                  {address.address}, {address.city}, {address.state},{" "}
                  {address.country}, {address.pinCode}, {address.phoneNo}
                </label>
              </div>
            ))}
  
            <div>
              <input
                type="radio"
                id="newAddress"
                name="shippingAddress"
                checked={!selectedAddress._id} // Assuming _id is the unique identifier for addresses
                onChange={() => setSelectedAddress({})}
              />
              <label htmlFor="newAddress">Add New Address</label>
            </div>
  
            {selectedAddress._id ? (
              <div>
                <h3>Selected Address:</h3>
                <p>
                  {selectedAddress.address}, {selectedAddress.city},{" "}
                  {selectedAddress.state}, {selectedAddress.country},{" "}
                  {selectedAddress.pinCode}, {selectedAddress.phoneNo}
                </p>
              </div>
            ) : (
              <Fragment>
                <div>
                  <HomeIcon />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    name="address"
                    value={newAddress.address}
                    onChange={handleNewAddressChange}
                  />
                </div>
                <div>
                  <LocationCityIcon />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={newAddress.city}
                    onChange={handleNewAddressChange}
                  />
                </div>
                <div>
                  <PinDropIcon />
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    name="pinCode"
                    value={newAddress.pinCode}
                    onChange={handleNewAddressChange}
                  />
                </div>
                <div>
                  <PhoneIcon />
                  <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    name="phoneNo"
                    value={newAddress.phoneNo}
                    onChange={handleNewAddressChange}
                    size="10"
                  />
                </div>
                <div>
                  <PublicIcon />
                  <select
                    required
                    name="country"
                    value={newAddress.country}
                    onChange={handleNewAddressChange}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                {newAddress.country && (
                  <div>
                    <TransferWithinAStationIcon />
                    <select
                      required
                      name="state"
                      value={newAddress.state}
                      onChange={handleNewAddressChange}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(newAddress.country).map(
                          (item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                )}
              </Fragment>
            )}
  
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={!selectedAddress._id && !selectedAddress.address} // Assuming _id is the unique identifier for addresses
            />
          </form>
          {addresses.length > 0 && (
            <Fragment>
              <h3>Saved Addresses:</h3>
              <ul>
                {addresses.map((address, index) => (
                  <li key={index}>
                    {address.address}, {address.city}, {address.state},{" "}
                    {address.country}, {address.pinCode}, {address.phoneNo}
                  </li>
                ))}
              </ul>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;