import time
import json
import logging
import httpx
from sqlalchemy.orm import Session
from .models import Category, Product

logger = logging.getLogger("chefmachines_scraper")
logger.setLevel(logging.INFO)

API_ENDPOINT = "https://www.middlebycelfrost.com/allapi/API/json.php"
IMAGE_BASE = "https://www.middlebycelfrost.com/allapi/assets/images/product/"
CATEGORY_IMG_BASE = "https://www.middlebycelfrost.com/allapi/assets/img/category/"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Content-Type": "application/json"
}

def clean_html(raw_html: str) -> str:
    if not raw_html:
        return ""
    import re
    clean = re.sub(r'<[^>]+>', ' ', raw_html)
    return " ".join(clean.split()).strip()

def scrape_categories(client: httpx.Client):
    try:
        response = client.post(API_ENDPOINT, json={"action": "HeaderMenuCategory"}, timeout=15)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") and "data" in data:
                return data["data"]
    except Exception as e:
        logger.error(f"Error fetching categories: {e}")
    return []

def scrape_products_for_category(client: httpx.Client, category_slug: str):
    try:
        response = client.post(
            API_ENDPOINT,
            json={"action": "ProductByCategory", "category": category_slug},
            timeout=15
        )
        if response.status_code == 200:
            data = response.json()
            if data.get("status") and "data" in data:
                return data["data"]
    except Exception as e:
        logger.error(f"Error fetching products for category {category_slug}: {e}")
    return []

def scrape_product_detail(client: httpx.Client, product_slug: str):
    try:
        response = client.post(
            API_ENDPOINT,
            json={"action": "ProductDetails", "product": product_slug},
            timeout=15
        )
        if response.status_code == 200:
            data = response.json()
            if data.get("status") and "data" in data:
                return data["data"]
    except Exception as e:
        logger.error(f"Error fetching details for product {product_slug}: {e}")
    return None

def sync_middleby_catalog(db: Session, max_categories: int = 15, max_products_per_category: int = 8):
    """
    Scrapes and syncs Middleby Celfrost catalog into ChefMachines database.
    """
    stats = {"categories_added": 0, "products_added": 0, "products_updated": 0, "errors": 0}
    with httpx.Client(headers=HEADERS, verify=False) as client:
        categories_data = scrape_categories(client)
        if not categories_data:
            logger.warning("No categories returned from Middleby Celfrost API")
            return stats

        for cat_item in categories_data[:max_categories]:
            cat_name = cat_item.get("name", "").strip()
            cat_slug = cat_item.get("slug", "").strip()
            if not cat_slug or not cat_name:
                continue

            cat_img = f"https://www.middlebycelfrost.com/allapi/{cat_item.get('image', '')}" if cat_item.get("image") else None

            # Upsert Category
            existing_cat = db.query(Category).filter(Category.slug == cat_slug).first()
            if not existing_cat:
                new_cat = Category(
                    name=cat_name,
                    slug=cat_slug,
                    image_url=cat_img,
                    description=clean_html(cat_item.get("description", ""))
                )
                db.add(new_cat)
                db.commit()
                stats["categories_added"] += 1

            # Fetch products in category
            products_list = scrape_products_for_category(client, cat_slug)
            for prod_item in products_list[:max_products_per_category]:
                prod_slug = prod_item.get("product_slug", "").strip()
                prod_name = prod_item.get("product_name", "").strip()
                if not prod_slug or not prod_name:
                    continue

                prod_id = prod_item.get("id")
                img_name = prod_item.get("image_path_1")
                image_url = f"{IMAGE_BASE}{prod_id}/{img_name}" if prod_id and img_name else None

                model = prod_item.get("model", "")
                brand = prod_item.get("TagName", "ChefMachines Commercial")
                desc = clean_html(prod_item.get("description", ""))

                # Build specs
                specs = {
                    "Model": model,
                    "Commercial Grade": "Heavy Duty Industrial",
                    "Warranty": "1 Year Comprehensive + AMC Available",
                    "Brand": brand or "ChefMachines Commercial"
                }

                existing_prod = db.query(Product).filter(Product.slug == prod_slug).first()
                if existing_prod:
                    existing_prod.name = prod_name
                    existing_prod.category_slug = cat_slug
                    existing_prod.model = model
                    existing_prod.image_url = image_url or existing_prod.image_url
                    existing_prod.description = desc or existing_prod.description
                    stats["products_updated"] += 1
                else:
                    new_prod = Product(
                        name=prod_name,
                        slug=prod_slug,
                        model=model,
                        category_slug=cat_slug,
                        brand=brand,
                        description=desc,
                        features=json.dumps(["Commercial grade stainless steel", "High-efficiency thermal insulation", "Precision digital controller", "Low power consumption"]),
                        specs=json.dumps(specs),
                        price_estimate=125000.0,
                        is_rfq_only=True,
                        image_url=image_url,
                        is_featured=True if stats["products_added"] < 6 else False
                    )
                    db.add(new_prod)
                    stats["products_added"] += 1

                db.commit()
                time.sleep(0.05) # Polite crawl rate

    return stats
