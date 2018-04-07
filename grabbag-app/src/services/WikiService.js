import * as constants from '../Constants';

const WIKI_SERVICE_URL = constants.BASE_IFIXIT_URL + 'wikis/';

export default class WikiService {
  async getWikiItems(pageOffset, limit = 20) {
    let requestParameters = new URLSearchParams();
    requestParameters.append('pageOffset', pageOffset);
    requestParameters.append('limit', limit);

    let request = new Request(WIKI_SERVICE_URL + 'ITEM?' +
      requestParameters.toString(), {
        method: 'GET',
      });
    const response = await fetch(request);
    let wikiItems = [];

    if (response.ok) {
      wikiItems = await response.json();
    } else {
      console.error('Failed to retrieve wiki items for page=' + pageOffset
        + ', limit=' + limit);
    }

    return wikiItems;
  }
}