import React, {Component} from 'react';
import styled from '@emotion/styled/macro';
import map from 'lodash/map';
import isObject from 'lodash/isObject';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography'
import {Field, StyledForm, FormTitle} from './theme';

const EditHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: -2rem;
`;

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {data: this.props.initialData || {}, editing: !props.allowView};
  }

  getHandleUpdate(field) {
    return (ev) => {
      ev.preventDefault();
      const newVal = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
      const newData = Object.assign({}, this.state.data, {
        [field]: newVal
      });
      this.setState(Object.assign({}, this.state, {
        data: newData
      }));
    }
  }

  resetData() {
    this.setState({...this.state, data: this.props.initialData});
  }

  toggleEdit() {
    if (this.state.editing)
      this.resetData();
    this.setState({...this.state, editing: !this.state.editing});
  }

  async handleSubmit() {
    try {
      await this.props.onSubmit(this.state.data);
      if (this.props.allowView) {
        this.setState({...this.state, editing: false});
      }
    } catch (msg) {
      this.setState({...this.state, error: msg});
    }
  }

  render() {
    const {title, fields, submitLabel, allowView, allowDelete, handleDelete, disabled, initialData = {}} = this.props;
    const formFields = map(fields, (fieldConfig, dataKey) => {
      let input;

      if (fieldConfig.type === 'boolean') {
        input = <Switch
          inputProps={{
            name: dataKey,
            id: dataKey,
            key: dataKey,
            disabled: disabled || !this.state.editing
          }}
          disabled={disabled || !this.state.editing}
          checked={this.state.editing ?
                   this.state.data[dataKey] || initialData[dataKey] :
                   initialData[dataKey]}
          onChange={this.getHandleUpdate(dataKey)}
        />
      }

      if (fieldConfig.type === 'select') {
        input = <Select
          inputProps={{
            name: dataKey,
            id: dataKey,
            key: dataKey,
            disabled: disabled || !this.state.editing
          }}
          disabled={disabled || !this.state.editing}
          value={this.state.editing ?
                 this.state.data[dataKey] || initialData[dataKey] :
                 initialData[dataKey]}
          onChange={this.getHandleUpdate(dataKey)}
        >
          {map(fieldConfig.options, (val, key) =>
            <MenuItem value={key} key={key}>
              {val}
            </MenuItem>
          )}
        </Select>
      }

      if (!input) {
        input = <Input
          key={dataKey}
          id={dataKey}
          type={fieldConfig.type}
          name={fieldConfig.autoComplete}
          placeholder={fieldConfig.placeholder}
          autoComplete={fieldConfig.autoComplete}
          value={this.state.editing ?
                 this.state.data[dataKey] || initialData[dataKey]:
                 initialData[dataKey]}
          disabled={disabled || !this.state.editing}
          onChange={this.getHandleUpdate(dataKey)}
        />
      }
      return <Field key={dataKey}>
        {fieldConfig.label &&
         (isObject(fieldConfig.label) ?
           <InputLabel {...fieldConfig.label.props}>
             {fieldConfig.label.title}
           </InputLabel>:
           <InputLabel>{fieldConfig.label}</InputLabel>
         )
        }
        {input}
      </Field>
    });

    return (
      <StyledForm onSubmit={ev => ev.preventDefault() || this.handleSubmit()}>
        {(allowView || allowDelete) && <EditHeader>
          {allowDelete && <Button disabled={disabled} onClick={handleDelete}>Delete</Button>}
          {allowView && <Button disabled={disabled} onClick={() => this.toggleEdit()}>{this.state.editing ? 'View' : 'Edit'}</Button>}
        </EditHeader>}
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
        <Button type="submit" disabled={disabled || !this.state.editing}>{submitLabel}</Button>
      </StyledForm>
    );
  }
}