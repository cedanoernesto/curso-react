import React from 'react'
import {List, Typography } from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
export default (props) => {
    return (
    <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={props.data}
        renderItem={item => (
          <List.Item>
            <Typography.Text>{item}</Typography.Text> 
            <EditOutlined
              onClick={() => props.editName(item)}
            />
            <DeleteOutlined
              style={{color: 'red'}}
              onClick={() => props.removeName(item)}
            />
             
          </List.Item>
        )}
      />
    )
}
