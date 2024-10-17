import { KeysOfType } from './typeutil';
import { Label } from './Label';
import { KeyboardEvent } from 'react';

export interface NumberProps<T extends object> {
    label: string;
    name: KeysOfType<T, number>;
    value?: number | null;
    format?: (value: string) => string;
}

export function defaultFormat(value: string): string {
    let [, sign, integer, , fraction] = value
        .replace(/\s+/g, '')
        .match(/([+-]?)([^,.]*)([,.](.*))?/) ?? [];
    if (integer === undefined) return '';
    console.log({ sign, integer, fraction});
    integer = integer.replace(/[^\d]/g, '');
    const integerDigits = integer.length;
    for (let i = integerDigits - 3; i > 0; i -= 3) {
        integer = integer.substring(0, i) + ' ' + integer.substring(i);
    }
    if (fraction) {
        fraction = fraction.replace(/[^\d]/g, '');
        const fractionDigits = fraction.length;
        for (let i = 3; i < fractionDigits; i += 4) {
            fraction = fraction.substring(0, i) + ' ' + fraction.substring(i);
        }
    }


    return sign + integer + (fraction ? ',' + fraction : '');
}

export function Number<T extends object>({label, name, value, format = defaultFormat }: NumberProps<T>) {
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey || event.altKey || event.metaKey) return;
        if (event.key === 'Enter') {
            event.currentTarget.value = format(event.currentTarget.value);
        }
    }
    const handleBlur = (event) => {
        event.currentTarget.value = format(event.currentTarget.value);
    }
    return (
        <Label text={label}>
            <input type="text" spkf-type="number" name={name} defaultValue={value} onKeyDown={handleKeyDown} onBlur={handleBlur}/>
        </Label>
    );
}