import React from 'react';
import { storiesOf } from '@storybook/react';
import { CancelButton } from '../components/CancelButton';

const stories = storiesOf('CancelButton', module);

stories.add('Primary', () => {

    return (<CancelButton />);
});
