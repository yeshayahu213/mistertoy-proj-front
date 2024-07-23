import { useEffect, useState } from 'react'

export function ToySort({ sortBy, onSetSort }) {
  const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

  useEffect(() => {
    onSetSort(sortByToEdit)
  }, [sortByToEdit])

  function handleChange({ target }) {
    const field = target.name
    console.log(field)
    const value = target.type === 'number' ? +target.value : target.value
    setSortByToEdit(prevSort => ({
      ...prevSort,
      [field]: field === 'desc' ? !prevSort.desc : value,
    }))
  }

  return (
    <form className="toy-sort">
      <select name="type" value={sortByToEdit.type} onChange={handleChange}>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
      <label>
        <input
          type="checkbox"
          name="desc"
          checked={sortByToEdit.desc}
          onChange={handleChange}
        />
        Descending
      </label>
    </form>
  )
}
