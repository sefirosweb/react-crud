import React from "react";
import { Meta, Story } from "@storybook/react";

import { EditButton, Props } from "../src/components/buttons/EditButton";

const meta: Meta = {
  title: "Buttons/EditButton",
  component: EditButton,
};

export default meta;

const Template: Story<Props> = (args) => <EditButton {...args} />;
export const Active: Story<Props> = Template.bind({});
Active.args = {
  disabled: false,
};

export const Disabled: Story<Props> = Template.bind({});
Disabled.args = {
  disabled: true,
};
