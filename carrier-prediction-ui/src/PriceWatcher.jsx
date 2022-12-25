import * as React from "react";
import {
  Body,
  Button,
  Checkbox,
  Modal,
  Radio,
  Select,
  Spinner,
  Subheading,
  TextField,
} from "@seller-center/core-components";

const PriceWatcher = ({ isOpen, onClose, userId, productId, currPrice, onSetupSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const [priceRule, setPriceRule] = React.useState("");
  const [priceMargin, setPriceMargin] = React.useState(0);
  const [priceAction, setPriceAction] = React.useState("");
  const [alertChannels, setAlertChannels] = React.useState([]);
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handlePriceAlertChange = (e) => {
    const { value, checked } = e.target;
    let alertChannelsClone = [...alertChannels];
    if (checked && !alertChannelsClone.includes(value)) {
      alertChannelsClone.push(value);
    } else if (alertChannelsClone.includes(value)) {
      alertChannelsClone = alertChannelsClone.filter((ele) => ele !== value);
    }
    setAlertChannels(alertChannelsClone);
  };

  const setUpPriceWatch = () => {
    const formData = {
      userId,
      productId,
      currPrice,
      priceRule,
      priceMargin,
      priceAction,
      alertChannels,
      phoneNumber,
      email,
      paymentMethod,
    };

    //TODO: fire api call with formData
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSetupSuccess();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} title="Price Watcher" onClose={onClose} className="relative">
      <Body as="p" className="py-16">
        <Subheading as="span">Current Price: </Subheading>${currPrice}
      </Body>
      <Body as="p" className="py-16 border-t border-solid border-gray-20">
        <Subheading as="span">Preferred Price: </Subheading>
        <Select label="Price Rule" onChange={(e) => setPriceRule(e.target.value)}>
          <option value={""}>Select a price rule</option>
          <option value={"REL_PERC"}>Below %</option>
          <option value={"REL_AMT"}>Below amount</option>
          <option value={"ABS"}>Fixed</option>
        </Select>
        <TextField
          label="Select margin of change"
          type="number"
          value={`${priceMargin}`}
          onChange={(e) => setPriceMargin(+e.target.value)}
        />
      </Body>
      <Body as="p" className="py-16 border-t border-solid border-gray-20">
        <Subheading as="span">Action</Subheading>
        <Body as="p">
          <Radio
            label="Alert"
            value="ALERT"
            name="priceAction"
            checked={priceAction === "ALERT"}
            onChange={(e) => setPriceAction(e.target.value)}
          />
          <Radio
            label="Autobuy"
            value="AUTOBUY"
            name="priceAction"
            className="ml-32"
            checked={priceAction === "AUTOBUY"}
            onChange={(e) => setPriceAction(e.target.value)}
          />
        </Body>
        {priceAction === "ALERT" && (
          <Body as="p" className="my-16 pl-20">
            <Body as="p">
              <Checkbox
                label="Whatsapp"
                value="whatsapp"
                checked={alertChannels.includes("whatsapp")}
                onChange={handlePriceAlertChange}
              />
              {alertChannels.includes("whatsapp") && (
                <TextField
                  label="Whatsapp number"
                  value={`${phoneNumber}`}
                  onChange={(e) => setPhoneNumber(+e.target.value)}
                />
              )}
            </Body>
            <Body as="p">
              <Checkbox
                label="Email"
                value="email"
                checked={alertChannels.includes("email")}
                onChange={handlePriceAlertChange}
              />
              {alertChannels.includes("email") && (
                <TextField label="Email ID" value={`${email}`} onChange={(e) => setEmail(e.target.value)} />
              )}
            </Body>
          </Body>
        )}
        {priceAction === "AUTOBUY" && (
          <Body as="p" className="my-16 pl-80">
            <Radio
              label="Credit Card"
              value="CC"
              name="paymentMethod"
              checked={paymentMethod === "CC"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Radio
              label="COD"
              value="COD"
              name="paymentMethod"
              className="ml-32"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Body>
        )}
      </Body>
      <Body as="p" className="py-16 border-t border-solid border-gray-20">
        <Button variant="primary" onClick={setUpPriceWatch}>
          Submit
        </Button>
      </Body>
      {loading && <Spinner className="absolute top-1/2 left-1/2" />}
    </Modal>
  );
};

export default PriceWatcher;
