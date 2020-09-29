import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { TeamOutlined, UserOutlined} from '@ant-design/icons';
import  Users from '../modules/Users/Index';
import {  BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'; 
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export class Main extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<TeamOutlined />}>
                        <Link to="/users">Users</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Admin">
                    <Menu.Item key="1">Schools</Menu.Item>
                    <Menu.Item key="2">Periods</Menu.Item>
                    <Menu.Item key="3">Subjects</Menu.Item>
                    <Menu.Item key="4">Teachers</Menu.Item>
                    <Menu.Item key="5">Grades</Menu.Item>
                    <Menu.Item key="6">Students</Menu.Item>
                    </SubMenu>
                </Menu>
                </Sider>
                <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Switch>
                            <Route path="/users">
                                <Users/>
                            </Route>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>ProReactware GmHb ©2020 Deutschland</Footer>
                </Layout>
            </Layout>
        </Router>
    );
  }
}