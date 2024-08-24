import React from 'react'

const Header = ({ toggleModal, nbOfEmployees }) => {
  return (
    <header className='header'>
        <div className='container'>
            <h3>Employee List ({nbOfEmployees})</h3>
            <button onClick={() => toggleModal(true)} className='btn'>
                <i className='bi bi-plus-square'></i> Add New Employee
            </button>
        </div>
    </header>
  )
}

export default Header