import React from "react"

const Accordion = () => {

  return (
    <>
    <button className="col-span-4 group border-black focus:outline-none">
			<div className="flex items-center justify-between h-12 px-3 font-semibold hover:bg-gray-200">
				<span className="truncate">1 thomas barreto 5 $400</span>
				<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
				</svg>
			</div>
			<div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-40">
				<a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item A</a>
				<a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item B</a>
				<a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item C</a>
			</div>
		</button>
  </>
  )
}



export default Accordion