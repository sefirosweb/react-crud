import React from 'react';
import { storiesOf } from '@storybook/react';
import { CancelButton } from '../components/buttons/CancelButton';
import { CronjobButton } from '../components/buttons/CronjobButton';
import { DeleteButton } from '../components/buttons/DeleteButton';
import { EditButton } from '../components/buttons/EditButton';
import { LoadingButton } from '../components/buttons/LoadingButton';
import { RefreshButton } from '../components/buttons/RefreshButton';

const CancelButtonStory = storiesOf('Buttons/CancelButton', module);
CancelButtonStory.add('Primary', () => {
    return (<CancelButton />);
});

const CronjobButtonStory = storiesOf('Buttons/CronjobButton', module);
CronjobButtonStory.add('Primary', () => {
    return (<CronjobButton />);
});

const DeleteButtonStory = storiesOf('Buttons/DeleteButton', module);
DeleteButtonStory.add('Primary', () => {
    return (<DeleteButton />);
});

const EditButtonStory = storiesOf('Buttons/EditButton', module);
EditButtonStory.add('Primary', () => {
    return (<EditButton />);
});

const LoadingButtonStory = storiesOf('Buttons/LoadingButton', module);
LoadingButtonStory.add('Primary', () => {
    return (<LoadingButton />);
});

const RefreshButtonStory = storiesOf('Buttons/RefreshButton', module);
RefreshButtonStory.add('Primary', () => {
    return (<RefreshButton />);
});
