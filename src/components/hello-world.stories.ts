import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './hello-world';

type HelloArgs = {
  name: string;
};

const meta = {
  title: 'Demo/Hello World',
  component: 'hello-world',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Shown in the greeting and passed to nested demos.' },
  },
  args: {
    name: 'Storybook',
  } satisfies HelloArgs,
  render: (args) => html`<hello-world .name=${args.name}></hello-world>`,
} satisfies Meta<HelloArgs>;

export default meta;
type Story = StoryObj<HelloArgs>;

export const Default: Story = {};
