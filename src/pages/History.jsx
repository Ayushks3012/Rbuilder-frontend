import { Button, Divider, Stack, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import React, { useState, useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { RiFileEditLine } from 'react-icons/ri'
import { deleteResumeHistoryAPI, getResumeHistoryAPI } from '../services/allAPIs'

const History = () => {
  const [history, setHistory] = useState([])

  const getHistory = async () => {
    try {
      const result = await getResumeHistoryAPI()
      if (result?.data) {
        setHistory(result.data)
      } else {
        setHistory([])
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getHistory()
  }, [])

  const deleteHistory = async (id) => {
    try {
      await deleteResumeHistoryAPI(id)
      getHistory()
    } catch (err) {
      console.error(err)
    }
  }

  //  Edit handler (can later navigate to form with data)
  const editHistory = (item) => {
    console.log("Edit resume:", item)  
    // later can push data to form context or navigate
  }

  return (
    <div>
      <Typography variant="h4" my={3} align="center">
        Resume Downloaded History
      </Typography>
      <Stack
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
      >
        {history.length > 0 ? (
          history.map((item, index) => (
            <Paper key={index} elevation={7} sx={{ width: 400, p: 5, m: 3, position: 'relative' }}>
              
              {/* Edit Icon */}
              <Button sx={{ position: 'absolute', top: 10, left: 10 }}>
                <RiFileEditLine
                  onClick={() => editHistory(item)}
                  color="blue"
                  fontSize="24px"
                />
              </Button>

              {/* Delete Icon */}
              <Button sx={{ position: 'absolute', top: 10, right: 10 }}>
                <MdDelete
                  onClick={() => deleteHistory(item.id || item._id)}
                  color="red"
                  fontSize="24px"
                />
              </Button>

              <Typography variant="h6" align="center">
                {item?.personalData?.name}
              </Typography>
              <Typography variant="subtitle1" color="#659bf8ff" align="center">
                {item?.experience?.jobRole}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6" align="center">
                {item?.education?.course}
              </Typography>
              <Typography variant="body2" mb={4} align="center">
                {item?.education?.college} | {item?.education?.university} |{' '}
                {item?.education?.year}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" align="center">
            No history
          </Typography>
        )}
      </Stack>
    </div>
  )
}

export default History
