import { createForm } from './Form';
import { Meta, StoryObj } from '@storybook/react';
import { Option } from './components/Choice';

interface Test {
    text: string;
    radio: string;
    check: string[];
    list: string;
    multilist: string[];
}

const Form = createForm<Test>();

function TestForm() {
    return (
        <Form onSubmit={console.log}>
            <Form.Text label="Some text" name="text" />
            <Form.Choice view="radio" label="Choose one!" name="radio">
                <Option value="1">One</Option>
                <Option value="10">Two</Option>
            </Form.Choice>
            <Form.Choice view="checkbox" label="Choose multiple!" name="check">
                <Option value="mul">Mul</Option>
                <Option value="ti">Ti</Option>
                <Option value="ple">Ple</Option>
            </Form.Choice>
            <Form.Choice view="select" label="From list" name="list">
                <Option value="from">From</Option>
                <Option value="a">A</Option>
                <Option value="list">List</Option>
            </Form.Choice>
            <Form.Choice view="select-multiple" label="Multiselect!" name="multilist">
                <Option value="from">From</Option>
                <Option value="a">A</Option>
                <Option value="list">List</Option>
                <Option value="all">All</Option>
                <Option value="at">At</Option>
                <Option value="once">Once</Option>
            </Form.Choice>
        </Form>
    );
}

export default {
    component: TestForm,
} satisfies Meta<typeof TestForm>


export const Default: StoryObj<typeof TestForm> = {}
