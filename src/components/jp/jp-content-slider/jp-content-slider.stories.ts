import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './jp-content-slider';

const trackColors = [
  'default',
  'white',
  'transparent',
  'brand-subtle',
  'brand-muted',
  'surface',
] as const;

type SliderArgs = {
  previousLabel: string;
  nextLabel: string;
  trackColor: (typeof trackColors)[number];
  slidesPerView: number;
};

const slide = (label: string) => html`
  <div slide-content class="rounded-lg bg-white p-8 text-center shadow-sm">${label}</div>
`;

const meta = {
  title: 'JP/JP Content Slider',
  component: 'jp-content-slider',
  tags: ['autodocs'],
  argTypes: {
    previousLabel: { control: 'text', description: 'Maps to `previous-label`.' },
    nextLabel: { control: 'text', description: 'Maps to `next-label`.' },
    trackColor: {
      control: 'select',
      options: [...trackColors],
      description: 'Maps to `track-color` (Splide track class).',
    },
    slidesPerView: {
      control: 'number',
      description: 'Maps to `slides-per-view` (perPage).',
    },
  },
  args: {
    previousLabel: 'Diapositiva anterior',
    nextLabel: 'Diapositiva siguiente',
    trackColor: 'default',
    slidesPerView: 1,
  } satisfies SliderArgs,
  render: (args) => html`
    <jp-content-slider
      .previousLabel=${args.previousLabel}
      .nextLabel=${args.nextLabel}
      .trackColor=${args.trackColor}
      .slidesPerView=${args.slidesPerView}
    >
      ${slide('Slide 1')} ${slide('Slide 2')} ${slide('Slide 3')}
    </jp-content-slider>
  `,
} satisfies Meta<SliderArgs>;

export default meta;
type Story = StoryObj<SliderArgs>;

export const Default: Story = {};

export const TwoPerView: Story = {
  args: { slidesPerView: 2 },
};

export const BrandTrack: Story = {
  args: { trackColor: 'brand-muted' },
};
