import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/material'
import { useState } from 'react'
import { addResumeAPI } from '../services/allAPIs'
import Swal from 'sweetalert2'

const steps = [
  'Basic Information',
  'Contact Details',
  'Education Details',
  'Work Experience',
  'Skills & Certification',
  'Review & Submit',
]

const Steps = ({ formData, setFormData, setIsFinished }) => {
  const { personalData, education, experience, skills, summary } = formData

  const [inputSkill, setInputSkill] = useState('')
  const suggestions = ['React', 'Angular', 'MongoDb', 'NodeJS']

  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  const isStepOptional = (step) => step === 1
  const isStepSkipped = (step) => skipped.has(step)

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => setActiveStep(0)

  // step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <h3>Personal Details</h3>
            <div className="d-flex row p-3">
              <TextField
                label="Full name"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalData: {
                      ...formData.personalData,
                      name: e.target.value,
                    },
                  })
                }
                value={formData.personalData.name}
              />
              <TextField
                label="Job title"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalData: {
                      ...formData.personalData,
                      jobTitle: e.target.value,
                    },
                  })
                }
                value={formData.personalData.jobTitle}
              />
              <TextField
                label="Location"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalData: {
                      ...formData.personalData,
                      location: e.target.value,
                    },
                  })
                }
                value={formData.personalData.location}
              />
            </div>
          </div>
        )
      case 1:
        return (
          <div>
            <h3>Contact Details</h3>
            <div className="d-flex row p-3">
              <TextField
                label="Email"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalData: {
                      ...formData.personalData,
                      email: e.target.value,
                    },
                  })
                }
                value={formData.personalData.email}
              />
              <TextField
                label="Phone Number"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalData: {
                      ...formData.personalData,
                      phoneNumber: e.target.value,
                    },
                  })
                }
                value={formData.personalData.phoneNumber}
              />
              <TextField
                label="Github Profile Link"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalData: {
                      ...formData.personalData,
                      gitHub: e.target.value,
                    },
                  })
                }
                value={formData.personalData.gitHub}
              />
              <TextField
                label="LinkedIn Profile Link"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalData: {
                      ...formData.personalData,
                      linkedIn: e.target.value,
                    },
                  })
                }
                value={formData.personalData.linkedIn}
              />
              <TextField
                label="Portfolio Link"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalData: {
                      ...formData.personalData,
                      portfolio: e.target.value,
                    },
                  })
                }
                value={formData.personalData.portfolio}
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h3>Education Details</h3>
            <div className="d-flex row p-3">
              <TextField
                label="Course Name"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: {
                      ...formData.education,
                      course: e.target.value,
                    },
                  })
                }
                value={formData.education.course}
              />
              <TextField
                label="College Name"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: {
                      ...formData.education,
                      college: e.target.value,
                    },
                  })
                }
                value={formData.education.college}
              />
              <TextField
                label="University"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: {
                      ...formData.education,
                      university: e.target.value,
                    },
                  })
                }
                value={formData.education.university}
              />
              <TextField
                label="Year of Passing"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: {
                      ...formData.education,
                      year: e.target.value,
                    },
                  })
                }
                value={formData.education.year}
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <h3>Professional Details</h3>
            <div className="d-flex row p-3">
              <TextField
                label="Job or Internship"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: {
                      ...formData.experience,
                      jobRole: e.target.value,
                    },
                  })
                }
                value={formData.experience.jobRole}
              />
              <TextField
                label="Company Name"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: {
                      ...formData.experience,
                      company: e.target.value,
                    },
                  })
                }
                value={formData.experience.company}
              />
              <TextField
                label="Location"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: {
                      ...formData.experience,
                      location: e.target.value,
                    },
                  })
                }
                value={formData.experience.location}
              />
              <TextField
                label="Duration"
                variant="standard"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: {
                      ...formData.experience,
                      duration: e.target.value,
                    },
                  })
                }
                value={formData.experience.duration}
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <h3>Skills</h3>
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <TextField
                  label="Add Skill"
                  variant="standard"
                  onChange={(e) => setInputSkill(e.target.value)}
                  value={inputSkill}
                />
                <Button
                  onClick={() => addSkill(inputSkill)}
                  variant="text"
                  sx={{ maxWidth: '40px' }}
                >
                  Add
                </Button>
              </Stack>
              <div>
                <h5>Suggestions: </h5>
                {suggestions.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => addSkill(item)}
                    variant="outlined"
                    size="small"
                    className="me-3 my-4"
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div>
                <h5>Added Skills :</h5>
                {skills.length > 0 &&
                  skills.map((item, index) => (
                    <span key={index} className="btn btn-primary me-3 mt-2">
                      {item}{' '}
                      <button
                        onClick={() => handleRemoveSkill(item)}
                        className="btn text-light"
                      >
                        X
                      </button>
                    </span>
                  ))}
              </div>
            </Box>
          </div>
        )
      case 5:
        return (
          <div>
            <h3>Professional Summary</h3>
            <div className="d-flex row p-3">
              <TextField
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                value={formData.summary}
                label="Write a short summary about yourself"
                multiline
                rows={4}
                defaultValue="I'm a professional full_stack Developer with hands on experience in React,Node,..."
                variant="standard"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const addSkill = (skill) => {
    if (!skill.trim()) return
    if (formData.skills.includes(skill)) {
      alert('Skill already exists')
    } else {
      setFormData((data) => ({ ...data, skills: [...data.skills, skill] }))
      setInputSkill('')
    }
  }

  const handleAddresume = async () => {
    try {
      const result = await addResumeAPI(formData)
      console.log(result)
      Swal.fire({
        title: 'Success',
        text: 'Resume Created Successfully',
        icon: 'success',
        confirmButtonText: 'Back',
      })
      setIsFinished(true)
    } catch (err) {
      console.log('Error' + err)
    }
  }

  const handleRemoveSkill = (item) => {
    setFormData({
      ...formData,
      skills: skills.filter((skill) => skill !== item),
    })
  }

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {}
            const labelProps = {}
            if (isStepSkipped(index)) {
              stepProps.completed = false
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box>{renderStepContent(activeStep)}</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button onClick={handleAddresume}>Finish</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  )
}

export default Steps
