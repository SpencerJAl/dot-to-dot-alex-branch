import { DotToDotPage } from './app.po';

describe('dot-to-dot App', function() {
  let page: DotToDotPage;

  beforeEach(() => {
    page = new DotToDotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
