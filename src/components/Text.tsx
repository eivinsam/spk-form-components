
export interface TextProps<Name extends string> {
    label: string;
    name: Name;
}

export function Text<Name extends string>({ label, name }: TextProps<Name>) {
    return (
        <label className="spk-form-component">
            <span className="label-text">{label}</span>
            <input type="text" name={name} />
        </label>
    );
}
