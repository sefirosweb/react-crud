import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Button, Props } from '../src/Button'


const meta: Meta = {
    title: 'Button',
    component: Button,
    argTypes: {
        children: {
            defaultValue: 'Default Text'
        }
    }
}

export default meta

export const Default = () => <Button variant='primary'>Click Me</Button>
export const Secondary = () => <Button variant='secondary'>Secondary Button</Button>

const Template: Story<Props> = (args) => <Button {...args} />
export const Templatebind = Template.bind({})
Templatebind.args = {
    children: 'asd'
}