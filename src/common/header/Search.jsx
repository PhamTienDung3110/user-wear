import React, { useEffect, useState } from "react"
import logo from "../../components/assets/images/logo.svg"
import { Link } from "react-router-dom"
import axios from "axios"
import { Button, Form, Input, Modal } from "antd"
import { message } from 'antd';

const Search = ({ CartItem }) => {
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [openPopupRegister, setOpenPopupRegister] = useState(false)
  useEffect(() => {
    if(localStorage.getItem('isLogin')) {
      setIsLogin(true)
    }
    
  },[])
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  const handleLogin = (values) => {
    axios.post('http://127.0.0.1:8000/api/auth/user/login', {
      email: values.username,
      password: values.password,
    })
    .then(function (response) {
      localStorage.setItem('isLogin', true)
      setIsLogin(true)
      message.success('Login successful!', 2);
      setOpenPopup(false)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  const onFinish = (values) => {
    axios.post('http://127.0.0.1:8000/api/auth/user/singup', {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    })
    .then(function (response) {
      message.success('Register successful!', 2);
      setOpenPopupRegister(false)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("isLogin")
    setIsLogin(false)
    message.success('Logout successful!', 2);
  }

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img src='//bizweb.dktcdn.net/100/347/923/themes/742041/assets/logo.png?1675482347581' alt='' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>
          
          {
            isLogin ? <div className='icon f_flex width' style={{display: 'flex', alignItems: 'center'}}>
            <i className='fa fa-user icon-circle'></i>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
              <Button style={{marginLeft: 20}} type="primary" onClick={() => handleLogout()}>
            logout
          </Button>
          </div> : <div style={{display: 'flex', alignItems: 'center'}}>
          <Button style={{marginLeft: 30}} onClick={() => setOpenPopup(true)}>Login</Button>
          <Button style={{marginLeft: 30}} onClick={() => setOpenPopupRegister(true)}>Register</Button>
          </div>
          }
          
        </div>

      </section>
      <Modal
      title="Login"
      open={openPopup}
      onCancel={() => setOpenPopup(false)}
      footer={null}
    >
      <Form form={form} onFinish={handleLogin}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Modal>
      <Modal
      title="Register"
      open={openPopupRegister}
      onCancel={() => setOpenPopupRegister(false)}
      footer={null}
    >
<Form
      name="register-form"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email!' },
          { type: 'email', message: 'Please enter a valid email address!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="password_confirmation"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </Modal>
    </>
  )
}

export default Search
