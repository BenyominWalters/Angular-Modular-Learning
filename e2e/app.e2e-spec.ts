import { AbcPage } from './app.po';

describe('abc App', () => {
  let page: AbcPage;

  beforeEach(() => {
    page = new AbcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
