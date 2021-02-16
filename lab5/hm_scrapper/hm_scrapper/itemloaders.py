from itemloaders.processors import TakeFirst, MapCompose, Join, Identity
from scrapy.loader import ItemLoader


class ProductLoader(ItemLoader):
    default_output_processor = TakeFirst()
    image_urls_out = Identity()
    images_out = Identity()


class ColorLoader(ItemLoader):
    default_output_processor = TakeFirst()
    product_urls_out = Identity()
