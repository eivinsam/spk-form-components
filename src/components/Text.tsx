import { Label } from './Label';
import { KeysOfType } from './typeutil';

export interface TextProps<T extends object> {
    label: string;
    name: KeysOfType<T, string>;
}

export function Text<T extends object>({ label, name }: TextProps<T>) {
    return (
        <Label text={label}>
            <input type="text" name={name}/>
        </Label>
    );
}
