import React from 'react';
import { Button } from 'react-bootstrap';
interface CustomProps {
}
export type Props = CustomProps & React.ComponentProps<typeof Button>;
export declare const RestoreButton: React.FC<Props>;
export {};