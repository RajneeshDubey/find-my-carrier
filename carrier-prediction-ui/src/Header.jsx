import * as React from "react";
import { Body, Link, TextField } from "@seller-center/core-components";
import { Cart, Grid, Search, User } from "@seller-center/icons";

const Header = () => {
  return (
    <>
    <Body className="px-40 py-20 w-screen flex justify-between bg-blue-80 bg-top">
    
      {/* <Body className="px-40 py-20 w-screen flex justify-between bg-blue-80"> */}
        <Body as="span" className="w-1/8 text-white">
          <Grid />
          Departments
        </Body>
        <Body as="span" className="w-1/16 text-white mr-8">
          <Grid />
          My Items
        </Body>
        {/* <Body as="span" className="w-1/2 text-white relative">
          <TextField
            placeholder="Search everything at Walmart online and in store"
            label={null}
            onChange={null}
          />
          <Search className="absolute right-8 top-1/2 text-black" />
        </Body> */}
        <Body as="span" className="w-1/16 text-white mr-8">
          <Cart />
          Cart
        </Body>
        <Body as="span" className="w-1/16 text-white mr-8">
          <User />
          Sign In
        </Body>
      </Body>
      <Body className="px-40 py-8 w-screen flex justify-between bg-blue-deep">
      {/* <Body className="px-40 py-8 w-screen flex justify-between bg-blue-140"> */}
        <Link className="text-white">Product Catalog</Link>
        <Link className="text-white">Order Management</Link>
        <Link className="text-white">Analytics</Link>
        <Link className="text-white">WFS</Link>
        {/* <Link className="text-white">Baby</Link>
        <Link className="text-white">Deals</Link>
        <Link className="text-white">Flash Picks</Link>
        <Link className="text-white">Walmart+</Link> */}
      </Body>
    </>
  );
};

export default Header;
