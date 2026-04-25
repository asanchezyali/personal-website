import React from 'react'

const PseudoCodeLine = ({ children, number = null, indent = 1, showNumber = true }) => {
  return (
    <div className="flex items-center">
      {showNumber && <span className="text-gray-600 dark:text-gray-400">{number}.</span>}

      <span style={{ marginLeft: `${1 * indent}rem` }}>{children}</span>
    </div>
  )
}

const PseudoCode = ({ title, children }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="w-full border-y-[1px] py-2 text-[14px] font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </div>
      <div className="w-full flex-col space-y-[-35px] border-b-[1px]">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === PseudoCodeLine) {
            return React.cloneElement(child)
          }
          return child
        })}
      </div>
    </div>
  )
}

export { PseudoCodeLine, PseudoCode }
