const Filter = ({ filterString, filterNames }) => {
  return (
    <div>
      filter shown with <input value={filterString} onChange={filterNames}/>
    </div>
  )
}

export default Filter

