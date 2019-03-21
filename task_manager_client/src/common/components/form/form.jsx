import React, {Component} from 'react';
import map from 'lodash/map';
import isObject from 'lodash/isObject';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography'
import {Field, StyledForm, FormTitle} from './theme';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
  }

  getHandleUpdate(field) {
    return (ev) => {
      ev.preventDefault();
      const newVal = ev.target.value;
      const newData = Object.assign({}, this.state.data, {
        [field]: newVal
      });
      this.setState(Object.assign({}, this.state, {
        data: newData
      }));
    }
  }

  async handleSubmit() {
    try {
      console.log(this.state.data)
      await this.props.onSubmit(this.state.data);
    } catch (msg) {
      this.setState({...this.state, error: msg});
    }
  }

  render() {
    const {title, fields, submitLabel} = this.props;
    const formFields = map(fields, (fieldConfig, dataKey) => {
      return <Field key={dataKey}>
        {fieldConfig.label &&
         (isObject(fieldConfig.label) ?
           <InputLabel {...fieldConfig.label.props}>
             {fieldConfig.label.title}
           </InputLabel>:
           <InputLabel>{fieldConfig.label}</InputLabel>
         )
        }
        <Input
          key={dataKey}
          id={dataKey}
          type={fieldConfig.type}
          name={fieldConfig.autoComplete}
          placeholder={fieldConfig.placeholder}
          autoComplete={fieldConfig.autoComplete}
          onChange={this.getHandleUpdate(dataKey)}
        />
      </Field>
    });

    return (
      <StyledForm onSubmit={ev => ev.preventDefault() || this.handleSubmit()}>
        {title &&
          <Field>
            <Typography variant="h4" color="inherit">
              {title}
            </Typography>
          </Field>}
        {formFields}
        <FormHelperText error>
          {this.state.error || ''}
        </FormHelperText>
        <Button type="submit">{submitLabel}</Button>
      </StyledForm>
    );
  }
}