import React,{ useContext , useState } from "react";
import { Button, Checkbox, Form, Input , Space } from "antd";
import { Link } from "react-router-dom";
import Notecontext from '../context/Notes/NoteContext';



function Login() {

  const [LoginData, setLoginData] = useState({ 'email' : "", 'password': "" });

  const Contextdata = useContext(Notecontext);
  const { LoginFn } = Contextdata;


  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const changes = (event) => {
    setLoginData({...LoginData, [event.target.name]:event.target.value});
  };

  const handlesubmit =  async (event) =>  {
    event.preventDefault();
    await LoginFn( LoginData.email , LoginData.password  );
 }


  return (
      <>

      <div className="container d-flex justify-content-center align-items-center" style={{ Width : "100vh", height : "60vh" }}>

        <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{
            remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <Form.Item label="Email" name="email" rules={[ { required: true, message: 'Please input your Email!' , },
                ]}>
                <Input name="email" placeholder="Email ID" type="email" onChange={changes} required/>
            </Form.Item>

            <Form.Item label="password" name="password" rules={[ { required: true, message: 'Please input your password!' , },
                ]}>
                <Input.Password name="password" placeholder="Password" onChange={changes} required minLength={5}/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16, }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
            <Space wrap>
                <Button type="primary" htmlType="submit" onClick={handlesubmit}>
                    Login
                </Button>
                <Button type="primary" >
                   <Link to={"/SignUp"}>SignUp</Link>
                </Button>
                </Space>
            </Form.Item>
        </Form>

          </div>
      </>

  )
};
export default Login;
