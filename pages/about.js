import toast from "react-hot-toast"
function about() {
  return (
    <div>
      <h1>about</h1>
      <button onClick={()=> toast.success('nice to meet you!')}>
        Press this
      </button>
    </div>
  )
}

export default about