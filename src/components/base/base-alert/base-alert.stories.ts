import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { JPAlertSizeType, JPAlertStatusType } from './base-alert';
import { statusTypes, sizes } from './base-alert';
import './base-alert';

type AlertArgs = {
  statusType: JPAlertStatusType;
  size: JPAlertSizeType;
  showIcon: boolean;
  icon: string;
  message: string;
};

const meta = {
  title: 'Base/Base Alert',
  component: 'base-alert',
  tags: ['autodocs'],
  argTypes: {
    statusType: { control: 'select', options: [...statusTypes] },
    size: { control: 'select', options: [...sizes] },
    showIcon: { control: 'boolean' },
    icon: {
      control: 'text',
      description: 'Feather icon name; overrides default icon for status when non-empty.',
    },
    message: { control: 'text', description: 'Default slot text.' },
  },
  args: {
    statusType: 'info',
    size: 'medium',
    showIcon: true,
    icon: '',
    message: 'Your message goes in the default slot.',
  } satisfies AlertArgs,
  render: (args) => html`
    <base-alert
      .statusType=${args.statusType}
      .size=${args.size}
      .showIcon=${args.showIcon}
      .icon=${args.icon}
    >
      <span>${args.message}</span>
    </base-alert>
  `,
} satisfies Meta<AlertArgs>;

export default meta;
type Story = StoryObj<AlertArgs>;

export const Info: Story = { args: { statusType: 'info' } };

export const Success: Story = { args: { statusType: 'success' } };

export const Warning: Story = { args: { statusType: 'warning' } };

export const Error: Story = { args: { statusType: 'error' } };

export const CustomIcon: Story = {
  args: { statusType: 'info', icon: 'bell', showIcon: true },
};

export const NoIcon: Story = {
  args: { showIcon: false },
};
