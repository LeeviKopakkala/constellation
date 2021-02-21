import { newSpecPage } from '@stencil/core/testing';
import { ConstellationComponent } from '../constellation-component';

describe('constellation-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ConstellationComponent],
      html: `<constellation-component></constellation-component>`,
    });
    expect(page.root).toEqualHtml(`
      <constellation-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </constellation-component>
    `);
  });
});
