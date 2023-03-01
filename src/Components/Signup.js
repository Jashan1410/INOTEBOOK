import React,{ useContext, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Notecontext from '../context/Notes/NoteContext';



function Signup() {

    const [SignupData, setSignupData] = useState({'name' : "" , 'email': "", 'password': ""});

    const Contextdata = useContext(Notecontext);
    const { SignUpFn } = Contextdata;

    const onFinish = (values) => {
        console.log("Success:", values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };

      const changes = (event) => {
        setSignupData({...SignupData, [event.target.name]:event.target.value});
      };

      const handlesubmit = async (event) => {
        event.preventDefault();
        await SignUpFn(  SignupData.name , SignupData.email , SignupData.password );
     }


  return (
      <>

      <div className="container d-flex justify-content-center align-items-center" style={{ Width : "100vw", height : "60vh" }}>

        <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{
            remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <Form.Item label="name" name="name" rules={[ { required: true, message: 'Please input your Name!' , },
                ]}>
                <Input id="name" name="name"  onChange={changes} required />
            </Form.Item>

            <Form.Item label="email" name="email" rules={[ { required: true, message: 'Please input your Email!' , },
                ]}>
                <Input id="email" name="email" onChange={changes} required />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[ { required: true, message: 'Please input your password!' , },
                ]}>
                <Input.Password id="password" name="password" onChange={changes} required minLength={5} />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16, }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
                <Button type="primary" htmlType="submit" onClick={handlesubmit}>
                    SignUp
                </Button>
            </Form.Item>
        </Form>

        </div>

      </>

  )
};
export default Signup;
