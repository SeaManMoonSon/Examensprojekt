import React from 'react'

// styles
import '../../sass/style.scss'

const AdminSearchResultList = ({ results }) => {
  return (
    <div className="admin__searchresult-container">
        {
            results.map((result, id) => {
                return <div className="admin-searchresult-name" key={id}>{result.name}</div>
            })
        }
        {/* <div>A</div>
        <div>B</div>
        <div>C</div> */}
    </div>
  )
}
export default AdminSearchResultList
