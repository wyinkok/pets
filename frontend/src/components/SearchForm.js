import React, { Component } from 'react';
import {Form, Select, Slider, DatePicker, InputNumber, Row, Col, Checkbox, Button} from 'antd';
import AlgoliaPlaces from 'algolia-places-react';
import './SearchForm.css';

const Option = Select.Option;
const services = [
  "Pet Boarding", "House Sitting", "Dog Walking",  "Drop In Visits",
  "Pet Day Care"
]
const pettype = [
  "Dog", "Cat", "Hamster", "Rabbit"
]
const petsize = [
  "Small: 0 - 5kg", "Medium: 6 - 15kg", "Large: 16 - 45kg", "Giant: > 45kg"
]
const CheckboxGroup = Checkbox.Group;
const houseOptions = ['Able to visit owner\'s house',
                      'Allow pets to stay in sitter\'s house',
                      'Lives with other pets in their house',
                    'Don\'t cage pets'];
const miscOptions = ['Takes care of one client at a time',
'Dog First-Aid certified'];




class SearchForm extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(Search)
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm />
                </div>
            </div>
        );
    }
}


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
     marks: {
        0: '$10',
        100: '$150'
      },
      location: {},
    }
  }

  onSelect(value) {
    console.log('onSelect', value);
  }


  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  onRateChange(value) {
      let newVal = "$"+value;
      this.setState({
        marks: {
          0: '$10',
          100: newVal
          }
        })
    }

  onDateChange(date, dateString) {
    console.log(date);
    console.log(dateString);
  }

  onServiceChange(value) {
    console.log(value);
  }

  onPetTypeChange(value) {
    console.log(value);
  }

  onPetSizeChange(value) {
    console.log(value);
  }

  onPetNoChange(value) {
    console.log(value);
  }

  onHousingChange(checkedValues) {
    console.log(checkedValues);
  }

  onMiscChange(checkedValues) {
    console.log(checkedValues);
  }

  onLocationChange(suggestion) {
    console.log(suggestion);
    this.setState({
      location: suggestion
    })
  }


  render() {
    return (
      <div>
      <Row>
       <Col span={8}>
        <h3> Find A Sitter </h3>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <div>
          <p className="service-label">Service</p>
          </div>
          <Form.Item>
            <Select
              size="large"
              name="role"
              autoComplete="off"
              style={{ width: '100%' }}
              defaultValue={['Dog Boarding']}
              onChange={this.onServiceChange.bind(this)}>
              {services.map(service => <Option key={service}>{service}</Option>)}
            </Select>
          </Form.Item>
          <div className="slider-label">
            <p>Location</p>
          </div>
          <div className="algolia">
          <AlgoliaPlaces
              placeholder='Address'
              options={{
               appId: 'pl4X3CET64PO',
               apiKey: '810117f3a4fd4815c33232c31f02cf48',
               countries: ['sg']
              }}
              onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
               this.onLocationChange(suggestion);
              }}
              onClear={() => {
                this.onLocationChange({});
              }}
              onLimit={({ message }) =>
               console.log('Fired when you reached your current rate limit.')}
            />
         </div>
          <div className="slider-label">
            <p>Rate</p>
          </div>
          <Form.Item>
            <Slider
              marks={this.state.marks}
              defaultValue={150}
              tipFormatter={(value) => `$${value}`}
              onChange={this.onRateChange.bind(this)}/>
          </Form.Item>
          <div className="dates-label">
            <p>Dates</p>
          </div>
          <Form.Item className="date-picker">
             <DatePicker.RangePicker
                onChange={this.onDateChange.bind(this)}
                placeholder={['Drop off', 'Pick up']}/>
          </Form.Item>
          <div className="slider-label">
            <p>Pet Type</p>
          </div>
          <Form.Item>
            <Select
              size="large"
              name="role"
              autoComplete="off"
              style={{ width: '100%' }}
              defaultValue={['Dog']}
              onChange={this.onPetTypeChange.bind(this)}>
              {pettype.map(pettype => <Option key={pettype}>{pettype}</Option>)}
            </Select>
          </Form.Item>
          <div className="slider-label">
            <p>Pet Size</p>
          </div>
          <Form.Item>
            <Select
              size="large"
              name="role"
              autoComplete="off"
              style={{ width: '100%' }}
              defaultValue={['Small: 0 - 5kg']}
              onChange={this.onPetSizeChange.bind(this)}>
              {petsize.map(petsize => <Option key={petsize}>{petsize}</Option>)}
            </Select>
          </Form.Item>
          <div className="slider-label">
            <p>Number of Pets</p>
          </div>
          <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              style={{ width: '100%', marginBottom: '25px'}}
              onChange={this.onPetNoChange.bind(this)} />
          <div className="slider-label">
            <p>Housing</p>
          </div>
          <CheckboxGroup
            options={houseOptions}
            onChange={this.onHousingChange.bind(this)} />
            <br /><br />
          <div className="slider-label">
            <p>Miscellaneous</p>
          </div>
          <CheckboxGroup
            options={miscOptions}
            onChange={this.onMiscChange.bind(this)} />
            <br /><br />
          <Button type="primary" htmlType="submit">Search</Button>
            </Form>
          </Col>
          <Col span={16}>Results</Col>
      </Row>
      </div>
    );
  }
}


export default SearchForm;
