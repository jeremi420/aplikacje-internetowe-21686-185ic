import scrapy
from scrapy_splash import SplashRequest
from hm_scrapper.items import ColorItem
from hm_scrapper.itemloaders import ColorLoader
from itemloaders.processors import MapCompose
import logging

logger = logging.getLogger(__name__)

colors = [
    {
        "name": "beżowy",
        "slug": "be%C5%BCowy_f5f5dc"
    },
    {
        "name": "biały",
        "slug": "bia%C5%82y_ffffff"
    },
    {
        "name": "brązowy",
        "slug": "br%C4%85zowy_a52a2a"
    },
    {
        "name": "czarny",
        "slug": "czarny_000000",
    },
    {
        "name": "czerwony",
        "slug": "czerwony_ff0000"
    },
    {
        "name": "fioletowy",
        "slug": "fioletowy_800080"
    },
    {
        "name": "niebieski",
        "slug": "niebieski_0000ff"
    },
    {
        "name": "pomarańczowy",
        "slug": "pomara%C5%84czowy_ffa500"
    },
    {
        "name": "przezroczysty",
        "slug": "przezroczysty_ffffff"
    },
    {
        "name": "różowy",
        "slug": "r%C3%B3%C5%BCowy_ffc0cb"
    },
    {
        "name": "srebrny",
        "slug": "srebrny_c0c0c0"
    },
    {
        "name": "szary",
        "slug": "szary_808080"
    },
    {
        "name": "turkusowy",
        "slug": "turkusowy_40e0d0"
    },
    {
        "name": "wielobarwny",
        "slug": "wielobarwny_000000"
    },
    {
        "name": "zielony",
        "slug": "zielony_008000"
    },
    {
        "name": "złoty",
        "slug": "z%C5%82oty_ffd700"
    },
    {
        "name": "żółty",
        "slug": "%C5%BC%C3%B3%C5%82ty_ffff00"
    }
]


class ColorSpider(scrapy.Spider):
    name = 'colors'
    allowed_domains = ['hm.com']
    start_urls = []

    def start_requests(self):
        for color in colors:
            yield SplashRequest(
                url='https://www2.hm.com/pl_pl/on/nowosci/view-all.html?sort=stock&colorWithNames={}&image-size=small&image=model&offset=0&page-size=200'.format(color['slug']), meta={'color': color['name']}, callback=self.parse, args={'wait': 5})

    def parse(self, response):
        l = ColorLoader(item=ColorItem(), response=response)
        l.add_xpath('product_urls', '//ul[contains(@class, "products-listing")]//div[@class="image-container"]//a/@href',
                    MapCompose(lambda url: response.urljoin(url)))
        l.add_value('color', response.meta['color'])
        return l.load_item()
