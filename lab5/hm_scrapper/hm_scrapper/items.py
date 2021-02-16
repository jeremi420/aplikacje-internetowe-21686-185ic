# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ProductItem(scrapy.Item):
    price_pln = scrapy.Field()
    name = scrapy.Field()
    image_urls = scrapy.Field()
    images = scrapy.Field()
    description = scrapy.Field()
    product_number = scrapy.Field()
    hm_url = scrapy.Field()


class ColorItem(scrapy.Item):
    color = scrapy.Field()
    product_urls = scrapy.Field()
