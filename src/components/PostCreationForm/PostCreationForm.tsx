import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  DatePicker, 
  InputNumber, 
  Button, 
  Space, 
  Row, 
  Col, 
  Card
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

// Define interfaces for our form data
interface PostCreationFormValues {
  dateTimeRange: [dayjs.Dayjs, dayjs.Dayjs];
  name: string;
  description: string;
  tags: string[];
  stock: number;
  price: number;
}

interface PostCreationFormProps {
  initialValues?: Partial<PostCreationFormValues>;
  onSubmit: (values: PostCreationFormValues) => void;
  loading?: boolean;
}

const PostCreationForm: React.FC<PostCreationFormProps> = ({ 
  onSubmit, 
  loading = false 
}) => {
  const [form] = Form.useForm();
  
  // For custom tag input
  const [tags, setTags] = useState<string[]>([]);
  const [inputTagValue, setInputTagValue] = useState<string>('');
  
  const handleSubmit = (values: PostCreationFormValues) => {
    onSubmit({ ...values, tags });
  };
  
  // Function to handle adding new tags
  const handleAddTag = () => {
    if (inputTagValue && !tags.includes(inputTagValue)) {
      setTags([...tags, inputTagValue]);
      setInputTagValue('');
    }
  };
  
  // Function to remove a tag
  const handleRemoveTag = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  return (
    <Card title="Event Details" style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        {/* Date Range Row */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="dateTimeRange"
              label="Event Date and Time"
              rules={[{ required: true, message: 'Please select start and end date/time' }]}
            >
              <RangePicker 
                showTime 
                format="YYYY-MM-DD HH:mm" 
                style={{ width: '100%' }} 
                placeholder={['Start Date & Time', 'End Date & Time']}
              />
            </Form.Item>
          </Col>
        </Row>
        
        {/* Name Row */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Event Name"
              rules={[{ required: true, message: 'Please enter event name' }]}
            >
              <Input placeholder="Enter event name" />
            </Form.Item>
          </Col>
        </Row>
        
        {/* Description Row */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter event description' }]}
            >
              <TextArea placeholder="Enter event description" autoSize={{ minRows: 3, maxRows: 6 }} />
            </Form.Item>
          </Col>
        </Row>
        
        {/* Tags Row */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Tags">
              <Input.Group compact>
                <Input
                  value={inputTagValue}
                  onChange={(e) => setInputTagValue(e.target.value)}
                  onPressEnter={handleAddTag}
                  placeholder="Add a tag"
                  style={{ width: 'calc(100% - 80px)' }}
                />
                <Button type="primary" onClick={handleAddTag} icon={<PlusOutlined />}>
                  Add
                </Button>
              </Input.Group>
              <div style={{ marginTop: 8 }}>
                {tags.map((tag) => (
                  <Space 
                    key={tag} 
                    style={{ display: 'inline-flex', margin: '0 8px 8px 0', background: '#f0f0f0', padding: '2px 8px', borderRadius: '4px' }}
                  >
                    <span>{tag}</span>
                    <MinusCircleOutlined 
                      onClick={() => handleRemoveTag(tag)} 
                      style={{ cursor: 'pointer', color: '#ff4d4f' }}
                    />
                  </Space>
                ))}
              </div>
            </Form.Item>
          </Col>
        </Row>
        
        {/* Stock and Price Row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="stock"
              label="Stock/Quantity"
              rules={[{ required: true, message: 'Please enter stock quantity' }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} placeholder="Enter quantity" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter price' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                step={0.01}
                precision={2}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                placeholder="Enter price"
              />
            </Form.Item>
          </Col>
        </Row>
        
        {/* Submit Button */}
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default PostCreationForm;