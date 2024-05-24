import React, {useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Title from "antd/lib/typography/Title";
import {login} from "../utils/login-api";

const LoginPage = () => {

    const [error, setError] = useState(false)
    
    const onFinish = async (values) => {
        await login(values.email, values.password, onLogin, onError)
    };

    const onLogin = (res) => {
        localStorage.setItem('token', res.token);
        window.location.reload();
    }

    const onError = () => {
        setError(true)
    }

    return (
        <div style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '16px 32px',
            border: '2px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Title level={2} style={{textAlign: 'center', color: '#899596'}}>Login</Title>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item style={{display: 'flex', justifyContent: 'center', marginTop: '8px'}}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            { error &&
                <Title level={4} style={{textAlign: 'center', color: 'red'}}>
                    Invalid email or password
                </Title>
            }
        </div>
    );
};

export default LoginPage;
