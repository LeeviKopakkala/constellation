import { newE2EPage } from '@stencil/core/testing';

describe('constellation-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<constellation-component></constellation-component>');

    const element = await page.find('constellation-component');
    expect(element).toHaveClass('hydrated');
  });
});
