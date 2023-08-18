import { Meta, StoryObj } from '@storybook/react';
import { FormTypePassword } from '../../src/components/forms/FormTypes/FormTypePassword';

const meta: Meta = {
  title: 'Form/FormTypes/Password',
  component: FormTypePassword,
};

export default meta;

type Story = StoryObj<typeof FormTypePassword>;

export const Template: Story = {
  args: {
    label: 'Form Type Password',
    name: 'form_password',
    controlId: 'form_password',
    handleChange: (e) => { console.log(e) }
  },
}
