import React from 'react'

const AdminSearchResult = ({ results }) => {
  return (
    <div className="admin__searchresult-container">
        {
            results.map((result, id) => {
                return <div key={id}>{result.name}</div>
            })
        }
        {/* <div>A</div>
        <div>B</div>
        <div>C</div> */}
    </div>
  )
}
export default AdminSearchResult
