import { List, X } from 'lucide-react'
import useSidebarStore from './store'

const Button = () => {
  const { sidebarOpen, toggleSidebar } = useSidebarStore()

  return (
    <div className="fixed bottom-32 right-4 sm:right-8">
      <button
        onClick={toggleSidebar}
        className="rounded-full bg-gray-200 p-2 text-gray-500 opacity-100 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        {sidebarOpen ? (
          <X className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
        ) : (
          <List className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
        )}
      </button>
    </div>
  )
}

export default Button
