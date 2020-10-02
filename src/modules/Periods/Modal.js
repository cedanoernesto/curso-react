import React, { useState } from 'react'
import { Modal, Form, Button, Input, Row, Select, message, DatePicker, Col } from 'antd';
import Axios from 'axios';
import env from '../../env';
import moment from 'moment';
export default ({ visible, period, toggleVisible }) => {

    const { Option } = Select;
    const [schoolSelected, setSchoolSelected] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [form] = Form.useForm();
    const [valPeriod, setValPeriod] = useState('');
    const [opciones, setOpciones] = useState(['']);
    const [valNewPeriod, setValNewPeriod] = useState(false);
    const [opcionDefault, setOpcionDefault] = useState('');

    if (period.id !== valPeriod) {
        Axios.get(`${env.localhost}schools`).then((response) => {
            if (response.data) {
                const data = Array.from(response.data)
                setOpciones(data);

            }
        })

        form.setFieldsValue({ ...period, start: moment(period.start), end: moment(period.end) });
        setStartDate(moment(period.start).format("YYYY-MM-DD"));
        setEndDate(moment(period.end).format("YYYY-MM-DD"));
        setValPeriod(period.id);
        setValNewPeriod(false);
        setOpcionDefault(toString(period.school));


    } else if (!period.id && valNewPeriod === false) {
        form.setFieldsValue({
            type: '',
            start: '',
            end: '',
            text: '',
            school: ''
        });
        setValNewPeriod(true);
    }

    function onChangeSchool(value) {
        const school = { value }
        setSchoolSelected(school);
    }

    function onchangeStartDate(date) {
        setStartDate(date.format("YYYY-MM-DD"));
        //console.log(date.format("YYYY-MM-DD"));
        //debugger
    }

    function onchangeEndDate(date) {
        setEndDate(date.format("YYYY-MM-DD"));
    }



    const onFinish = (data) => {
        const { post, put } = Axios;
        if (period && !period.id) {
            debugger
            post(`${env.localhost}periods`, { ...data, start: startDate, end: endDate, school: schoolSelected }).then(() => {
                message.success('Period created!');
            })
            setValNewPeriod(false);
        } else {
            put(`${env.localhost}periods/${period.id}`, { ...data, start: startDate, end: endDate, school: schoolSelected }).then(() => {
                message.success('Period created!');
            })

        }
    }





    return (
        <Modal
            title="Period"
            visible={visible}
            onCancel={toggleVisible}
            footer={<></>}
        >
            <Form name="control-ref" onFinish={onFinish} form={form}  >
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Input placeholder="Write a period" value={period.type} />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item name="start" label="Start Date" rules={[{ required: true }]}>
                            <DatePicker allowClear={false} onChange={onchangeStartDate} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <Form.Item name="end" label="End Date" rules={[{ required: true }]}>
                            <DatePicker allowClear={false} onChange={onchangeEndDate} />
                        </Form.Item>
                    </Col>
                </Row>


                <Form.Item name="text" label="Text" rules={[{ required: true }]}>
                    <Input.TextArea placeholder="Write a text" value={period.text} />
                </Form.Item>

                <Form.Item name="school" label="School">
                    <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Select a school"
                        optionFilterProp="children"
                        onChange={onChangeSchool}
                        value={opcionDefault}

                    >
                        {opciones.map((opcion) => (
                            <option key={opcion.id} value={opcion.name}>{opcion.name} </option>
                        ))}

                    </Select>,
                </Form.Item>

                <Row align="end">
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                </Button>
                    </Form.Item>
                </Row>
            </Form>
        </Modal >
    )
}
