# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from sqlalchemy.orm import sessionmaker
from hm_scrapper.models import db_connect, create_tables, Product, Image
import logging

logger = logging.getLogger(__name__)

engine = db_connect()
create_tables(engine)
maker = sessionmaker(engine)


class ProductSavePipeline:
    def open_spider(self, spider):
        self.session = maker()

    def close_spider(self, spider):
        self.session.commit()
        self.session.close()

    def process_item(self, item, spider):
        if spider.name == 'products':
            product = Product()
            product.name = item['name']
            product.product_number = item['product_number']
            product.color = item['color']
            product.standard_cost = item['price_pln']
            product.hm_url = item['hm_url']
            product.description = item['description']
            if 'images' in item:
                for i in item['images']:
                    image = Image()
                    image.checksum = i['checksum']
                    image.path = i['path']
                    image.status = i['status']
                    product.images.append(image)
            try:
                self.session.add(product)
            except:
                raise
        return item


class ColorSavePipeline:
    def open_spider(self, spider):
        self.session = maker()

    def close_spider(self, spider):
        self.session.commit()
        self.session.close()

    def process_item(self, item, spider):
        if spider.name == 'colors':
            for url in item['product_urls']:
                product = self.session.query(Product).filter(
                    Product.hm_url == url).one_or_none()
                if product is not None:
                    product.color = item['color']
        return item
