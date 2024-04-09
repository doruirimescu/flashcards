import unittest
import os, shutil
from pathlib import Path

# Get current directory
CURRENT_DIRECTORY = Path(os.path.dirname(os.path.realpath(__file__)))

DATA_PATH = CURRENT_DIRECTORY / Path("data")
ROOT_PATH = CURRENT_DIRECTORY / Path("../")

BACK_PNG_PATH = Path("back.png")
FRONT_PNG_PATH = Path("front.png")

BACK_JPG = Path("back.jpg")
FRONT_JPG = Path("front.jpg")

BACK_PNG_DATA_PATH = DATA_PATH / BACK_PNG_PATH
FRONT_PNG_DATA_PATH = DATA_PATH / FRONT_PNG_PATH

BACK_PNG_ROOT_PATH = ROOT_PATH / BACK_PNG_PATH
FRONT_PNG_ROOT_PATH = ROOT_PATH / FRONT_PNG_PATH

BACK_JPG_ROOT_PATH = ROOT_PATH / BACK_JPG
FRONT_JPG_ROOT_PATH = ROOT_PATH / FRONT_JPG

CONVERNT_PATH = ROOT_PATH / Path("convert.sh")
CLI_PATH = ROOT_PATH / Path("cli.py")

def copy_files_to_root():
    shutil.copy(BACK_PNG_DATA_PATH, BACK_PNG_ROOT_PATH)
    shutil.copy(FRONT_PNG_DATA_PATH, FRONT_PNG_ROOT_PATH)

def delete_files_from_root():
    if os.path.exists(BACK_PNG_ROOT_PATH):
        os.remove(BACK_PNG_ROOT_PATH)
    if os.path.exists(FRONT_PNG_ROOT_PATH):
        os.remove(FRONT_PNG_ROOT_PATH)

    if os.path.exists(BACK_JPG_ROOT_PATH):
        os.remove(BACK_JPG_ROOT_PATH)
    if os.path.exists(FRONT_JPG_ROOT_PATH):
        os.remove(FRONT_JPG_ROOT_PATH)

class TestProject(unittest.TestCase):
    def setUp(self) -> None:
        copy_files_to_root()

    def tearDown(self) -> None:
        delete_files_from_root()

    def test_png_to_jpg_conversion(self):
        os.system(f"bash {CONVERNT_PATH}")
        if not os.path.exists(ROOT_PATH / Path("back.jpg")):
            self.fail("back.jpg not created")
        if not os.path.exists(ROOT_PATH / Path("front.jpg")):
            self.fail("front.jpg not created")

    def test_flashcard_creation(self):
        pass
