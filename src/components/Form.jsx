import { useState } from "react"
import Steps from "./Steps"
import Preview from "./Preview"

const Form = () => {
  const [formData, setFormData] = useState({
    personalData: {
      name: "",
      jobTitle: "",
      location: "",
      email: "",
      phoneNumber: "",
      gitHub: "",
      linkedIn: "",
      portfolio: "",
    },
    education: {
      course: "",
      college: "",
      university: "",
      year: "",
    },
    experience: {
      jobRole: "",
      company: "",
      location: "",
      duration: "",
    },
    skills: [],
    summary: "",
  })

  const [isFinished, setIsFinished] = useState(false)

  return (
    <div className="row p-5">
      {isFinished ? (
        <div className="col-12 d-flex justify-content-center">
          <div className="col-6">
            <Preview formData={formData} setFormData={setFormData} />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-6">
            <Steps
              formData={formData}
              setFormData={setFormData}
              setIsFinished={setIsFinished}
            />
          </div>
          <div className="col-6">
            <Preview formData={formData} setFormData={setFormData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Form
