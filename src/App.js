import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Name from './components/Name';
import List from './components/List';
import { Input, Button, Row, Col } from 'antd';
import './App.css';

const App = () => {
  const [names, setNames] = useState([]);
  const [name, setName] = useState('');
  const [index, setIndex] = useState(null);

 
  function getNames() {
      axios
      .get('http://localhost:3001/students')
      .then(response => {
        setNames(response.data);
      })
  }
  useEffect(() => {
    if (!names.length) {
      getNames();
    }
  });
  function addName() {
    if (index === null) {
      axios
      .post('http://localhost:3001/students', {
        name: name
      })
      .then(response => {
        getNames();
      })
    } else {
      // name !== '' && names.indexOf(name) === -1
      names[index] = name;
      setNames([...names]);
      setIndex(null);
      setName('');
    }
  }
  function removeName(name) {
    const newNames = names.filter(n => n !== name);
    setNames(newNames);
  }
  function editName(name) {
    // Index 0,1 ['Ernesto', 'Cedano']
    const index = names.indexOf(name);
    // Guardar index en el estado
    setIndex(index);
     // names[index] names[1]
    setName(names[index]);
  }

  return (
    <div className="App">
      <Row justify="center" gutter={10}>
        <Col>
          <Input
            value={name}
            onChange={e => setName(e.target.value)} placeholder="Ingrese un nombre"/>
        </Col>
        <Col>
          <Button onClick={() => addName()} type="primary">Guardar</Button>
        </Col>
      </Row>
       {/*{names.map(name => <Name value={name} removeName={removeName}/>)} */}
      <List
        data={names}
        removeName={removeName}
        editName={editName}
        />

    </div>
  );
}

export default App;
