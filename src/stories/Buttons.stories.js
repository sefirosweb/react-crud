import React from 'react';
import { storiesOf } from '@storybook/react';
import useState from 'storybook-addon-state';
import { action } from '@storybook/addon-actions';
import { CancelButton } from '../components/buttons/CancelButton';
import { CronjobButton } from '../components/buttons/CronjobButton';
import { DeleteButton } from '../components/buttons/DeleteButton';
import { EditButton } from '../components/buttons/EditButton';
import { LoadingButton } from '../components/buttons/LoadingButton';
import { RefreshButton } from '../components/buttons/RefreshButton';

export const actions = {
    onClick: action('onClick')
};

const CronjobButtonStory = storiesOf('Buttons/CronjobButton', module);
CronjobButtonStory.add('Primary', () => {
    return (<CronjobButton {...actions} />);
});

const DeleteButtonStory = storiesOf('Buttons/DeleteButton', module);
DeleteButtonStory.add('Primary', () => {
    return (<DeleteButton  {...actions} />);
});

const EditButtonStory = storiesOf('Buttons/EditButton', module);
EditButtonStory.add('Primary', () => {
    return (<EditButton  {...actions} />);
});

const LoadingButtonStory = storiesOf('Buttons/LoadingButton', module);
LoadingButtonStory.add('Primary', () => {
    return (<LoadingButton {...actions} />);
});

const RefreshButtonStory = storiesOf('Buttons/RefreshButton', module);
RefreshButtonStory.add('Primary', () => {
    return (<RefreshButton  {...actions} />);
});
