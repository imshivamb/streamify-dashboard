import Image from "next/image";
import React from "react";

const HeaderLogo = () => {
  return (
    <div className="flex flex-col items-center text-center mb-16">
      <Image src="/streamify.svg" alt="logo" width={100} height={70} />
      <h1 className="text-4xl font-bold tracking-tight ">streamify</h1>
    </div>
  );
};

export default HeaderLogo;
