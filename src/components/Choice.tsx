import { Children, ReactElement, type ReactNode } from 'react';

interface OptionProps {
    value: string;
    children: ReactNode;
}

export function Option(props: OptionProps): ReactElement {
    throw Error('Option should never render!');
}

export interface ChoiceProps<Name extends string> {
    label: string;
    name: Name;
    view: 'radio' | 'checkbox' | 'select' | 'select-multiple';
    children: ReactElement<OptionProps>[] | ReactElement<OptionProps>;
}

export function Choice<Name extends string>({label, name, view, children}: ChoiceProps<Name>): ReactElement {
    const options = Children.map(children, (child) => child.props)
    switch (view) {
    case 'radio':
    case 'checkbox': {
        return (
            <fieldset className="spk-form-component">
                <legend>{label}</legend>
                {options.map((option) => (
                    <label key={option.value}>
                        <input type={view} name={name} value={option.value}/>
                        <span className="label-text">{option.children}</span>
                    </label>
                ))}
            </fieldset>
        );
    }
    case 'select':
    case 'select-multiple': {
        return (
            <label className="spk-form-component">
                <span className="label-text">{label}</span>
                <select name={name} multiple={view === 'select-multiple'}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.children}</option>
                    ))}
                </select>
            </label>
        );
    }
    }
}