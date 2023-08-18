import { Meta, StoryObj } from '@storybook/react';
import { FormTypeNumber } from '../../src/components/forms/FormTypes/FormTypeNumber';

const meta: Meta = {
  title: 'Form/FormTypes/Number',
  component: FormTypeNumber,
};

export default meta;

type Story = StoryObj<typeof FormTypeNumber>;

export const Template: Story = {
  args: {
    label: 'Form Type Number',
    name: 'form_number',
    controlId: 'form_number',
    handleChange: (e) => { console.log(e) }
  },
}
