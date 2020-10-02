import React, { useState, useEffect } from 'react';
import { Tag, Space, Table, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Axios from 'axios';
import env from '../../env';


export default ({ selectUser }) => {
  const [data, setData] = useState(null);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      render: type => (<Tag color={'geekblue'} key={type}>{type.toUpperCase()}</Tag>),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <DeleteButton user={record} />
          <a onClick={() => selectUser(record)}>
            <EditOutlined style={{ fontSize: 18 }} />
          </a>
        </Space>
      ),
    },
  ];

  const updateUsers = () => {
    if (!data) {
      Axios.get(`${env.localhost}users`).then((response) => {
        if (response.data) {
          setData(response.data);
        }
      })
    }
  }
  const deleteUser = (userId) => {
    Axios.delete(`${env.localhost}users/${userId}`)
      .then(() => {
        message.success('The user was deleted!');
        updateUsers();
      });
  };
  const DeleteButton = ({ user }) => (
    <Popconfirm
      title="Are you sure delete this user?"
      onConfirm={() => {
        console.log(user.id);
        //deleteUser(user.id);
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
    updateUsers();
  })
  return (
    <Table columns={columns} dataSource={data} />
  )
}
