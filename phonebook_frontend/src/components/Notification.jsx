const Notification = ({ message }) => {
  const successStyle = {
    color: "green",
    background: "lightgrey",
    border: "3px solid green",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "15px"
  }

  const errorStyle = {
    ...successStyle,
    color: "red",
    border: "3px solid red"
  }

  if (message === null) {
    return null
  }

  const notificationStyle =
    message.style === "success" ? successStyle : errorStyle

  return (
    <div style={notificationStyle}>{message.text}</div>
  )
}

export default Notification

