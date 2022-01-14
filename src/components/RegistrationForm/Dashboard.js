import { Fragment, useEffect } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { clearState, fetchUserBytoken, userSelector } from "../../store/userSlice"

const Dashboard = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { isFetching, isError } = useSelector(userSelector)
  useEffect(() => {
    dispatch(fetchUserBytoken({ token: localStorage.getItem("token") }))
  }, [])
  const { username, email } = useSelector(userSelector)
  useEffect(() => {
    if (isError) {
      dispatch(clearState())
      history.push("/login")
    }
  }, [isError])
  const onLogOut = () => {
    localStorage.removeItem("token")
    history.push("/login")
  }
  return (
    <div className="container mx-auto">
      {isFetching ? (
        <LoaderIcon type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>
          <div className="container mx-auto">
            Welcome back <h3>{username}</h3>
          </div>
          <button
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </Fragment>
      )}
    </div>
  )
}
export default Dashboard