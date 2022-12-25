import React from "react";
import { Alert, Body, Button, ButtonGroup, Chip, Heading, Link } from "@seller-center/core-components";
import { Car, Location, Spark, Star, StarFill, StarHalf, Truck } from "@seller-center/icons";
import CarrierPredictor from "./CarrierPredictor";

const CURR_PRICE = 100;
const USER_ID = "abc";
const PRODUCT_ID = "xyz";
const TO_ADDRESS = "Jacob Moore, 123 Pine Ave, Bentonville, AR 72712";

const Product = () => {
  const [openPriceWatcher, togglePriceWatcher] = React.useState(false);
  const [setupSuccess, toggleSetupSuccess] = React.useState(false);

  React.useEffect(() => {
    if (setupSuccess) {
      setTimeout(() => {
        toggleSetupSuccess(false);
      }, 2000);
    }
  }, [setupSuccess]);

  return (
    <Body className="inline w-full">
      <ButtonGroup className="pt-16 pb-24 pl-80">
          {/* <Button variant="primary">Add to cart</Button> */}
          <Button variant="primary" onClick={() => togglePriceWatcher(true)}>
            Ship the order
          </Button>
        </ButtonGroup>
      <Body className="flex pl-80 center">
        <Body className="width-1/2 shadow-2 pl-20 p-20">
        <img width="10%" height="10%" src="https://i5.walmartimages.com/asr/483aaeb3-fde7-4759-85d0-bdabac966561_1.973335bfd99fa3d0d781058a4f5d8b4c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" />
        <Heading as="h1">Sterilite Plastic 35 Gallon Latch Tote Stadium Blue</Heading>
        <Body as="p">
          <StarFill />
          <StarFill />
          <StarFill />
          <StarHalf />
          <Star />
          (3.5) 179 reviews
        </Body>
        <Heading as="h2" className="py-16">
          ${CURR_PRICE}
        </Heading>
        </Body>
        <Body className="width-1/2 shadow-2 p-20">
        <Body as="p">
          <Car />
          Pickup, tomorrow at Sacramento Supercenter
        </Body>
        <Body as="p">
          <Location />
          Aisle G53
        </Body>
        <Body as="p">
          <Spark />
          Sold and shipped by <Link>Sterilite</Link>
        </Body>
        </Body>
        </Body>

        <Body className="flex pl-80 center">
        <Body className="width-1/2 shadow-2 pl-20 p-20">
        <img width="10%" height="10%" src="https://i5.walmartimages.com/asr/483aaeb3-fde7-4759-85d0-bdabac966561_1.973335bfd99fa3d0d781058a4f5d8b4c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" />
        <Heading as="h1">Sterilite Plastic 35 Gallon Latch Tote Stadium Blue</Heading>
        <Body as="p">
          <StarFill />
          <StarFill />
          <StarFill />
          <StarHalf />
          <Star />
          (3.5) 179 reviews
        </Body>
        <Heading as="h2" className="py-16">
          ${CURR_PRICE}
        </Heading>
        </Body>
        <Body className="width-1/2 shadow-2 p-20">
        <Body as="p">
          <Car />
          Pickup, tomorrow at Sacramento Supercenter
        </Body>
        <Body as="p">
          <Location />
          Aisle G53
        </Body>
        <Body as="p">
          <Spark />
          Sold and shipped by <Link>Sterilite</Link>
        </Body>
        </Body>
        </Body>
      <CarrierPredictor
        isOpen={openPriceWatcher}
        onClose={() => togglePriceWatcher(false)}
        userId={USER_ID}
        productId={PRODUCT_ID}
        currPrice={CURR_PRICE}
        to_address={TO_ADDRESS}
        onSetupSuccess={() => {
          //togglePriceWatcher(false);
          //toggleSetupSuccess(true);
        }}
        />
    </Body>
  );
};

export default Product;
