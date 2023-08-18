import { Meta, StoryObj } from '@storybook/react';
import { FormTypeSelect } from '../../src/components/forms/FormTypes/FormTypeSelect';

const meta: Meta = {
  title: 'Form/FormTypes/Select',
  component: FormTypeSelect,
};

export default meta;

type Story = StoryObj<typeof FormTypeSelect>;

export const Template: Story = {
  args: {
    label: 'Form Type Select',
    selectOptionsUrl: '/api/get_options',
    name: 'form_select',
    controlId: 'form_select',
    handleChange: (e) => { console.log(e) }
  },
}
