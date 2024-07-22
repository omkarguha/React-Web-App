import React from 'react'

const Navbar = () => {
  return (
    <div className="h-[60px] bg-white my-4 rounded-lg text-2xl font-medium flex justify-center">
      <div className="flex items-center bg-red=500 justify-center gap-2">
        <img src="firebase-color.svg" className="h-[30px]"/>
        <h1>Firebase Contact App</h1>
      </div>
    </div>
  )
}

export default Navbar;
