import React from 'react'
import { Modal, Form, Button, Input, Row, Col, message } from 'antd';
import Axios from 'axios';
import env from '../../env';
export default ({ visible, user, toggleVisible }) => {
    const [form] = Form.useForm();
    if (user.id) {
        form.setFieldsValue(user);
    } else {
        form.setFieldsValue({
            name: '',
            user: '',
            password: ''
        });
    }
    const onFinish = (data) => {
        const { post, put } = Axios;
        data.type = 'ADMIN';
        if (user && !user.id) {
            debugger
            post(`${env.localhost}users`, data).then(() => {
                message.success('User created!');
            })
        } else {
            put(`${env.localhost}users/${user.id}`, data).then(() => {
                message.success('User created!');
            })
        }
    }
    return (
        <Modal
            title="User"
            visible={visible}
            onCancel={toggleVisible}
            footer={<></>}
        >
            <Form name="control-ref" onFinish={onFinish} form={form}  >
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input value={'123'} />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item name="user" label="User" rules={[{ required: true }]}>
                            <Input value={user.user} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                            <Input type="password" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row align="end">
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                </Button>
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    )
}
