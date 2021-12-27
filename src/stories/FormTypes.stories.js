import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormTypes } from '../components/form/FormTypes';
import useState from 'storybook-addon-state';
import store from './../lib/store'




const FormTypeStory = storiesOf('Form/FormTypes', module);
FormTypeStory.add('Text', () => {

    const [value, setValue] = useState('value', '');

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            <FormTypes type="text" value={value} inputFieldName="inputFieldName" handleChange={handleChange} />
            <p>
                Text inserted: {value}
            </p>
        </>
    )
});

FormTypeStory.add('Password', () => {

    const [value, setValue] = useState('value', '');

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            <FormTypes type="password" value={value} inputFieldName="inputFieldName" handleChange={handleChange} />
            <p>
                Text inserted: {value}
            </p>
        </>
    )
});

FormTypeStory.add('Textarea', () => {

    const [value, setValue] = useState('value', '');

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            <FormTypes type="textarea" value={value} inputFieldName="inputFieldName" handleChange={handleChange} />
            <p>
                Text inserted: {value}
            </p>
        </>
    )
});

FormTypeStory.add('Select', () => {

    const [value, setValue] = useState('value', '');

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            <FormTypes
                type="select"
                value={value}
                inputFieldName="inputFieldName"
                handleChange={handleChange}
                selectOptionsUrl='http://api.customweb.es:81/override_configuration/override_field_type/get_array'
                store={store}
            />
            <p>
                Text inserted: {value}
            </p>
        </>
    )
});

// type, inputFieldName, isLoading, label, value, handleChange, selectOptionsUrl, cache, setCache