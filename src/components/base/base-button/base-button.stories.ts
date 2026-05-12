import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './base-button';

type ButtonArgs = {
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  url: string;
  target: '_self' | '_blank' | '_parent' | '_top';
  slotText: string;
};

const meta = {
  title: 'Base/JP Button',
  component: 'jp-button',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    label: { control: 'text', description: 'Accessible label (aria-label).' },
    url: { control: 'text', description: 'If set, renders as a link instead of `<button>`.' },
    target: { control: 'select', options: ['_self', '_blank', '_parent', '_top'] },
    slotText: { control: 'text', description: 'Default slot content.' },
  },
  args: {
    label: 'Demo',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    url: '',
    target: '_self',
    slotText: 'Click me',
  } satisfies ButtonArgs,
  render: (args) => html`
    <jp-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      .disabled=${args.disabled}
      .url=${args.url}
      .target=${args.target}
    >
      <span>${args.slotText}</span>
    </jp-button>
  `,
} satisfies Meta<ButtonArgs>;

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
};

export const Small: Story = {
  args: { size: 'small' },
};

export const Large: Story = {
  args: { size: 'large' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AsLink: Story = {
  args: {
    url: 'https://example.com',
    target: '_blank',
    slotText: 'Open example',
  },
};
