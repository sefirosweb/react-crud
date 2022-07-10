import React, { HTMLAttributes, ReactNode } from "react"

export interface Props extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant: 'primary' | 'secondary'
}

export const Button = (props: Props) => {
    const { children = 'primary', variant } = props
    return (
        <button
            {...props}
            style={{ backgroundColor: variant === 'primary' ? 'blue' : 'red' }}
        >
            {children}
        </button>
    )
}