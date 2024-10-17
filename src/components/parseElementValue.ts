

const PARSER_FOR = new Map<unknown, (element: unknown, raw: Record<string, any>) => void>()
const PARSER_FOR_INPUT = new Map<string, (element: HTMLInputElement, raw: Record<string, any>) => void>()


PARSER_FOR.set(HTMLSelectElement, (element: HTMLSelectElement, raw) => {
    if (element.multiple) {
        const values: string[] = [];
        raw[element.name] = values;
        for (const option of element.querySelectorAll('option')) {
            if (option.selected) values.push(option.value);
        }
    } else {
        raw[element.name] = element.value;
    }
});
PARSER_FOR.set(HTMLInputElement, (element: HTMLInputElement, raw) => {
    const typeSpecificParser = PARSER_FOR_INPUT.get(element.type);
    if (typeSpecificParser) {
        typeSpecificParser(element, raw);
    } else {
        raw[element.name] = element.value;
    }
});
PARSER_FOR_INPUT.set('checkbox', (element, raw) => {
    if (element.value) {
        let values = raw[element.name];
        if (!Array.isArray(values)) {
            values = [];
            raw[element.name] = values;
        }
        if (element.checked) {
            values.push(element.value);
        }
    } else {
        raw[element.value] = element.checked;
    }
});
PARSER_FOR_INPUT.set('text', (element, raw) => {
    switch (element.getAttribute('spkf-type')) {
    case 'number': {
        const value = Number(element.value.replace(',', '.').replace(/\s/g, ''));
        raw[element.name] = Number.isNaN(value) ? undefined : value;
        break;
    }
    default:
        raw[element.name] = element.value;
        break;
    }
})


export function parseElementValue(element: Element, raw: Record<string, any>) {
    PARSER_FOR.get(element.constructor)?.(element, raw);
}
