import {useState} from 'react'

export default function GrievanceForm() {
    const [text, setText] = useState("")
    const [image, setImage] = useState(null)

    function submit(){
        alert("We will connect this next!")
    }

    return (
        <div>
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Describe the issue..."
            />
            <input type = "file" onChange={e => setImage(e.target.files[0])} />
            <button onClick={submit}>Submit</button>
        </div>  
    )
}