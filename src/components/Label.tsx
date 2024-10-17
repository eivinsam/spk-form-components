import { ReactNode } from 'react';

interface LabelProps {
    text: string;
    children: ReactNode;
}

export function Label({text, children}: LabelProps) {
    return (
        <label className="spk-form-component">
            <div className="label-text">{text}</div>
            {children}
        </label>
    )
}