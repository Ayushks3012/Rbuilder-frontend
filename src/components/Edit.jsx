import { RiFileEditLine } from 'react-icons/ri'
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import { updateHistoryAPI, getResumeHistoryAPI } from '../services/allAPIs'
import Swal from 'sweetalert2'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Edit = ({ resumeId, onUpdate }) => {
  const [resumeDetails, setResumeDetails] = useState({
    personalData: {
      name: '',
      jobTitle: '',
      location: '',
      email: '',
      phoneNumber: '',
      gitHub: '',
      linkedIn: '',
      portfolio: '',
    },
    education: {
      course: '',
      college: '',
      university: '',
      year: '',
    },
    experience: {
      jobRole: '',
      company: '',
      location: '',
      duration: '',
    },
    skills: [],
    summary: '',
  })

  const [open, setOpen] = useState(false)
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    if (resumeId) getResume()
  }, [resumeId])

  const getResume = async () => {
    try {
      const result = await getResumeHistoryAPI(resumeId)
      setResumeDetails(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateResume = async () => {
    try {
      const result = await updateHistoryAPI(resumeId, resumeDetails)
      if (result.status === 200) {
        Swal.fire('Success!', 'Resume updated successfully', 'success')
        setOpen(false)
        onUpdate(result.data)
      } else {
        Swal.fire('Error!', 'Failed to update resume', 'error')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddSkill = () => {
    if (newSkill) {
      setResumeDetails((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }))
      setNewSkill('')
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <RiFileEditLine className="fs-3" />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6">Edit Details</Typography>

          {/* Personal Details */}
          <h3>Personal Details</h3>
          <div className="d-flex row p-3">
            <TextField
              label="Full name"
              variant="standard"
              value={resumeDetails.personalData.name}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  personalData: {
                    ...resumeDetails.personalData,
                    name: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Job title"
              variant="standard"
              value={resumeDetails.personalData.jobTitle}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  personalData: {
                    ...resumeDetails.personalData,
                    jobTitle: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Location"
              variant="standard"
              value={resumeDetails.personalData.location}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  personalData: {
                    ...resumeDetails.personalData,
                    location: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* Contact Details */}
          <h3>Contact Details</h3>
          <div className="d-flex row p-3">
            <TextField
              label="Email"
              variant="standard"
              value={resumeDetails.personalData.email}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  personalData: {
                    ...resumeDetails.personalData,
                    email: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Phone Number"
              variant="standard"
              value={resumeDetails.personalData.phoneNumber}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  personalData: {
                    ...resumeDetails.personalData,
                    phoneNumber: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Github Profile Link"
              variant="standard"
              value={resumeDetails.personalData.gitHub}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  personalData: {
                    ...resumeDetails.personalData,
                    gitHub: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="LinkedIn Profile Link"
              variant="standard"
              value={resumeDetails.personalData.linkedIn}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  personalData: {
                    ...resumeDetails.personalData,
                    linkedIn: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Portfolio Link"
              variant="standard"
              value={resumeDetails.personalData.portfolio}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  personalData: {
                    ...resumeDetails.personalData,
                    portfolio: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* Education */}
          <h3>Education Details</h3>
          <div className="d-flex row p-3">
            <TextField
              label="Course Name"
              variant="standard"
              value={resumeDetails.education.course}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  education: {
                    ...resumeDetails.education,
                    course: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="College Name"
              variant="standard"
              value={resumeDetails.education.college}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  education: {
                    ...resumeDetails.education,
                    college: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="University"
              variant="standard"
              value={resumeDetails.education.university}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  education: {
                    ...resumeDetails.education,
                    university: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Year of Passing"
              variant="standard"
              value={resumeDetails.education.year}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  education: {
                    ...resumeDetails.education,
                    year: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* Experience */}
          <h3>Professional Details</h3>
          <div className="d-flex row p-3">
            <TextField
              label="Job or Internship"
              variant="standard"
              value={resumeDetails.experience.jobRole}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  experience: {
                    ...resumeDetails.experience,
                    jobRole: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Company Name"
              variant="standard"
              value={resumeDetails.experience.company}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  experience: {
                    ...resumeDetails.experience,
                    company: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Location"
              variant="standard"
              value={resumeDetails.experience.location}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  experience: {
                    ...resumeDetails.experience,
                    location: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Duration"
              variant="standard"
              value={resumeDetails.experience.duration}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  experience: {
                    ...resumeDetails.experience,
                    duration: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* Skills */}
          <h3>Skills</h3>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <TextField
                label="Add Skill"
                variant="standard"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button variant="text" onClick={handleAddSkill}>
                Add
              </Button>
            </Stack>
            <div>
              <h5>Selected: </h5>
              {resumeDetails.skills.map((item, index) => (
                <Button key={index} variant="outlined" size="small">
                  {item}
                </Button>
              ))}
            </div>
          </Box>

          {/* Summary */}
          <h3>Professional Summary</h3>
          <div className="d-flex row p-3">
            <TextField
              label="Write a short summary about yourself"
              multiline
              rows={4}
              variant="standard"
              value={resumeDetails.summary}
              onChange={(e) =>
                setResumeDetails({
                  ...resumeDetails,
                  summary: e.target.value,
                })
              }
            />
          </div>

          <Button onClick={updateResume}>Update</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default Edit
