import { Button, Form, Input, message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';



function LoginPage() {
  const navigate = useNavigate();

  const onFinish = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success('Đăng nhập thành công');
      navigate('/admin');
    } catch (error) {
      message.error('Sai email hoặc mật khẩu');
    }
  };

  return (
    <div className="admin-container">
      
      <Form layout="vertical" onFinish={onFinish}>
        <h1>LOGIN ADMIN</h1>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit">Đăng nhập</Button>
      </Form>
    </div>
  );
}

export default LoginPage;