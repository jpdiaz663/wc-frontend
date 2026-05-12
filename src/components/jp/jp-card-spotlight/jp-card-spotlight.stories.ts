import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { JPCardSpotlightItem } from './jp-card-spotlight';
import './jp-card-spotlight';

const demoCards: JPCardSpotlightItem[] = [
  {
    title: 'Opción A',
    category: 'Producto',
    description: 'Descripción breve de la primera tarjeta del spotlight.',
    link: '#',
    thumb: 'https://picsum.photos/seed/jp-a/480/320',
    image: 'https://picsum.photos/seed/jp-a/960/720',
  },
  {
    title: 'Opción B',
    category: 'Servicio',
    description: 'Segunda tarjeta con otro mensaje para el panel lateral.',
    link: '#',
    thumb: 'https://picsum.photos/seed/jp-b/480/320',
    image: 'https://picsum.photos/seed/jp-b/960/720',
  },
  {
    title: 'Opción C',
    category: 'Insight',
    description: 'Tercera opción; en móvil podés expandir y colapsar la selección.',
    link: '#',
    thumb: 'https://picsum.photos/seed/jp-c/480/320',
    image: 'https://picsum.photos/seed/jp-c/960/720',
  },
];

type CardSpotlightArgs = {
  buttonText: string;
  reverseAlignment: boolean;
  reduced: boolean;
  selectedIndex: number;
};

const meta = {
  title: 'JP/JP Card Spotlight',
  component: 'jp-card-spotlight',
  tags: ['autodocs'],
  argTypes: {
    buttonText: { control: 'text', description: 'Maps to `button-text`.' },
    reverseAlignment: { control: 'boolean', description: 'Maps to `reverse-alignment`.' },
    reduced: { control: 'boolean' },
    selectedIndex: { control: 'number', description: 'Maps to `selected-index`.' },
  },
  args: {
    buttonText: 'Ver más',
    reverseAlignment: false,
    reduced: false,
    selectedIndex: 0,
  } satisfies CardSpotlightArgs,
  render: (args) => html`
    <jp-card-spotlight
      .buttonText=${args.buttonText}
      .cards=${demoCards}
      .reverseAlignment=${args.reverseAlignment}
      .reduced=${args.reduced}
      .selectedIndex=${args.selectedIndex}
    >
      <span slot="title">The Emerald Core — Spotlight</span>
      <span slot="description">Elegí una tarjeta; en escritorio el panel muestra el detalle.</span>
    </jp-card-spotlight>
  `,
} satisfies Meta<CardSpotlightArgs>;

export default meta;
type Story = StoryObj<CardSpotlightArgs>;

export const Default: Story = {};

export const Reduced: Story = {
  args: { reduced: true },
};

export const ReverseAlignment: Story = {
  args: { reverseAlignment: true },
};
