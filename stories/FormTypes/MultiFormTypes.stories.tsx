import { Meta, StoryObj } from '@storybook/react';

import { FormTypes } from '../../src/components/forms/FormTypes';
import { FieldTypes } from '../../src/types';

const meta: Meta = {
  title: 'Form/FormTypes',
  component: FormTypes,
};

export default meta;

type Story = StoryObj<typeof FormTypes>;

export const Template: Story = {
  args: {
    label: 'This is a multi form type',
    type: FieldTypes.TEXT,
    name: 'form_multi_type',
    controlId: 'form_multi_type',
    handleChange: (e) => { console.log(e) }
  },
}
