import React, { useState } from 'react'
import Table from './Table';
import { Row, Button } from 'antd';
import Modal from './Modal';

export default () => {
    const [visible, setVisible] = useState(false);
    const [periodSelected, setPeriodSelected] = useState({});

    const toggleVisible = () => {
        setVisible(!visible);
    }
    const selectPeriod = (period) => {
        setPeriodSelected(period);
        toggleVisible();
    }
    return (
        <div>
            <Modal visible={visible} toggleVisible={toggleVisible} period={periodSelected} />
            <Row align="end">
                <Button type="primary" style={styles.Button} onClick={() => selectPeriod({})}>Create new</Button>
            </Row>
            <Table selectPeriod={selectPeriod} />
        </div>
    )
}
const styles = {
    Button: {
        margin: 5
    }
}