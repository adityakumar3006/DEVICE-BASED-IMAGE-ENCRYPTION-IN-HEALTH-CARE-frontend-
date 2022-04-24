import logo from './logo.svg';
import './App.css';
import 'axios';
// import 'fomantic-ui-css/semantic.css';

import { Button, Dimmer, Dropdown, Form, Header, Icon, Input, Loader, Segment } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
const toBlobURL = require('stream-to-blob-url')


const options = [
  {
    key : 1,
    value : 1,
    text : "Encryption"
  },
  {
    key : 2,
    value : 2,
    text : "Decryption"
  }
]

const API_URL = "http://localhost:5000/"

function App() {
  const [loading, setLoading] = useState(false)
  const [operation, setOperation] = useState(false)
  const [ext, setExt] = useState(false)
  const [src, setsrc] = useState("")

  const handleValues = async (syn) => {
    setLoading(true);
    const form = new FormData(syn.target);
    
    axios.post(API_URL + 'submit', form).then(async response => {
      console.log(response)

      if(operation == 1){
        if(response.data == "Success"){
          alert("File sent successfully!")
        }else{
          alert("Could not send file, please try again later.")
        }
      }else{
        setsrc(API_URL + response.data);

        // var link = document.createElement('a');
        // link.href = API_URL + response.data;
        // link.download = 'Download.' + ext;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        
      }
      setLoading(false)
    })
  }

  const checkFile = (a, b) => {
    const b_arr = b.value.split('.');
    const ext = b_arr[b_arr.length-1]
    setExt(ext)
  }

  return (
    <div className="App">
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>

      <div className='dialog-container'>
        <Segment raised className='dialog' padded >
          <Header>
            Choose an operation
          </Header>
          {/* <Form onSubmit={handleValues} action={API_URL} method="POST" enctype="multipart/form-data"> */}
          <Form onSubmit={handleValues}>

            <Dropdown 
            placeholder='Please select an Operation'
            fluid
            selection
            options={options}
            onChange={(s, d) => setOperation(d.value)}
            name="choose"
            />
            <Input type='hidden' name="choose" value={operation} ></Input>
            <br></br>
            <Input type='password'  placeholder="Enter Encryption key" name="id" />
            <Input fluid type='file' onChange={checkFile} placeholder="Enter Image File" name="image_file" />

            {operation == 1 && 
              <>
              <br></br>
            <Input required fluid placeholder="Enter your Name" name="name" />
            <Input required fluid placeholder="Enter your E-mail" name="email" />
            </>
            }
            <br></br>
            {!src && 
            <Button primary loading={loading} disabled={!operation} type='submit'>
              <Icon name='key'></Icon>
              {operation ? operation == 1 ? "Send E-mail" : "Decrypt" : "Choose an option"}
            </Button>
            }
          </Form>
          <img src={src} />
          <br></br>
          
          </Segment>
      </div>
    </div>
  );
}

export default App;
