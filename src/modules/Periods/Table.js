import React, { useState, useEffect } from 'react';
import { Space, Table, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Axios from 'axios';
import env from '../../env';


export default ({ selectPeriod }) => {
    const [data, setData] = useState(null);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Start date',
            dataIndex: 'start',
            key: 'start',
        },
        {
            title: 'End date',
            dataIndex: 'end',
            key: 'end',
        },
        {
            title: 'Text',
            key: 'text',
            dataIndex: 'text',
        },
        {
            title: 'School',
            key: 'school',
            dataIndex: 'school.value',
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <DeleteButton period={record} />
                    <a onClick={() => selectPeriod(record)}>
                        <EditOutlined style={{ fontSize: 18 }} />
                    </a>
                </Space>
            ),
        },
    ];

    const getPeriods = () => {
        if (!data) {
            Axios.get(`${env.localhost}periods`).then((response) => {
                if (response.data) {
                    setData(response.data);
                }
            })
        }
    }
    const deletePeriod = (periodId) => {
        Axios.delete(`${env.localhost}periods/${periodId}`)
            .then(() => {
                message.success('The period was deleted!');
                getPeriods();
            });
    };
    const DeleteButton = ({ period }) => (
        <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={() => {

                deletePeriod(period.id);

            }}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No">
            <a>
                <DeleteOutlined style={{ color: 'red', fontSize: 18 }} />
            </a>
        </Popconfirm>
    )
    useEffect((_) => {
        getPeriods();
    })
    return (
        <Table columns={columns} dataSource={data} />
    )
}
