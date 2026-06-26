import { ReactNode } from 'react'

interface TableWrapperProps {
  children: ReactNode
}

const TableWrapper = ({ children }: TableWrapperProps) => {
  return (
    <div className="table-wrap w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper
