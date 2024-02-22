# cli.py
import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

class PathManager:
    def __init__(self, topic, name, category):
        self.back_dir = f"./public/assets/back/{topic}"
        self.front_dir = f"./public/assets/front/{topic}"
        self.data_dir = f"./public/data/{topic}"
        self.back_image = f"{self.back_dir}/{name}.jpg"
        self.front_image = f"{self.front_dir}/{name}.jpg"
        self.category_json = f"{self.data_dir}/{category}.json"
        self.structure_json = f"./public/data/structure.json"
        self.count_json = f"./public/data/count.json"

    def __str__(self) -> str:
        return f"back_dir: {self.back_dir}\nfront_dir: {self.front_dir}\ndata_dir: {self.data_dir}\nback_image: {self.back_image}\nfront_image: {self.front_image}\ncategory_json: {self.category_json}\nstructure_json: {self.structure_json}"

    def get_structure_json(self):
        with open(self.structure_json, 'r') as f:
            return json.load(f)
class CreateEntry:
    def __init__(self, name, topic, category, style, content):
        self.name = name
        self.topic = topic
        self.category = category
        self.style = style
        self.content = content

        self.path = PathManager(topic, name, category)

    def print_args(self):
        print(f"Name: {self.name}")
        print(f"Topic: {self.topic}")
        print(f"Category: {self.category}")
        print(f"Style: {self.style}")
        print(f"Content: {self.content}")

    def create(self):
        self._check_images_exist()
        self.print_args()

        self._create_directories()

        self._handle_category()
        self._handle_structure()

        # convert pngs to jpgs by calling convert.sh
        subprocess.run(["./convert.sh"])
        import time
        time.sleep(1)

        # move front.png and back.png to public/assets/front and public/assets/back
        subprocess.run(["mv", "front.jpg", self.path.front_image])
        subprocess.run(["mv", "back.jpg", self.path.back_image])

    def _check_images_exist(self):
        # check that back and front images exist at the current directory
        if not os.path.exists("back.png"):
            sys.exit("back.png not found")
        if not os.path.exists("front.png"):
            sys.exit("front.png not found")

    def _create_directories(self):
        if not os.path.exists(self.path.back_dir):
            os.makedirs(self.path.back_dir)
        if not os.path.exists(self.path.front_dir):
            os.makedirs(self.path.front_dir)
        if not os.path.exists(self.path.data_dir):
            os.makedirs(self.path.data_dir)

    def _handle_category(self):
        if not os.path.exists(self.path.category_json):
            with open(self.path.category_json, 'w') as f:
                f.write('{"flashcards": []}')

        #create json object from json_file
        with open(self.path.category_json, 'r') as f:
            category_data = json.load(f)

        # strip root of back image path
        back_image_path = Path(self.path.back_image)
        back_image_path = Path(*back_image_path.parts[1:])
        back_image_str= str(back_image_path)

        # strip root of front image path
        front_image_path = Path(self.path.front_image)
        front_image_path = Path(*front_image_path.parts[1:])
        front_image_str = str(front_image_path)

        category_data['flashcards'].append({
            "frontImage": front_image_str,
            "backImage": back_image_str,
            "frontContent": self.content,
            "styles": self.style
        })

        # write json object to json_file
        with open(self.path.category_json, 'w') as f:
            json.dump(category_data, f, indent=4)

    def _handle_structure(self):
        with open(self.path.structure_json, 'r') as f:
            structure_data = json.load(f)
        if self.topic not in structure_data:
            structure_data[self.topic] = {"sections": {"all": []}}
        if self.category not in structure_data[self.topic]["sections"]:
            structure_data[self.topic]["sections"][self.category] = []
        current_styles = structure_data[self.topic]["sections"][self.category]

        # append only new styles
        new_styles = []
        for style in self.style:
            if style not in current_styles:
                current_styles.append(style)
                new_styles.append(style)
        structure_data[self.topic]["sections"]["all"].extend(new_styles)

        with open(self.path.structure_json, 'w') as f:
            json.dump(structure_data, f, indent=4)

class DeleteTopic:
    def __init__(self, topic):
        self.topic = topic

    def print_args(self):
        print(f"Topic: {self.topic}")

class DeleteCategory:
    def __init__(self, topic, category):
        self.topic = topic
        self.category = category

    def print_args(self):
        print(f"Topic: {self.topic}")
        print(f"Category: {self.category}")


class CardsCounter:
    def __init__(self, topic, category, style):
        self.topic = topic
        self.category = category
        self.style = style
        self.path = PathManager(topic, None, category)

    def count(self):
        with open(self.path.category_json, 'r') as f:
            category_data = json.load(f)

        # count the number of cards with a specific style
        style_count = 0
        for card in category_data['flashcards']:
            if self.style in card['styles']:
                style_count += 1
        return style_count

class DeleteCard:
    def __init__(self, name, topic, category):
        self.name = name
        self.topic = topic
        self.category = category

    def print_args(self):
        print(f"Name: {self.name}")
        print(f"Topic: {self.topic}")
        print(f"Category: {self.category}")

def create_entry(args):
    create = CreateEntry(args.name, args.topic, args.category, args.style, args.content)
    create.create()

def count_cards(_):
    total_count = dict()

    pm = PathManager("", "", "")
    # explore data folder, and get the names of the subfolders as topics
    topics = [f.name for f in os.scandir(pm.data_dir) if f.is_dir()]

    topics_count_dict = dict()
    # for topic in topics, explore the names of the json files as categories
    for topic in topics:
        topics_count_dict[topic] = {"total":0, "categories": {"all":{"total": 0, "styles": {}}}}
        categories = [f.name for f in os.scandir(f"{pm.data_dir}/{topic}") if f.is_file()]
        # remove the .json extension
        categories = [c.split(".")[0] for c in categories]
        total_count[topic] = dict()

        # for each category, count the number of flashcards
        for category in categories:
            total_count[topic][category] = dict()
            topics_count_dict[topic]["categories"][category] = {"total":0, "styles": {}}
            for style in pm.get_structure_json()[topic]["sections"]["all"]:
                counter = CardsCounter(topic, category, style)
                style_count = counter.count()
                topics_count_dict[topic]["total"] += style_count
                topics_count_dict[topic]["categories"][category]["total"] += style_count
                if style_count > 0:
                    topics_count_dict[topic]["categories"][category]["styles"][style] = style_count
                    topics_count_dict[topic]["categories"]["all"]["styles"][style] = topics_count_dict[topic]["categories"]["all"]["styles"].get(style, 0) + style_count
            topics_count_dict[topic]["categories"]["all"]["total"] = topics_count_dict[topic]["total"]
    print(topics_count_dict)
    # write the count to a json file
    with open(pm.count_json, 'w') as f:
        json.dump(topics_count_dict, f, indent=4)

def delete_topic(args):
    print("Deleting a topic")
    delete = DeleteTopic(args.topic)
    delete.print_args()

def delete_category(args):
    print("Deleting a category")
    delete = DeleteCategory(args.topic, args.category)
    delete.print_args()

def delete_card(args):
    print("Deleting a card")
    delete = DeleteCard(args.name, args.topic, args.category)
    delete.print_args()

def parse_args():
    parser = argparse.ArgumentParser(description='Flashcard management tool.')
    subparsers = parser.add_subparsers(help='commands', dest='command')

    # Create subcommand
    create_parser = subparsers.add_parser('create', help='Create a new flashcard entry')
    create_parser.add_argument('--name', type=str, required=True, help='Name of the flashcard entry')
    create_parser.add_argument('--topic', type=str, required=True, help='Topic of the flashcard')
    create_parser.add_argument('--category', type=str, required=True, help='Category of the flashcard')
    create_parser.add_argument('--style', nargs='+', help='List of styles for the flashcard')
    create_parser.add_argument('--content', type=str, required=True, help='Content of the flashcard')
    create_parser.set_defaults(func=create_entry)

    # Count cards subcommand
    count_cards_parser = subparsers.add_parser('count', help='Count the cards and create statistics')
    count_cards_parser.set_defaults(func=count_cards)


    # Delete topic subcommand
    delete_topic_parser = subparsers.add_parser('delete_topic', help='Delete a topic')
    delete_topic_parser.add_argument('--topic', type=str, required=True, help='Topic name to delete')
    delete_topic_parser.set_defaults(func=delete_topic)

    # Delete category subcommand
    delete_category_parser = subparsers.add_parser('delete_category', help='Delete a category within a topic')
    delete_category_parser.add_argument('--topic', type=str, required=True, help='Topic of the category')
    delete_category_parser.add_argument('--category', type=str, required=True, help='Category name to delete')
    delete_category_parser.set_defaults(func=delete_category)

    # Delete card subcommand
    delete_card_parser = subparsers.add_parser('delete_card', help='Delete a card within a category and topic')
    delete_card_parser.add_argument('--name', type=str, required=True, help='Name of the flashcard to delete')
    delete_card_parser.add_argument('--topic', type=str, required=True, help='Topic of the flashcard')
    delete_card_parser.add_argument('--category', type=str, required=True, help='Category of the flashcard')
    delete_card_parser.set_defaults(func=delete_card)

    args = parser.parse_args()

    if args.command:
        args.func(args)
    else:
        parser.print_help()

def main():
    parse_args()

if __name__ == "__main__":
    main()
