import Image from "next/image"
import React from "react";

const Logo = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className}) => {
  return (
    <div className={className}>
      <Image src="/images/bordered_logo-1.png" alt="logo" width={500} height={500}/>
    </div>
  )
});
Logo.displayName = "Logo";

export default Logo;