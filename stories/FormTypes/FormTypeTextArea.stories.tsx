import { Meta, StoryObj } from '@storybook/react';
import { FormTypeTextArea } from '../../src/components/forms/FormTypes/FormTypeTextArea';

const meta: Meta = {
  title: 'Form/FormTypes/TextArea',
  component: FormTypeTextArea,
};

export default meta;

type Story = StoryObj<typeof FormTypeTextArea>;

export const Template: Story = {
  args: {
    label: 'Form Type Text Area',
    rows: 5,
    name: 'form_text_area',
    controlId: 'form_text_area',
    handleChange: (e) => { console.log(e) }
  },
}
