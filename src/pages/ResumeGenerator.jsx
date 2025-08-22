import React from 'react'
import { FaFileAlt, FaFileDownload } from 'react-icons/fa'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const ResumeGenerator = () => {
  return (
    <div>
      <div className="row my-5 d-flex justify-content-evenly">
        <h3 className="text-center my-5">
          Create a job-winning Resume in minutes
        </h3>

        <div className="col-4 border shadow p-5 text-center">
          <FaFileAlt className="fs-1 my-3 text-primary" />
          <h4>Add your information</h4>
          <p>Add pre-written examples to each section</p>
          <h5>Step 1</h5>
        </div>

        <div className="col-4 border shadow p-5 text-center">
          <FaFileDownload className="fs-1 my-3 text-danger" />
          <h4>Download your Resume</h4>
          <p>Download and start applying</p>
          <h5>Step 2</h5>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-5">
        <Link to="/form" style={{ textDecoration: 'none' }}>
          <Button 
            variant="contained" 
            sx={{ backgroundColor: 'rgb(53,4,99)', '&:hover': { backgroundColor: 'rgb(40,3,75)' } }}
          >
            Let's Start
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ResumeGenerator
