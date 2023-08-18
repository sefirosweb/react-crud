import { Meta, StoryObj } from '@storybook/react';
import { FormTypeText } from '../../src/components/forms/FormTypes/FormTypeText';

const meta: Meta = {
  title: 'Form/FormTypes/Text',
  component: FormTypeText,
};

export default meta;

type Story = StoryObj<typeof FormTypeText>;

export const Template: Story = {
  args: {
    label: 'Form Type Text',
    name: 'form_text',
    controlId: 'form_text',
    handleChange: (e) => { console.log(e) }
  },
}

