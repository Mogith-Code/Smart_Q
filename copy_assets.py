import shutil
import os

def copy_logo_assets():
    src = os.path.join(os.path.dirname(__file__), "assets", "images", "SmartQ Logo.png")
    if not os.path.exists(src):
        print(f"Source logo not found at {src}")
        return

    destinations = [
        os.path.join(os.path.dirname(__file__), "mobile", "assets", "images", "logo.png"),
        os.path.join(os.path.dirname(__file__), "web", "Staff", "public", "logo.png"),
        os.path.join(os.path.dirname(__file__), "web", "Staff", "public", "favicon.png"),
        os.path.join(os.path.dirname(__file__), "web", "admin_portal", "public", "logo.png"),
        os.path.join(os.path.dirname(__file__), "web", "admin_portal", "public", "favicon.png"),
    ]

    for dst in destinations:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(src, dst)
        print(f"Copied SmartQ Logo to {dst}")

if __name__ == "__main__":
    copy_logo_assets()
