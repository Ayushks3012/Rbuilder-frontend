import { Button, Divider, Stack, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { RiFileDownloadLine } from 'react-icons/ri'
import { FaHistory } from 'react-icons/fa'
import Edit from './Edit'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { addResumeHistoryAPI } from '../services/allAPIs'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Preview = ({ formData, setFormData }) => {
  const [resumeId, setResumeId] = useState('')
  const { personalData, education, experience, skills, summary } = formData

  const [downloadStatus, setDownloadStatus] = useState(false)
  const [updateData, setUpdateData] = useState(false)

  const downloadPDF = async () => {
    const input = document.getElementById('result')
    const canvas = await html2canvas(input, { scale: 2 })
    const imgdata = canvas.toDataURL('image/png')

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgdata, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('resume.pdf')

    try {
      const result = await addResumeHistoryAPI(formData)
      setResumeId(result.data.id)
      setDownloadStatus(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateData = (data) => {
    setUpdateData(data)
  }

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
      >
        {downloadStatus ? (
          <Stack direction="row">
            <Button onClick={downloadPDF}>
              <RiFileDownloadLine className="fs-3" />
            </Button>
            <Edit resumeId={resumeId} onUpdate={handleUpdateData} />
            <Link to="/history">
              <Button>
                <FaHistory className="fs-3" />
              </Button>
            </Link>
          </Stack>
        ) : (
          <Button onClick={downloadPDF}>
            <RiFileDownloadLine className="fs-3" />
          </Button>
        )}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 700,
            height: 700,
            p: 5,
            mt: 5,
            borderRadius: 2,
          },
        }}
      >
        <Paper elevation={7} id="result">
          <Typography variant="h3" component="h2" align="center">
            {updateData ? updateData.personalData.name : personalData.name}
          </Typography>

          <Typography variant="subtitle1" color="#659bf8ff" align="center">
            {personalData.jobTitle}
          </Typography>
          <Typography variant="body2" align="center" mb={3}>
            {personalData.email} | {personalData.phoneNumber} | {personalData.location}
          </Typography>
          <Typography variant="body2" align="center" mb={3}>
            <a href={personalData.gitHub} target="_blank" rel="noreferrer">GitHub</a> |{" "}
            <a href={personalData.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a> |{" "}
            <a href={personalData.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
          </Typography>

          {/* Summary */}
          <Divider>Summary</Divider>
          <Typography mb={3}>{summary}</Typography>

          {/* Education */}
          <Divider>Education</Divider>
          <Typography variant="h6" align="center">
            {education.course}
          </Typography>
          <Typography variant="body2" mb={4} align="center">
            {education.college} | {education.university} | {education.year}
          </Typography>

          {/* Experience */}
          <Divider>Professional Experience</Divider>
          <Typography variant="h6" align="center">
            {experience.jobRole}
          </Typography>
          <Typography variant="body2" mb={4} align="center">
            {experience.company} | {experience.location} | {experience.duration}
          </Typography>

          {/* Skills */}
          <Divider>Skills</Divider>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            sx={{ flexWrap: 'wrap' }}
            spacing={{ xs: 1, sm: 2 }}
          >
            {skills.map((item, index) => (
              <div key={index} className="mt-3">
                <Button variant="contained">{item}</Button>
              </div>
            ))}
          </Stack>
        </Paper>
      </Box>
    </div>
  )
}

export default Preview
