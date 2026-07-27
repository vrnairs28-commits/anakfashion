const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// Ensure output directory exists
const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Product Mock Data
const products = [
    // SAREES
    {
        id: "SAR-001",
        name: "Classic Banarasi Silk Saree",
        category: "Sarees",
        price: 8499,
        description: "An elegant Banarasi Silk Saree hand-woven by master artisans. Featuring elaborate zari work, floral motifs, and a rich pallu. Ideal for weddings and premium festive occasions.",
        fabric: "Banarasi Silk",
        sizes: "One Size",
        colors: "Crimson Red,Royal Blue,Emerald Green",
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80,https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80,https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "SAR-002",
        name: "Pastel Organza Floral Saree",
        category: "Sarees",
        price: 3899,
        description: "A super lightweight and translucent Organza Saree embellished with hand-painted pastel floral patterns and a delicate scalloped detail border.",
        fabric: "Organza",
        sizes: "One Size",
        colors: "Blush Pink,Mint Green,Sky Blue",
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "SAR-003",
        name: "Summer Handloom Linen Saree",
        category: "Sarees",
        price: 2999,
        description: "Stay cool and sophisticated in this pure handloom linen saree. Adorned with minimalist silver stripes (zari border) and organic tassel finishes at the pallu.",
        fabric: "Handloom Linen",
        sizes: "One Size",
        colors: "Natural Beige,Ocean Blue,Sunset Mustard",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80,https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    },
    {
        id: "SAR-004",
        name: "Royal Kanjeevaram Brocade Saree",
        category: "Sarees",
        price: 12500,
        description: "An authentic, heritage Kanjeevaram Saree woven with heavy silk threads and pure gold-plated zari. Features traditional temple patterns on the borders.",
        fabric: "Kanjeevaram Silk",
        sizes: "One Size",
        colors: "Maroon Gold,Mustard Gold,Teal Gold",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80,https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "SAR-005",
        name: "Embellished Georgette Ruffle Saree",
        category: "Sarees",
        price: 4999,
        description: "A modern pre-draped ruffle saree crafted from premium georgette. Comes with a fully hand-embroidered sequined blouse piece for cocktail parties.",
        fabric: "Premium Georgette",
        sizes: "One Size",
        colors: "Midnight Black,Wine Red,Sapphire Blue",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80,https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    },

    // KURTIS
    {
        id: "KRT-001",
        name: "Anarkali Embroidered Kurta Set",
        category: "Kurtis",
        price: 3299,
        description: "Flared Anarkali kurta featuring intricate Chikankari hand embroidery on the neckline, long sleeves, and a matching chiffon dupatta with lace borders.",
        fabric: "Premium Viscose Rayon",
        sizes: "S,M,L,XL,XXL",
        colors: "Lilac,Peach Spark,Ivory White",
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80,https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "KRT-002",
        name: "Straight Cotton Handblock Kurti",
        category: "Kurtis",
        price: 1499,
        description: "A comfortable daily wear straight-cut kurti with authentic Rajasthani hand-block print details, side slits, and elegant wooden button work on the yoke.",
        fabric: "100% Organic Cotton",
        sizes: "XS,S,M,L,XL",
        colors: "Indigo Blue,Terracotta Red,Olive Green",
        image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "KRT-003",
        name: "Chanderi Silk Yoke Kurta",
        category: "Kurtis",
        price: 2499,
        description: "Graceful Chanderi Kurta designed with an elegant sweetheart neck and gold thread highlights on a translucent sheer design sleeve.",
        fabric: "Chanderi Silk Mix",
        sizes: "S,M,L,XL",
        colors: "Mint Green,Dusty Rose,Mustard Gold",
        image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    },
    {
        id: "KRT-004",
        name: "Angrakha Style Floral Tunic",
        category: "Kurtis",
        price: 1899,
        description: "Short Angrakha-style flared tunic featuring side tie tassels, a V-neckline, and high-quality floral prints, perfect for pairing with denim or leggings.",
        fabric: "Soft Cotton Voile",
        sizes: "XS,S,M,L,XL",
        colors: "Sky Blue,Lavender,Cream White",
        image: "https://images.unsplash.com/photo-1609873814058-a8928924184a?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1609873814058-a8928924184a?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "KRT-005",
        name: "Embroidered A-Line Festive Kurta",
        category: "Kurtis",
        price: 2799,
        description: "A-Line long kurti embellished with delicate mirror and zari embroidery on the yoke and sleeve cuffs. Designed for minor gatherings and festivals.",
        fabric: "Rayon Slub",
        sizes: "M,L,XL,XXL",
        colors: "Deep Wine,Teal Blue,Forest Green",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
        availability: "Out of Stock"
    },

    // SALWARS
    {
        id: "SLW-001",
        name: "Classic Patiala Salwar Suit Set",
        category: "Salwars",
        price: 3499,
        description: "Traditional Punjabi style salwar suit set. Accompanies a short straight kurta, a highly layered cotton Patiala salwar, and an embroidered phulkari dupatta.",
        fabric: "Premium Cotton",
        sizes: "S,M,L,XL",
        colors: "Marigold Yellow,Crimson Red,Emerald",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "SLW-002",
        name: "Elegant Palazzo Suit Set",
        category: "Salwars",
        price: 2999,
        description: "Modern minimalist straight kurti paired with wide-leg printed palazzo pants. Perfect office wear and semi-casual meetings.",
        fabric: "Cotton-Linen Blend",
        sizes: "S,M,L,XL,XXL",
        colors: "Mint Green,Classic Ivory,Warm Tan",
        image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "SLW-003",
        name: "Georgette Sharara Suit Set",
        category: "Salwars",
        price: 4999,
        description: "Luxurious sharara set with a short sequined kurta, double-flared soft creped sharara trousers, and a glittering border dupatta.",
        fabric: "Faux Georgette",
        sizes: "S,M,L,XL",
        colors: "Lilac Lavender,Blush Rose,Champagne Gold",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "SLW-004",
        name: "V-Neck Straight Fit Suit Set",
        category: "Salwars",
        price: 3799,
        description: "Contemporary straight fit trouser pants with a modern V-neck slim-fitting style tunic and a sheer organza matching dupatta.",
        fabric: "Premium Raw Silk Mix",
        sizes: "XS,S,M,L,XL",
        colors: "Slate Grey,Peach Salmon,Teal Blue",
        image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    },
    {
        id: "SLW-005",
        name: "Floral Anarkali Palazzo Set",
        category: "Salwars",
        price: 4299,
        description: "Beautiful floral-themed floor-length Anarkali top combined with comfortable lightweight matching palazzos and basic dupatta.",
        fabric: "Fine Crepe",
        sizes: "M,L,XL",
        colors: "Cream Floral,Lavender Floral,Aqua Blue",
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },

    // DRESSES
    {
        id: "DRS-001",
        name: "Summer Silk Wrap Maxi Dress",
        category: "Dresses",
        price: 3699,
        description: "An elegant, premium wrap dress with a V-neckline, self-tie waist, and full flowing skirt. Adapts perfectly from morning lunch to evening sunset outings.",
        fabric: "Premium Mulberry Silk Mix",
        sizes: "XS,S,M,L,XL",
        colors: "Emerald,Rust Terracotta,Classic Red",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80,https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "DRS-002",
        name: "Floral Silk Cocktail Midi Dress",
        category: "Dresses",
        price: 4500,
        description: "A tailored cocktail dress featuring vintage floral motifs, puff sleeves, and a sleek square-cut neckline. Perfect for sophisticated evening affairs.",
        fabric: "Satin Silk Blend",
        sizes: "S,M,L,XL",
        colors: "Noir Black,Champagne Pink",
        image: "https://images.unsplash.com/photo-1539008885759-479dec55b7cb?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1539008885759-479dec55b7cb?auto=format&fit=crop&w=1000&q=80,https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    },
    {
        id: "DRS-003",
        name: "Sienna Tiered Linen Dress",
        category: "Dresses",
        price: 2499,
        description: "Bohemian-inspired multi-tiered sleeveless dress crafted from lightweight pure linen. Extremely airy and comfortable.",
        fabric: "Pure Linen",
        sizes: "S,M,L",
        colors: "Clay Orange,Oatmeal Beige,Olive",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "DRS-004",
        name: "Tiered Cotton Handblock Midi",
        category: "Dresses",
        price: 1999,
        description: "Tiered mid-length dress in custom block-prints with a drawstring tie at the collar and three-quarter sleeves with matching piping details.",
        fabric: "Organic Cambric Cotton",
        sizes: "XS,S,M,L,XL,XXL",
        colors: "Indigo Blue,Sage Green",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "DRS-005",
        name: "Pleated Velvet Evening Gown",
        category: "Dresses",
        price: 7499,
        description: "An absolute head-turner. Luxurious plush velvet material structured with high side slits, a deep cowl neckline, and a gold belt accent.",
        fabric: "Royal Velvet",
        sizes: "S,M,L,XL",
        colors: "Deep Emerald,Midnight Violet,Ruby Red",
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    },

    // TOPS
    {
        id: "TOP-001",
        name: "Embroidered Chiffon Blouse",
        category: "Tops",
        price: 1299,
        description: "Semi-sheer premium chiffon top styled with delicate floral threadwork, dynamic balloon sleeves, and a button closure behind the neck.",
        fabric: "Premium Georgette Chiffon",
        sizes: "XS,S,M,L,XL",
        colors: "Pristine White,Powder Pink,Muted Sage",
        image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "TOP-002",
        name: "Linen Peplum Summer Top",
        category: "Tops",
        price: 1499,
        description: "Linen peplum-style top featuring a waist-defining drawstring belt and broad shoulder cuffs. Elegant when paired with raw trousers.",
        fabric: "Linen-Viscose Blend",
        sizes: "S,M,L",
        colors: "Saffron Yellow,Clay Orange,Oatmeal",
        image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "TOP-003",
        name: "Puff Sleeve Satin Bodice Top",
        category: "Tops",
        price: 1699,
        description: "Tailored satin bodice top designed with voluminous statements puff sleeves and a sleek square-cut neckline.",
        fabric: "Lustrous Satin",
        sizes: "XS,S,M,L",
        colors: "Champagne,Navy Blue,Crimson Red",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    },
    {
        id: "TOP-004",
        name: "Handblock Indigo Crossover Top",
        category: "Tops",
        price: 1199,
        description: "Wraparound crossover-style short top featuring ethnic bagru printing and customizable fit drawstring side adjustments.",
        fabric: "Pure Cotton",
        sizes: "S,M,L,XL,XXL",
        colors: "Indigo Blue,Ash Black",
        image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "TOP-005",
        name: "Ruffled Lace Victorian Blouse",
        category: "Tops",
        price: 1899,
        description: "A gorgeous luxury lace top highlighting vintage layered ruffles, mock collars, and elastic button sleeve detailing.",
        fabric: "Nylon Lace + Cotton Lining",
        sizes: "XS,S,M,L",
        colors: "Ivory White,Midnight Black",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    },

    // ETHNIC WEAR
    {
        id: "ETH-001",
        name: "Zardozi Embroidered Silk Lehenga",
        category: "Ethnic Wear",
        price: 18900,
        description: "Exquisite raw silk Lehenga Choli set detailed with heavy gold Zardozi threadwork, floral design borders, and a contrast plum-toned net dupatta.",
        fabric: "Raw Silk & Net Duppata",
        sizes: "S,M,L,XL",
        colors: "Magenta Pink,Plum Maroon,Teal Gold",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80,https://images.unsplash.com/photo-1610030469983-188b72f44747?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    },
    {
        id: "ETH-002",
        name: "Georgette Floral Anarkali Gown",
        category: "Ethnic Wear",
        price: 5299,
        description: "A floor-length gown featuring custom soft floral digital prints, flare elements reaching up to 6 meters, and an attached silk lining.",
        fabric: "Premium Georgette",
        sizes: "S,M,L,XL,XXL",
        colors: "Blush Bouquet,Sky Meadow",
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "ETH-003",
        name: "Hand-painted Silk Organza Kaftan",
        category: "Ethnic Wear",
        price: 3499,
        description: "Free-flowing relaxed luxury Kaftan. Embellished with beautiful direct hand-painted lotus patterns and gold gota lace highlighting the borders.",
        fabric: "Organza Silk Mix",
        sizes: "One Size",
        colors: "Pure Cream,Soft Yellow,Sage Green",
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "ETH-004",
        name: "Handwoven Silk Banarasi Dupatta Set",
        category: "Ethnic Wear",
        price: 4500,
        description: "Solid color straight trousers and silk tunic vest set, highlighted with a gorgeous 2.5-meter pure Banarasi handwoven silk dupatta.",
        fabric: "Raw Silk & Banarasi Silk",
        sizes: "S,M,L,XL",
        colors: "Midnight Blue,Emerald Green,Wine Fuchsia",
        image: "https://images.unsplash.com/photo-1608962714022-f941f14197a7?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1608962714022-f941f14197a7?auto=format&fit=crop&w=1000&q=80",
        availability: "In Stock"
    },
    {
        id: "ETH-005",
        name: "Traditional Bandhani Cape Set",
        category: "Ethnic Wear",
        price: 5999,
        description: "Three-piece modern ethnic set. Includes high-comfort matching bustier-style crop top, straight palazzo trousers, and a dynamic tie-dye Bandhani cape overlay.",
        fabric: "Crepe & Chiffon",
        sizes: "S,M,L,XL",
        colors: "Sunrise Orange,Fuschia Pink",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        images: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        availability: "Low Stock"
    }
];

// Write Excel File
const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(products);
xlsx.utils.book_append_sheet(wb, ws, "Products");

const outputPath = path.join(dataDir, 'products-data.xlsx');
xlsx.writeFile(wb, outputPath);

console.log(`Excel database successfully generated at: ${outputPath}`);
