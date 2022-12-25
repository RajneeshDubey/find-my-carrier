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
import axios from "axios";

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

const CarrierPredictor = ({ isOpen, onClose, userId, productId, currPrice, to_address, onSetupSuccess }) => {
  const [loading, setIsLoading] = React.useState(false);
  const [from_address, setFromAddress] = React.useState("");
  const [packageType, setPackageType] = React.useState("SMALL");
  const [weight, setWeight] = React.useState(3);
  const [deliveryReq, setDeliveryReq] = React.useState("");
  const [outputLabels, setOutputLabels] = React.useState([]);
  const [predicted, setPrediction] = React.useState(false);
  const [selectedShipping, setShipping] = React.useState("");
  const [override, setOverride] = React.useState(false);
  const [l, setL] = React.useState("");
  const [b, setB] = React.useState("");
  const [h, setH] = React.useState("");
 //const 
  const continueShipping = () => {

  };

  const resetState = () => {
    setPrediction(false);
    setOutputLabels([]);
    setShipping("");
    setOverride(false);
  };

  const predictCarrierTypeLabel = () => {
    setIsLoading(true);
    to_address = '66629';
    setDeliveryReq("2");
    let input = {
      "from_add": "33950",
      "to_add": "28603",
      "package_weight": "35.45",
      "delivery_req": "1"
    };

    let input2 = {
      "from_add": "33950",
        "to_add": "90210",
        "package_weight": "2000.45",
        "delivery_req": "2"
    };

   const input3=(from_address.toString()==="id2")?input2:input;

    console.log(input3);
    console.log(from_address)
    // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    //TODO: fire api call with formData
    axios.post(`http://172.26.209.74:5000/find-my-carrier`, input3, axiosConfig)
    .then(res => {
      const data = res.data;
      console.log(data);
      console.log(data.result);
      const labelList = [];
      data.result.map(
        (e) => 
        {
          //const newItem = e.Name;
          const newItem = e.delivery_date + ", " + e.Name + ",  $" + e.cost;
          labelList.push (newItem);
          // outputLabels.concat({newItem}); 
          // const newItems = [...outputLabels, newItem];
          // setLabels(newItems);
          //setLabels(outputLabels + [newItem]);
          console.log(newItem);
          return;
        }
        );
        setOutputLabels([labelList[0]]);
      setShipping(labelList[0]);
      console.log(selectedShipping);
    })
    setTimeout(() => {
      setPrediction(true);
      setIsLoading(false);
      onSetupSuccess();
    }, 2000);
  };
React.useEffect(()=>{
  console.log(outputLabels);
  console.log(selectedShipping)


},[outputLabels,selectedShipping])
  return (
    <Modal isOpen={isOpen} title="Ship the order" size="medium" onClose={onClose} className="relative">
      <Body as="p" className="py-16">
        <Subheading as="span">To Address: </Subheading>{to_address}
      </Body>
      <Body as="p" className="py-20 border-t border-solid border-gray-20">
        <Subheading as="span">Preferences: </Subheading>
        <Select label="Ship From" onChange={(e) => {setFromAddress(e.target.value); resetState()}}>
          <option value={""}>Select warehouse location</option>
          <option value={"id1"} selected>2972 Westheimer Rd., Santa Ana, IL 85486 </option>
          <option value={"id2"} selected>Wilshire Blvd. 3rd Floor Beverly Hills, CA 90210</option>
        </Select>
        <Select label="Package type" onChange={(e) => {setPackageType(e.target.value); resetState()}}>
          <option value={""}>Select a package type</option>
          <option value={"SMALL"} selected>small box (14" * 12" * 8") </option>
          <option value={"MEDIUM"}>medium box (16" * 14" * 10") </option>
          <option value={"LARGE"}>large box (18" * 16" * 12") </option>
          <option value={"CUSTOM"}>custom package </option>
        </Select>
        {packageType === "CUSTOM" && (
          <Body as="p" className="inline-grid grid-cols-4">
            <TextField
              label="L"
              type="number"
              defaultValue='3'
              value={`${l}`}
              onChange={(e) => setL(+e.target.value)}
              // className="w-80 mr-8"
            />

            <TextField
              label="W"
              type="number"
              defaultValue='3'
              value={`${b}`}
              onChange={(e) => setB(+e.target.value)}
              // className="w-80 mx-8"
            />

            <TextField
              label="H"
              type="number"
              defaultValue='3'
              value={`${h}`}
              onChange={(e) => setH(+e.target.value)}
              // className="w-80 mx-8"
            />

          <Select label="Unit" onChange={(e) => {setPrediction(false)}}>
                    <option value={""}> Unit </option>
                    <option value={"in"} selected> in </option>
                    <option value={"cm"}> cm </option>
          </Select>
          </Body>
        )}
        <Body as="p" className="inline-grid grid-cols-2">
          <TextField
            label="Package weight"
            type="number"
            defaultValue='3'
            value={`${weight}`}
            onChange={(e) => setWeight(+e.target.value)}
          />
          <Select label="Unit" onChange={(e) => {setPrediction(false)}}>
                      <option value={""}> Unit </option>
                      <option value={"lb"} selected> lb </option>
                      <option value={"kg"}> kg </option>
            </Select>
        </Body>
        {/* <Select label="Delivery days" onChange={(e) => {setDeliveryReq(e.target.value); resetState()}}>
          <option value={""}>Select a delivery type</option>
          <option value={"1"}> OVERNIGHT (Next day) </option>
          <option value={"2"} selected> EXPRESS (1-2 days) </option>
          <option value={"3"}> GROUND (3+ days) </option>
        </Select> */}
      </Body>
      {!predicted  && <Body as="p" className="py-16 border-t border-solid border-gray-20">
        <Button variant="primary" onClick={predictCarrierTypeLabel}>
          Find My Carrier
        </Button>
      </Body>}
      
      {loading && <Spinner className="absolute top-1/2 left-1/2" />}
      {predicted && <div className="predicted">
      <Body as="p" className="py-12 mb-8">
        <Subheading as="span">Carrier recommendations: </Subheading>
        <br></br>
        <small fontSize="1px">*prediction is based on shipping cost, OTD, traceability.</small>
      </Body>
          {/* {outputLabels.map((f) => (
            <span>
              <input
                type="radio"
                name="fruit"
                value={f}
                checked={selectedShipping === f}
                onChange={e => setShipping(e.currentTarget.value)}
              />{" "}
              {f}<br></br>
            </span>
          ))} */}
          <input
                type="radio"
                name="prediction"
                value={outputLabels[0]}
                checked={selectedShipping === outputLabels[0]}
                onChange={e => {setShipping(e.currentTarget.value); setOverride(false)}}
              />{outputLabels[0]}<br></br>
        <small fontSize="1px">(You used to choose DHL-OVERNIGHT in such cases. You are saving $24.50 with this recommendation.)</small><br/><br/>
          <input
                type="radio"
                name="other"
                value={"override"}
                checked={override == true}
                onChange={e => {setOverride(true); setShipping("override")}}
              />{"Or, do you want to choose yourself? "}
        </div> }
        {override==true && <div>
        <Select label="Carrier" onChange={(e) => {setShipping(e.currentTarget.value)}}>
                      <option value={""}> Service Type </option>
                      <option value={"FEDEX"} selected> FEDEX GROUND </option>
                      <option value={"DHL"}> DHL EXPRESS </option>
                      <option value={"USPS"}> USPS SAVER </option>
            </Select>
        </div>

        }
      {/* {predicted  &&  <Subheading as="span">Our prediction: {outputLabels}</Subheading>} */}
      {!loading && predicted  && <Body as="p" className="py-20 border-t border-solid border-gray-20">
        <Button variant="primary" onClick={resetState}>
          Buy shipping
        </Button>
      </Body>}
    </Modal>
  );
};

export default CarrierPredictor;
