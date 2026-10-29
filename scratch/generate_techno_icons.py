import os
from PIL import Image, ImageDraw, ImageFont

def create_master_techno_app_icon():
    canvas_size = 2048
    img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = int(canvas_size * 0.05)
    box = [pad, pad, canvas_size - pad, canvas_size - pad]
    radius = int(canvas_size * 0.22)

    # 1. Outer Glow / Soft shadow
    for i in range(48, 0, -8):
        alpha = int(20 * (1 - i / 48))
        glow_box = [pad - i, pad - i, canvas_size - pad + i, canvas_size - pad + i]
        draw.rounded_rectangle(glow_box, radius=radius + i, fill=(2, 132, 199, alpha))

    # 2. Main Squircle Body (Dark Luxury Slate / Midnight)
    draw.rounded_rectangle(box, radius=radius, fill=(11, 15, 25, 255), outline=(2, 132, 199, 255), width=14)

    # 3. Inner gradient accent rim
    inner_pad = pad + 16
    inner_box = [inner_pad, inner_pad, canvas_size - inner_pad, canvas_size - inner_pad]
    draw.rounded_rectangle(inner_box, radius=radius - 16, outline=(99, 102, 241, 120), width=6)

    # Center coordinates for brackets
    cx = canvas_size / 2.0
    cy = canvas_size * 0.44

    # Brackets and slash dimensions
    bw = canvas_size * 0.18
    bh = canvas_size * 0.24
    stroke_w = int(canvas_size * 0.052)
    r_cap = stroke_w // 2

    # Left Bracket '<' (Cyan #38bdf8)
    lx_tip = cx - canvas_size * 0.26
    lx_edge = lx_tip + bw
    draw.line([(lx_edge, cy - bh), (lx_tip, cy)], fill=(56, 189, 248, 255), width=stroke_w)
    draw.line([(lx_tip, cy), (lx_edge, cy + bh)], fill=(56, 189, 248, 255), width=stroke_w)
    draw.ellipse([lx_edge - r_cap, cy - bh - r_cap, lx_edge + r_cap, cy - bh + r_cap], fill=(56, 189, 248, 255))
    draw.ellipse([lx_tip - r_cap, cy - r_cap, lx_tip + r_cap, cy + r_cap], fill=(56, 189, 248, 255))
    draw.ellipse([lx_edge - r_cap, cy + bh - r_cap, lx_edge + r_cap, cy + bh + r_cap], fill=(56, 189, 248, 255))

    # Center Slash '/' (Amber #f59e0b)
    slash_top_x = cx + canvas_size * 0.065
    slash_top_y = cy - bh * 1.15
    slash_bot_x = cx - canvas_size * 0.065
    slash_bot_y = cy + bh * 1.15
    draw.line([(slash_bot_x, slash_bot_y), (slash_top_x, slash_top_y)], fill=(245, 158, 11, 255), width=stroke_w)
    draw.ellipse([slash_top_x - r_cap, slash_top_y - r_cap, slash_top_x + r_cap, slash_top_y + r_cap], fill=(245, 158, 11, 255))
    draw.ellipse([slash_bot_x - r_cap, slash_bot_y - r_cap, slash_bot_x + r_cap, slash_bot_y + r_cap], fill=(245, 158, 11, 255))

    # Right Bracket '>' (Indigo #818cf8)
    rx_tip = cx + canvas_size * 0.26
    rx_edge = rx_tip - bw
    draw.line([(rx_edge, cy - bh), (rx_tip, cy)], fill=(129, 140, 248, 255), width=stroke_w)
    draw.line([(rx_tip, cy), (rx_edge, cy + bh)], fill=(129, 140, 248, 255), width=stroke_w)
    draw.ellipse([rx_edge - r_cap, cy - bh - r_cap, rx_edge + r_cap, cy - bh + r_cap], fill=(129, 140, 248, 255))
    draw.ellipse([rx_tip - r_cap, cy - r_cap, rx_tip + r_cap, cy + r_cap], fill=(129, 140, 248, 255))
    draw.ellipse([rx_edge - r_cap, cy + bh - r_cap, rx_edge + r_cap, cy + bh + r_cap], fill=(129, 140, 248, 255))

    # Live Green Pulse Node (Top right corner of squircle)
    pulse_x = box[2] - int(canvas_size * 0.16)
    pulse_y = box[1] + int(canvas_size * 0.16)
    pulse_r = int(canvas_size * 0.045)
    draw.ellipse([pulse_x - pulse_r*2.0, pulse_y - pulse_r*2.0, pulse_x + pulse_r*2.0, pulse_y + pulse_r*2.0], fill=(16, 185, 129, 70))
    draw.ellipse([pulse_x - pulse_r, pulse_y - pulse_r, pulse_x + pulse_r, pulse_y + pulse_r], fill=(16, 185, 129, 255))
    draw.ellipse([pulse_x - pulse_r*0.35, pulse_y - pulse_r*0.35, pulse_x + pulse_r*0.35, pulse_y + pulse_r*0.35], fill=(255, 255, 255, 240))

    # Modern Text "TECHNO." at bottom
    text_y = int(canvas_size * 0.76)
    font_size = int(canvas_size * 0.135)
    
    font = None
    for font_name in ["arialbd.ttf", "segoeuib.ttf", "calibrib.ttf", "arial.ttf"]:
        try:
            font = ImageFont.truetype(font_name, font_size)
            break
        except Exception:
            pass
    if font is None:
        font = ImageFont.load_default()

    word = "TECHNO"
    dot = "."
    
    bbox_word = draw.textbbox((0, 0), word, font=font)
    bbox_dot = draw.textbbox((0, 0), dot, font=font)
    word_w = bbox_word[2] - bbox_word[0]
    dot_w = bbox_dot[2] - bbox_dot[0]
    total_w = word_w + dot_w

    start_x = int((canvas_size - total_w) / 2.0)
    draw.text((start_x, text_y), word, font=font, fill=(248, 250, 252, 255))
    draw.text((start_x + word_w, text_y), dot, font=font, fill=(245, 158, 11, 255))

    return img

if __name__ == "__main__":
    out_dir = r"c:\Users\prashant jha\Documents\GitHub\Techno\images"
    print("Generating 2048x2048 master icon...")
    master = create_master_techno_app_icon()
    
    sizes = {
        "android-chrome-512x512.png": 512,
        "android-chrome-192x192.png": 192,
        "apple-touch-icon.png": 180,
        "favicon-32x32.png": 32,
        "favicon-16x16.png": 16,
    }
    
    for filename, sz in sizes.items():
        out_path = os.path.join(out_dir, filename)
        resized = master.resize((sz, sz), Image.Resampling.LANCZOS)
        resized.save(out_path, "PNG")
        print(f"Saved {out_path} ({sz}x{sz})")

    # Save multi-size favicon.ico
    ico_path = os.path.join(out_dir, "favicon.ico")
    ico_master = master.resize((256, 256), Image.Resampling.LANCZOS)
    ico_master.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
    print(f"Saved {ico_path}")
