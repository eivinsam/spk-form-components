import { Children, ReactElement, type ReactNode } from 'react';
import { Label } from './Label';
import { KeysOfType, SingleOrArray } from './typeutil';

interface OptionProps {
    value: string;
    children: ReactNode;
}

export function Option(props: OptionProps): ReactElement {
    throw Error('Option should never render!');
}

interface CommonChoiceProps {
    label: string;
    children: SingleOrArray<ReactElement<OptionProps>>;
}

interface SingleChoiceProps<T extends object> extends CommonChoiceProps {
    name: KeysOfType<T, string>;
    view: 'radio' | 'select';
}

interface MultiChoiceProps<T extends object> extends CommonChoiceProps {
    name: KeysOfType<T, readonly string[]>;
    view: 'checkbox' | 'select-multiple';
}

export type ChoiceProps<T extends object> = SingleChoiceProps<T> | MultiChoiceProps<T>;

export function Choice<T extends object>({label, name, view, children}: ChoiceProps<T>): ReactElement {
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
            <Label text={label}>
                <select name={name} multiple={view === 'select-multiple'}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.children}</option>
                    ))}
                </select>
            </Label>
        );
    }
    }
}