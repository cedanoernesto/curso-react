import React, { useState } from 'react'
import Table from './Table';
import { Row, Button } from 'antd';
import Modal from './Modal';

export default () => {
    const [visible, setVisible] = useState(false);
    const [userSelected, setUserSelected] = useState({});

    const toggleVisible = () => {
        setVisible(!visible);
    }
    const selectUser = (user) => {
        setUserSelected(user);
        toggleVisible();
    }
    return (
        <div>
            <Modal visible={visible} toggleVisible={toggleVisible} user={userSelected}/>
            <Row align="end">
                <Button type="primary" style={styles.Button} onClick={() => selectUser({})}>Create new</Button>
            </Row>
            <Table selectUser={selectUser}/>
        </div>
    )
}
const styles = {
    Button: {
        margin: 5
    }
}
