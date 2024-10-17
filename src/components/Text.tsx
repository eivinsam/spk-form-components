import { Label } from './Label';

export interface TextProps<Name extends string> {
    label: string;
    name: Name;
}

export function Text<Name extends string>({ label, name }: TextProps<Name>) {
    return (
        <Label text={label}>
            <input type="text" name={name}/>
        </Label>
    );
}
