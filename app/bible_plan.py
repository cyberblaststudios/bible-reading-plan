import csv

BIBLE_PLAN_CSV_PATH = 'res/bibleplan.csv'

BIBLE_BOOK_LOOKUP_DICT = {"Genesis":"Gen",
"Exodus":"Ex",
"Leviticus":"Lev",
"Numbers":"Num",
"Deuteronomy":"Deut",
"Joshua":"Josh",
"Judges":"Jdg",
"Ruth":"Rut",
"1 Samuel":"1 Sa",
"2 Samuel":"2 Sa",
"1 Kings":"1 Kgs",
"2 Kings":"2 Kgs",
"1 Chronicles":"1 Chr",
"2 Chronicles":"2 Chr",
"Ezra":"Ezr",
"Nehemiah":"Neh",
"Esther":"Est",
"Job":"Job",
"Psalms":"Ps",
"Proverbs":"Pro",
"Ecclesiastes":"Ecc",
"Song of Solomon":"Sos",
"Isaiah":"Isa",
"Jeremiah":"Jer",
"Lamentations":"Lam",
"Ezekiel":"Eze",
"Daniel":"Dan",
"Hosea":"Hos",
"Joel":"Joe",
"Amos":"Amo",
"Obadiah":"Oba",
"Jonah":"Jon",
"Micah":"Mic",
"Nahum":"Nah",
"Habakkuk":"Hab",
"Zephaniah":"Zep",
"Haggai":"Hag",
"Zechariah":"Zec",
"Malachi":"Mal",
"Matthew":"Mat",
"Mark":"Mk",
"Luke":"Luk",
"John":"John",
"Acts":"Acts",
"Romans":"Rom",
"1 Corinthians":"1 Co",
"2 Corinthians":"2 Co",
"Galatians":"Gal",
"Ephesians":"Eph",
"Philippians":"Phil",
"Colossians":"Col",
"1 Thessalonians":"1 Th",
"2 Thessalonians":"2 Th",
"1 Timothy":"1 Ti",
"2 Timothy":"2 Ti",
"Titus":"Tit",
"Philemon":"Phil",
"Hebrews":"Heb",
"James":"Jam",
"1 Peter":"1 Pe",
"2 Peter":"2 Pe",
"1 John":"1 Jn",
"2 John":"2 Jn",
"3 John":"3 Jn",
"Jude":"Jude",
"Revelation":"Rev"}

class BiblePlan():

    # the bible reading plan has abbreviated book names that we want to transform into the full english book name
    def get_expanded_passage(self, passage: str) -> str:
        full_book_names = BIBLE_BOOK_LOOKUP_DICT.keys()

        final_passage_str = passage

        for full_book_name in full_book_names:
            abbreviated_book_name = BIBLE_BOOK_LOOKUP_DICT[full_book_name]
            final_passage_str = final_passage_str.replace(abbreviated_book_name, full_book_name)

        return final_passage_str

    def __init__(self) -> None:
        self.reading_plan = dict()

        with open(file=BIBLE_PLAN_CSV_PATH, mode='r') as reading_plan_csv:
            reading_plan = csv.DictReader(reading_plan_csv)
            
            for row in reading_plan:
                self.reading_plan[row['Date']] = {'passage': self.get_expanded_passage(row['Passage']),
                                                  'video1': row['Video 1'], 
                                                  'video2': row['Video 2'], 
                                                  'video3': row['Video 3'], 
                                                  'video4': row['Proverbs']}

    def get_reading_plan(self) -> dict:
        return self.reading_plan

