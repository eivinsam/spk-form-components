import { type FormEvent, type ReactElement, type ReactNode, useCallback } from 'react';
import { Text, TextProps } from './components/Text';
import { Choice, ChoiceProps } from './components/Choice';
import './form.css';

type Errors<T extends object> = { [K in keyof T & string]?: string };

interface FormProps<T extends object> {
    onSubmit: (data: T, errors: Errors<T>) => void;
    children: ReactNode;
}

type FormComponent<T extends object> = (props: FormProps<T>) => ReactElement;

interface Form<T extends object> extends FormComponent<T> {
    Choice: (props: ChoiceProps<keyof T & string>) => ReactElement;
    Text: (props: TextProps<keyof T & string>) => ReactElement;
}

type Validator<T extends object> = (raw: { [K in string]?: unknown }) => { data: T | null, errors: Errors<T> };

const assumeValid: Validator<any> = (raw) => ({ data: raw, errors: {}});

export function createForm<T extends object>(validate: Validator<T> = assumeValid): Form<T> {
    const Form: Partial<Form<T>> & FormComponent<T> = ({onSubmit, children}: FormProps<T>) => {
        const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // TODO: more intelligent formdata handling for eg numbers
            const raw = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, any>;
            for (const input of event.currentTarget.elements) {
                if (input instanceof HTMLInputElement) {
                    if (input.type === 'checkbox') {
                        if (!Array.isArray(raw[input.name])) {
                            raw[input.name] = [];
                        }
                        if (input.checked) {
                            raw[input.name].push(input.value);
                        }
                    }
                }
                if (input instanceof HTMLSelectElement) {
                    if (input.multiple) {
                        raw[input.name] = [];
                        for (const option of input.querySelectorAll('option')) {
                            if (option.selected) {
                                raw[input.name].push(option.value);
                            }
                        }
                    }
                }
            }
            const { data, errors } = validate(raw);
            if (data) {
                onSubmit(data, errors);
            }
        }, [onSubmit])
        return <form onSubmit={handleSubmit}>{children}</form>
    }
    Form.Choice = Choice;
    Form.Text = Text;
    return Form as Form<T>;
}

