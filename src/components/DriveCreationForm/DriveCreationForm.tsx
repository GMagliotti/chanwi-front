import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  DatePicker, 
  Button, 
  Row, 
  Col, 
  Card
} from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

// Define interfaces for our form data
interface DriveCreationFormValues {
  dateTimeRange: [dayjs.Dayjs, dayjs.Dayjs];
  name: string;
  description: string;
  tags: string[];
  stock: number;
  price: number;
}

interface DriveCreationFormProps {
  initialValues?: Partial<DriveCreationFormValues>;
  onSubmit: (values: DriveCreationFormValues) => void;
  loading?: boolean;
}

const DriveCreationForm: React.FC<DriveCreationFormProps> = ({ 
  onSubmit, 
  loading = false 
}) => {
  const [form] = Form.useForm();
  
  // For custom tag input
  const [tags, setTags] = useState<string[]>([]);
  setTags([])
  // const [inputTagValue, setInputTagValue] = useState<string>('');
  
  const handleSubmit = (values: DriveCreationFormValues) => {
    onSubmit({ ...values, tags });
  };
  
  // Function to handle adding new tags
  // const handleAddTag = () => {
  //   if (inputTagValue && !tags.includes(inputTagValue)) {
  //     setTags([...tags, inputTagValue]);
  //     setInputTagValue('');
  //   }
  // };
  
  // Function to remove a tag
  // const handleRemoveTag = (removedTag: string) => {
  //   setTags(tags.filter(tag => tag !== removedTag));
  // };

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

export default DriveCreationForm;