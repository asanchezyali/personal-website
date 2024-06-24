export default function MathBox({ title, children, variant }) {
  const variants = {
    info: 'border-blue-500',
    warning: 'border-yellow-500',
    danger: 'border-red-500',
    success: 'border-green-500',
    theorem: 'border-purple-500',
    definition: 'border-indigo-500',
    remark: 'border-pink-500',
  }
  return (
    <div
      className={`flex w-full flex-col rounded-[4px] border-l-2 border-solid bg-gray-800 ${variants[variant]}`}
    >
      <div className="w-full bg-gray-800 py-2 pl-4 text-lg font-semibold">{title}</div>
      <div className="w-full bg-gray-900 px-4">{children}</div>
    </div>
  )
}
