import Image from "next/image"
import React from "react";

const Logo = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className}) => {
  return (
    <div className={className}>
      <Image src="/images/logo.png" alt="logo" width={75} height={75} className="w-full h-auto"/>
    </div>
  )
});
Logo.displayName = "Logo";

export default Logo;