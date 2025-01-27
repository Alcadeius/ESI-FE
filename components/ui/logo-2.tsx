import Image from "next/image"
import React from "react";

const Logo = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className}) => {
  return (
    <div className={className}>
      <Image src="/images/bordered_logo-1.png" alt="logo" width={75} height={75}/>
    </div>
  )
});
Logo.displayName = "Logo";

export default Logo;