import { Label } from './Label';
import { KeysOfType } from './typeutil';

export interface TextProps<T extends object> {
    label: string;
    name: KeysOfType<T, string>;
    value?: string;
}

export function Text<T extends object>({ label, name, value }: TextProps<T>) {
    return (
        <Label text={label}>
            <input type="text" name={name} defaultValue={value}/>
        </Label>
    );
}
