import { Meta, StoryObj } from '@storybook/react';
import { FormTypeDate } from '../../src/components/forms/FormTypes/FormTypeDate';

const meta: Meta = {
  title: 'Form/FormTypes/Date',
  component: FormTypeDate,
};

export default meta;

type Story = StoryObj<typeof FormTypeDate>;

export const Template: Story = {
  args: {
    label: 'Form Type Date',
    name: 'form_date',
    controlId: 'form_date',
    handleChange: (e) => { console.log(e) }
  },
}

