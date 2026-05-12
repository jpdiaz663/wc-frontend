import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './base-icons';

const libraries = ['feather', 'jam', 'remix'] as const;

type IconsArgs = {
  name: string;
  library: (typeof libraries)[number];
  size: string;
};

const meta = {
  title: 'Base/Base Icons',
  component: 'base-icons',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text', description: 'Icon name in the selected library.' },
    library: { control: 'select', options: [...libraries] },
    size: {
      control: 'text',
      description: 'SVG width/height (e.g. 24, 32px, 1.5rem). Empty uses library default.',
    },
  },
  args: {
    name: 'battery-charging',
    library: 'feather',
    size: '48',
  } satisfies IconsArgs,
  render: (args) => html`
    <base-icons .name=${args.name} .library=${args.library} .size=${args.size}></base-icons>
  `,
} satisfies Meta<IconsArgs>;

export default meta;
type Story = StoryObj<IconsArgs>;

export const Feather: Story = {
  args: { name: 'battery-charging', library: 'feather', size: '48' },
};

export const Jam: Story = {
  args: { name: 'leaf', library: 'jam', size: '48' },
};

export const Remix: Story = {
  args: { name: 'Food-beer-fill', library: 'remix', size: '48' },
};
